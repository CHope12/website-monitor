import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { exec } from "child_process";
import path from "path";
import fs, { access } from "fs";

import axios from 'axios';
import * as cheerio from 'cheerio';

import tls from 'tls';
import whois from 'whois-json';
import net from 'net';

/******************** SEO AUDITS ********************/

// Get all links / broken links
async function getAllAndCheckBrokenLinks(url) {
  try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      // Extract all <a href="..."> links
      const links = $("a")
          .map((i, link) => $(link).attr("href"))
          .get()
          .filter((href) => href && !href.startsWith("mailto:")); // Ignore empty & mailto links

      console.log("Extracted Links:", links);

      const brokenLinks = [];

      // Check if extracted links are broken
      for (const link of links) {
          let absoluteLink = link.startsWith("http") ? link : new URL(link, url).href;

          try {
              const response = await axios.get(absoluteLink);
              if (response.status >= 400) {
                  brokenLinks.push({ url: absoluteLink, status: response.status });
              }
          } catch (error) {
              brokenLinks.push({ url: absoluteLink, status: "Broken" });
          }
      }

      console.log("Broken Links:", brokenLinks);

      return { links, brokenLinks };
  } catch (error) {
      console.error("Error fetching page:", error);
      return { links: [], brokenLinks: [] };
  }
}

/******************** BEST PRACTICES AUDITS ********************/

// Extract SSL Certificate Information

async function checkSSLCertificate(url) {
  return new Promise((resolve, reject) => {
    try {
      const domain = new URL(url).hostname;
      const options = { host: domain, port: 443, servername: domain };

      const socket = tls.connect(options, () => {
        const cert = socket.getPeerCertificate();
        socket.end();

        if (!cert || Object.keys(cert).length === 0) {
          reject("No SSL certificate found.");
          return null;
        }

        const certData = {
          domain,
          issuer: cert.issuer?.O || "Unknown",
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          validDaysRemaining: Math.ceil(
            (new Date(cert.valid_to) - new Date()) / (1000 * 60 * 60 * 24)
          ),
        };

        resolve(certData);
      });

      socket.on("error", (err) => {
        reject("SSL Certificate Error: " + err.message);
      });
    } catch (error) {
      reject("Invalid URL or other error: " + error.message);
    }
  });
}

// Scan for Malware / Phishing
async function checkMalware(url){
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const requestBody = {
    client: {
      clientId: "website-monitor",
      clientVersion: "1.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  try {
    const response = await axios.post(apiUrl, requestBody);
    console.log("Malware Check:", response.data);
    return response.data;
  } 
  catch (error) {
    console.error("Error checking malware:", error);
    return null;
  }
}

// Check for Open Ports / Vulnerabilities
const popularPorts = [
  {
    port: 21,
    service: "FTP",
  },
  {
    port: 22,
    service: "SSH",
  },
  {
    port: 23,
    service: "Telnet",
  },
  {
    port: 25,
    service: "SMTP",
  },
  {
    port: 53,
    service: "DNS",
  },
  {
    port: 80,
    service: "HTTP",
  },
  {
    port: 110,
    service: "POP3",
  },
  {
    port: 143,
    service: "IMAP",
  },
  {
    port: 443,
    service: "HTTPS",
  },
  {
    port: 465,
    service: "SMTPS",
  },
  {
    port: 587,
    service: "SMTP",
  },
  {
    port: 993,
    service: "IMAPS",
  },
  {
    port: 995,
    service: "POP3S",
  },
  {
    port: 3306,
    service: "MySQL",
  },
  {
    port: 3389,
    service: "RDP",
  },
  {
    port: 8080,
    service: "HTTP",
  },
  {
    port: 8443,
    service: "HTTPS",
  },
];  

  // Function to check if a port is open
  async function checkPort(host, service, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(3000); // Timeout after 3 seconds

        socket.on("connect", () => {
            socket.destroy();
            resolve({ port, service, status: "open" });
        });

        socket.on("timeout", () => {
            socket.destroy();
            resolve({ port, service, status: "closed (timeout)" });
        });

        socket.on("error", () => {
            resolve({ port, service, status: "closed" });
        });

        socket.connect(port, host);
    });
  }

  // Function to scan all popular ports on a domain
  async function checkOpenPorts(url) {
    try {
        const domain = new URL(url).hostname;
        const results = await Promise.all(popularPorts.map((port) => checkPort(domain, port.service, port.port)));

        return {
            url,
            results
        };
    } catch (error) {
        console.error("Error scanning ports:", error);
        return null;
    }
  }

/* Check for outdated software
async function checkOutdatedSoftware(url) {
    try {
        const domain = new URL(url).hostname;
        const netcraftUrl = `https://api.netcraft.com/v1/sites/${domain}/fingerprint`;

        // Fetch website technologies from Netcraft API
        const netcraftResponse = await axios.get(netcraftUrl);
        
        // Ensure valid response from Netcraft
        if (!netcraftResponse.data || !netcraftResponse.data.technologies) {
            console.error("No technologies found in Netcraft response.");
            return { detectedSoftware: [], vulnerabilities: "No technologies detected." };
        }

        // Extract detected technologies
        const technologies = netcraftResponse.data.technologies.map(tech => tech.name);
        const detectedSoftware = [];
        const vulnerabilities = [];

        // Check each technology against the CVE database
        for (const tech of technologies) {
            console.log(`Checking vulnerabilities for: ${tech}`);

            try {
                const cveResponse = await axios.get(`https://cve.circl.lu/api/search/${tech}`);
                if (cveResponse.data && cveResponse.data.length > 0) {
                    vulnerabilities.push({ [tech]: cveResponse.data });
                    detectedSoftware.push(tech);
                }
            } catch (error) {
                console.error(`Error fetching CVE data for ${tech}:`, error.message);
            }
        }

        return {            
            detectedSoftware,
            vulnerabilities: vulnerabilities.length ? vulnerabilities : "No known vulnerabilities found."
        };
    } catch (error) {
        console.error("Error scanning for outdated software:", error);
        return { error: "Failed to retrieve data. Check API access or network issues." };
    }
}
*/

//Check Firewall / Software / WCAG
async function checkFirewallSoftwareWCAG(url){
  const apiUrl = `http://13.48.59.149:5000/scan?url=${url}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log("Firewall, Software, WCAG Check:", data);
  return data;
}

// Check for Security Headers
async function checkSecurityHeaders(url){
  try {
    const domain = new URL(url).hostname;
    const whoisData = await whois(domain);

    const wafProviders = ["Cloudflare", "Akamai", "Sucuri", "Imperva"];
    const detectedWAF = wafProviders.find(waf => JSON.stringify(whoisData).includes(waf));

    if (detectedWAF) {
      console.log(`Detected WAF: ${detectedWAF}`);
      return `Protected by ${detectedWAF}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Security Headers:", error);
    return null;
  }
}

/******************** ACCESSIBILITY AUDITS ********************/

// Check broken Images / Media
async function checkBrokenMedia(url) {
  try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const mediaElements = [];

      // Extract media elements
      $("img, video, audio, iframe").each((i, elem) => {
          const tag = elem.tagName.toLowerCase();
          let src = $(elem).attr("src") || $(elem).attr("data-src"); // Handle lazy-loaded images
          
          if (!src) return; // Skip if no src attribute

          // Convert relative URLs to absolute
          let absoluteSrc = src.startsWith("http") ? src : new URL(src, url).href;

          mediaElements.push({ tag, src: absoluteSrc });
      });

      console.log("Extracted Media:", mediaElements);

      const brokenMedia = [];

      // Check if media files are broken using HEAD requests
      for (const media of mediaElements) {
          try {
              const response = await axios.head(media.src, { timeout: 5000 });

              if (response.status >= 400) {
                  brokenMedia.push({ tag: media.tag, src: media.src, status: response.status });
              }
          } catch (error) {
              if (error.response) {
                  // Server responded with an error status
                  brokenMedia.push({ tag: media.tag, src: media.src, status: error.response.status });
              } else {
                  // Request failed completely (e.g., CORS, DNS issues, etc.)
                  brokenMedia.push({ tag: media.tag, src: media.src, status: "Broken or Blocked" });
              }
          }
      }

      console.log("Broken Media:", brokenMedia);
      return { mediaElements, brokenMedia };

  } catch (error) {
      console.error("Error fetching page for media check:", error);
      return { mediaElements: [], brokenMedia: [] };
  }
}

// Grade WCAG Compliance
function gradeWCAGCompliance(wcag) {
  if (!wcag || wcag.error) 
    return { grade: 3, message: "WCAG compliance data not available", details: wcag ? wcag.error : "No data" };

  const totalIssues = wcag.violations.length;
  //const criticalIssues = wcag.issues.filter(issue => issue.impact === "critical").length;
  const criticalIssues = wcag.violations.filter(violation => violation.impact === "critical").length;
  const seriousIssues = wcag.violations.filter(violation => violation.impact === "serious").length;  

  if (totalIssues === 0) {
    return { grade: 0, message: "No issues" };    
  }
  if (totalIssues <= 5 && criticalIssues === 0){
    return { grade: 1, message: "Few issues" };    
  }
  if (totalIssues <= 10 && criticalIssues <= 2){
    return { grade: 2, message: "Some issues" };    
  }
  if (totalIssues > 10 || criticalIssues > 2 || seriousIssues > 5){
    return { grade: 3, message: "Significant issues" };    
  }

}

// Flesch-Kincaid Readability Test

async function analyzePageReadability(url) {
  try {
      // Fetch page content
      const response = await axios.get(url, {
          headers: { "User-Agent": "Mozilla/5.0" }
      });

      const $ = cheerio.load(response.data);

      let extractedText = [];

      // Extract text from important elements and add spaces between them
      $("p, h1, h2, h3, h4, h5, h6, span, div")
          .each((_, el) => extractedText.push($(el).text().trim()));

      let text = extractedText.join(" ").replace(/\s+/g, " ").trim();

      // Ensure spaces are added between all text nodes
      text = text.replace(/([a-zA-Z])([A-Z])/g, '$1 $2');

      // Normalize spacing and remove special characters
      text = text
          .replace(/[-_/]+/g, " ") // Ensure words are properly separated
          .replace(/\s+/g, " ") // Remove extra spaces
          .trim();

      if (!text) {
          throw new Error("No readable text found on the page.");
      }

      // Perform readability analysis
      return {
          url,
          text,
          readability: fleschKincaid(text)
      };

  } catch (error) {
      console.error("Error fetching/analyzing text:", error.message);
      return { error: error.message };
  }
}

// Flesch-Kincaid readability function
function fleschKincaid(text) {
  const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length || 1;
  const words = (text.match(/\b\w+\b/g) || []).length || 1;
  const syllables = (text.match(/\b\w+\b/g) || []).reduce((sum, word) => sum + countSyllables(word), 0);

  return {
      fleschReadingEase: (206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words))).toFixed(2),
      fleschKincaidGradeLevel: ((0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59).toFixed(2),
      words,
      sentences,
      syllables
  };
}

// Function to count syllables in a word
function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  const vowels = "aeiouy";
  let syllables = 0;
  let prevIsVowel = false;

  for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);

      if (isVowel && !prevIsVowel) {
          syllables++;
      }

      prevIsVowel = isVowel;
  }

  if (word.endsWith("e")) syllables--;

  return Math.max(syllables, 1);
}



//Lighthouse test / report (last)
async function runLighthouseTest(url) {  


  const { links, brokenLinks } = await getAllAndCheckBrokenLinks(url);  

  const sslCertificate = await checkSSLCertificate(url);  

  const securityHeaders = await checkSecurityHeaders(url);

  const malware = await checkMalware(url);

  const firewallSoftwareWCAG = await checkFirewallSoftwareWCAG(url);

  const firewall = firewallSoftwareWCAG.waf_detection;
  const software = firewallSoftwareWCAG.technology_analysis;

  const wcag = firewallSoftwareWCAG.wcag_compliance;
  const wcagGrade = gradeWCAGCompliance(wcag);

  const openPorts = await checkOpenPorts(url);

  //const outdatedSoftware = await checkOutdatedSoftware(url);

  const { mediaElements, brokenMedia } = await checkBrokenMedia(url);

  const fleschKincaid = await analyzePageReadability(url);
  console.log("Flesch-Kincaid:");
  console.log(fleschKincaid);

  return new Promise((resolve, reject) => {

    const lighthouseConfig = path.resolve("lighthouse-config.json");

    const lighthouseCommand = `lighthouse "${url}" --config-path=${lighthouseConfig} --output=json --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage --max-wait-for-load=60000 --disable-storage-reset"`;

    exec(lighthouseCommand, (error, stdout, stderr) => {

      if (error && error.code !== 1) {
        console.error("Lighthouse error:", error);
        reject({ error: "Lighthouse test failed", details: stderr });
      } 

      // 🔹 Handle Empty stdout Case
      if (!stdout || stdout.trim() === "") {
        console.error("Lighthouse Error: No output received.");
        reject({ error: "Lighthouse did not return any data." });
        return;
      }

      //save the data to the file
      fs.writeFile("lighthouse-report.json", stdout, function(err) {
        if (err) {
          console.log(err);
        }
      });

      try {
        const lighthouseData = JSON.parse(stdout);

        const SEOAudits = lighthouseData.categories["seo"].auditRefs.map(audit => audit.id);
        const SEOAuditsData = SEOAudits.map(audit => {
          return {
            id: audit,
            title: lighthouseData.audits[audit].title,
            description: lighthouseData.audits[audit].description,
            score: lighthouseData.audits[audit].score,
          };
        });

        const bestPracticesAudits = lighthouseData.categories["best-practices"].auditRefs.map(audit => audit.id);    
        const bestPracticesAuditsData = bestPracticesAudits.map(audit => {
          return {
            id: audit,
            title: lighthouseData.audits[audit].title,
            description: lighthouseData.audits[audit].description,
            score: lighthouseData.audits[audit].score,
          };
        });

        const accessibilityAudits = lighthouseData.categories["accessibility"].auditRefs.map(audit => audit.id);
        const accessibilityAuditsData = accessibilityAudits.map(audit => {
          return {
            id: audit,
            title: lighthouseData.audits[audit].title,
            description: lighthouseData.audits[audit].description,
            score: lighthouseData.audits[audit].score,
          };
        });

        const altTextAudits = [
          lighthouseData.audits["image-alt"],
          lighthouseData.audits["input-image-alt"],
          lighthouseData.audits["image-redundant-alt"],
        ];

        const validAltTextScores = altTextAudits
          .map(audit => audit.score)
          .filter(score => score !== null && score !== undefined);

        const altTextScore = validAltTextScores.length > 0
          ? validAltTextScores.reduce((a, b) => a + b, 0) / validAltTextScores.length
          : 0;

        const ariaLabelAudits = [
          lighthouseData.audits["aria-allowed-attr"],
          lighthouseData.audits["aria-allowed-role"],
          lighthouseData.audits["aria-command-name"],
          lighthouseData.audits["aria-conditional-attr"],
          lighthouseData.audits["aria-deprecated-role"],
          lighthouseData.audits["aria-dialog-name"],
          lighthouseData.audits["aria-hidden-body"],
          lighthouseData.audits["aria-hidden-focus"],
          lighthouseData.audits["aria-input-field-name"],
          lighthouseData.audits["aria-meter-name"],
          lighthouseData.audits["aria-progressbar-name"],
          lighthouseData.audits["aria-prohibited-attr"],
          lighthouseData.audits["aria-required-attr"],
          lighthouseData.audits["aria-required-children"],
          lighthouseData.audits["aria-required-parent"],
          lighthouseData.audits["aria-roles"],
          lighthouseData.audits["aria-text"],
          lighthouseData.audits["aria-toggle-field-name"],
          lighthouseData.audits["aria-tooltip-name"],
          lighthouseData.audits["aria-treeitem-name"],
          lighthouseData.audits["aria-valid-attr-value"],
          lighthouseData.audits["aria-valid-attr"],
        ];
                
        const validAriaScores = ariaLabelAudits
          .map(audit => audit.score)
          .filter(score => score !== null && score !== undefined);
        
        const ariaLabelScore = validAriaScores.length > 0 
          ? validAriaScores.reduce((a, b) => a + b, 0) / validAriaScores.length
          : 0;

        const colorContrast = lighthouseData.audits["color-contrast"];
          
        //extract useful data
        const report = {
          performance: {
            ttfb: {
              value: lighthouseData.audits["server-response-time"]?.numericValue || null,
              score: lighthouseData.audits["server-response-time"]?.score || null,
            },
            fcp: {
              value: lighthouseData.audits["first-contentful-paint"]?.numericValue || null,
              score: lighthouseData.audits["first-contentful-paint"]?.score || null,
            },
            lcp: {
              value: lighthouseData.audits["largest-contentful-paint"]?.numericValue || null,
              score: lighthouseData.audits["largest-contentful-paint"]?.score || null,
            },
            cls: {
              value: lighthouseData.audits["cumulative-layout-shift"]?.numericValue || null,
              score: lighthouseData.audits["cumulative-layout-shift"]?.score || null,
            },
            tbt: {
              value: lighthouseData.audits["total-blocking-time"]?.numericValue || null,
              score: lighthouseData.audits["total-blocking-time"]?.score || null,
            },
            speedIndex: {
              value: lighthouseData.audits["speed-index"]?.numericValue || null,
              score: lighthouseData.audits["speed-index"]?.score || null,
            },
            tti: {
              value: lighthouseData.audits["interactive"]?.numericValue || null,
              score: lighthouseData.audits["interactive"]?.score || null,
            },
            js_blocking_time: {
              value: lighthouseData.audits["bootup-time"]?.numericValue || null,
              score: lighthouseData.audits["bootup-time"]?.score || null,
            },
            score: lighthouseData.categories.performance.score * 100,
          },
        
          seo: {
            audits: SEOAuditsData,
            links,
            brokenLinks,
            score: lighthouseData.categories.seo.score * 100,
          },
        
          best_practices: {            
            audits: bestPracticesAuditsData,
            sslCertificate,
            securityHeaders: lighthouseData.audits["csp-xss"]?.details || "No CSP or X-XSS-Protection header found",
            securityHeadersInfo: securityHeaders,
            malware,
            firewall,
            software,
            openPorts,
            score: lighthouseData.categories["best-practices"].score * 100,
          },
        
          accessibility: {
            audits: accessibilityAuditsData,
            viewport: lighthouseData.audits["viewport"]?.score,
            altTextScore,
            ariaLabelScore,
            colorContrast,
            mediaElements,
            brokenMedia,
            fontReadability: lighthouseData.audits["font-size"]?.score,
            wcag,
            wcagGrade,
            fleschKincaid,
            score: lighthouseData.categories.accessibility.score * 100,
          },
        };

        resolve(report);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Raw stdout:", stdout);
        reject({ error: "Failed to parse Lighthouse output" });
      }

    });
  });
}

const userId = 123;

export async function POST(req) {
  try {
    /*
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    */

    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const { db } = await connectToDatabase();

    // Check if a Lighthouse report already exists for this URL
    const existingReport = await db.collection("lighthouse").findOne({ userId: userId, url });

    if (existingReport) {
      return NextResponse.json({ message: "Report fetched from cache", data: existingReport });
    }

    // Run Lighthouse test if no report exists
    const lighthouseReport = await runLighthouseTest(url);

    // Save report to MongoDB
    const result = await db.collection("lighthouse").insertOne({
      userId: userId,
      url,
      report: lighthouseReport,
      createdAt: new Date(), // Required for TTL index
    });

    return NextResponse.json({ message: "Lighthouse report saved", insertedId: result.insertedId, data: lighthouseReport });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
