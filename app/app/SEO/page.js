"use client";

import { useEffect, useState } from "react";
import { useDataContext } from "../data-provider";

import LighthouseCard from "@/components/app/LighthouseCard";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';

import ReactMarkdown from "react-markdown"

function WideCard({ title, children, bgColor = "bg-white" }) {
  return (
    <div className={`w-full h-[200px] ${bgColor} border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4`}>
      {children}
    </div>
  );
}

function WideTallCard({ title, children }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4">
      <h2 className="text-xl font-semibold tracking-tight py-4">{title}</h2>
      {children}
    </div>
  );
}

function SmallCard({ title, scoreStr, score, textValue }) {
  return (
    <div className="w-[calc(25%-0.75rem)] h-[100px] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col gap-2 justify-start px-8 py-4">
      <h2 className="text-base font-semibold tracking-tighter">{title}</h2>
      <div className="flex justify-between items-center">
        <p>{scoreStr}</p>
        <div className={`px-2 py-1 bg-${score === 1 ? "green" : "red"}-200 rounded-xl text-${score === 1 ? "green" : "red"}-900`}>
          {score === 1 ? [textValue[1]] : textValue[0]}
        </div>
      </div>
    </div>
  );
}

function ThinCard({ title, children }) {
  return (
    <div className="w-[calc(50%-0.5rem)] h-[200px] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-4 py-4">
      {children}
    </div>
  );
}

export default function Page() {

    const { lighthouseData, loading } = useDataContext();
  
    const [SEOMetrics, setSEOMetrics] = useState({
      audits: [],
      links: [
        "https://example.com/link-1",
        "https://example.com/link-2",
      ],
      brokenLinks: [
        {
          url: "https://example.com/broken-link-1", 
          status: 404,
        },
      ],
      score: 0,
    });
  
    useEffect(() => {
      if (!loading && lighthouseData && lighthouseData.data.report){      
        // Set SEO metrics make sure values are not null      
        const SEO = lighthouseData.data.report.seo;
        setSEOMetrics({
          audits: SEO.audits || [],
          links: SEO.links || [],
          brokenLinks: SEO.brokenLinks || [],
          score: SEO.score || 0,
        });      
      }
    }, [lighthouseData]);
  
    if (loading) return (  
      <div className="w-full h-[66vh] flex flex-col justify-center items-center gap-4">
        <div className="w-20 h-20 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>      
        <p className="text-sm text-gray-700">Make sure you have set a website.</p>
      </div>
    );

  return (
    <>
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">SEO Dashboard</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-12">
        {/* Lighthouse Score */}
        <LighthouseCard title="Lighthouse SEO Score" bgColor='bg-[#151515]' value={SEOMetrics.score} textColor={"#F0F0F0"} expandedSize={800}>
          {/* Lightouse Metrics */}
          <h2 className="text-xl font-semibold py-4 text-[#F0F0F0] text-center">Lighthouse Score Breakdown:</h2>
          <WideTallCard>            
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>
                    SEO Check
                  </TableCell>
                  <TableCell>
                    Weight (%)
                  </TableCell>
                  <TableCell>
                    Description
                  </TableCell>
                  <TableCell>
                    Pass / Fail
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
              {SEOMetrics.audits && SEOMetrics.audits.length > 0 && SEOMetrics.audits.map((audit, index) => (
                  <TableRow key={index}>
                    <TableCell>{audit.title}</TableCell>                          
                    <TableCell>{audit.title !== "Structured data is valid" ? (Math.round(100 / SEOMetrics.audits.length - 1)) : "0"}</TableCell>                  
                    <TableCell>
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />
                          ),
                        }}
                      >
                        {audit.description}
                      </ReactMarkdown>
                    </TableCell>
                    <TableCell>{audit.score === null ? "Null (✅)" : audit.score === 1 ? "✅" : "❌"}</TableCell>
                  </TableRow>
                ))}                 
              </TableBody>
            </Table>
          </WideTallCard>  
        </LighthouseCard>
        
        
        {/* Backlinks */}
        <ThinCard>
          <h2 className="text-lg font-semibold mb-2">Backlinks</h2>          
          <p className="text-sm text-gray-800">Coming soon!</p>
        </ThinCard>

        {/* Internal Links */}
        <ThinCard>          
          <h2 className="text-lg font-semibold mb-2">Internal Links ({SEOMetrics.links.length})</h2>          
          <div className="max-h-60 overflow-y-auto border p-2 rounded-md bg-gray-50">
            {SEOMetrics.links.length > 0 ? (
              SEOMetrics.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline mb-1"
                >
                  {link}
                </a>
              ))
            ) : (
              <p className="text-gray-500">No internal links found.</p>
            )}
          </div>
        </ThinCard>


        {/* Small Cards 
        <SmallCard title="Broken Links:" scoreStr={SEOMetrics.brokenLinks.length} score={SEOMetrics.brokenLinks.length === 0 ? 1 : 0} textValue={["Found", "Perfect!"]}/>
        <SmallCard title="XML Sitemap" scoreStr={SEOMetrics.sitemap.score === 1 ? "✅" : "❌"} score={SEOMetrics.sitemap.score}  textValue={["Missing", "Valid"]}/>
        <SmallCard title="Robots.txt" scoreStr={SEOMetrics.robots.score === 1 ? "✅" : "❌"} score={SEOMetrics.robots.score}  textValue={["Missing", "Valid"]}/>
        <SmallCard title="Schema Markup" scoreStr={SEOMetrics.structuredDataValid.score === 1 ? "✅" : "❌"} score={SEOMetrics.structuredDataValid.score}  textValue={["Missing", "Valid"]}/>
        */}

        {/* Issues */}
        <WideCard>
          <h2 className="text-xl font-semibold py-4">Issues:</h2>
          <p className="text-gray-700">Nothing to see here... your website has a perfect SEO score!</p>
        </WideCard>

        {/* SERP Position Tracking
        <WideTallCard title="Keyword Rank Tracking">
          <Table>
            <TableHeader className="bg-[#151515] text-white">
              <TableRow>
                <TableCell>
                  Keyword
                </TableCell>
                <TableCell>
                  Current Position
                </TableCell>
                <TableCell>
                  Change (24hrs)
                </TableCell>
                <TableCell>
                  URL
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  Example Keyword 1
                </TableCell>
                <TableCell>
                  3
                </TableCell>
                <TableCell>
                  +1
                </TableCell>
                <TableCell>
                  /example-url-1
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Example Keyword 2
                </TableCell>
                <TableCell>
                  7
                </TableCell>
                <TableCell>
                  -2
                </TableCell>
                <TableCell>
                  /example-url-2
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Example Keyword 3
                </TableCell>
                <TableCell>
                  1
                </TableCell>
                <TableCell>
                  0
                </TableCell>
                <TableCell>
                  /example-url-3
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </WideTallCard>

        {/* Competitor Keyword Analysis
        <WideTallCard title="Competitor Keyword Analysis">
          <Table>
            <TableHeader className="bg-[#151515] text-white">
              <TableRow>
                <TableCell>
                  Competitor
                </TableCell>
                <TableCell>
                  Keywords
                </TableCell>
                <TableCell>
                  Top 3 Keywords
                </TableCell>
                <TableCell>
                  Top 10 Keywords
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  Competitor 1
                </TableCell>
                <TableCell>
                  100
                </TableCell>
                <TableCell>
                  10
                </TableCell>
                <TableCell>
                  30
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Competitor 2
                </TableCell>
                <TableCell>
                  200
                </TableCell>
                <TableCell>
                  20
                </TableCell>
                <TableCell>
                  50
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </WideTallCard>        
        */}        

      </div>
    </div>
    </>
  );
}