"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "../data-provider";

import LighthouseCard from "@/components/app/LighthouseCard";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';

import ReactMarkdown from "react-markdown"

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
        <div className={`px-2 py-1 bg-${score > 89 ? "green" : score > 49 ? "yellow" : "red"}-200 rounded-xl text-${score > 89 ? "green" : score > 49 ? "yellow" : "red"}-900`}>
          {score === 1 ? [textValue[1]] : textValue[0]}
        </div>
      </div>
    </div>
  );
}

function ThinCard({ title, children }) {
  return (
    <div className="w-[calc(50%-0.5rem)] h-[200px] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4">
      {children}
    </div>
  );
}

function WideCard({ title, children, bgColor = "bg-white" }) {
  return (
    <div className={`w-full h-[200px] ${bgColor} border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4`}>
      {children}
    </div>
  );
}

export default function Page(){

  const { lighthouseData, loading } = useDataContext();

  const [securityMetrics, setSecurityMetrics] = useState({
    audits: {},
    sslCertificate: {},
    securityHeaders: {},
    malware: {},
    firewall: {},
    openPorts: {},
    software: {},
    score: 100,
  });

  useEffect(() => {
    if (!loading && lighthouseData && lighthouseData.data.report){
      const best_practices = lighthouseData.data.report.best_practices;
      console.log("Best Practices: ");
      console.log(best_practices);
      setSecurityMetrics({
        audits: best_practices.audits || {},
        sslCertificate: best_practices.sslCertificate || {},
        securityHeaders: best_practices.securityHeaders || {},
        malware: best_practices.malware || {},
        firewall: best_practices.firewall || {},
        openPorts: best_practices.openPorts || {},
        software: best_practices.software || {},
        score: best_practices.score
      });
    }
    console.log("Firewall");
    console.log(securityMetrics.firewall.result !== undefined && securityMetrics.firewall.result.includes("No WAF detected by the generic detection"));
  }, [lighthouseData]);

  if (loading){
    return (
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold">Security & Best Practices Dashboard</h1>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Security & Best Practices Dashboard</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-12">       

        {/* Lighthouse Score */}
        <LighthouseCard title="Lighthouse Best Practices Score" bgColor='bg-[#151515]' value={securityMetrics.score} textColor={"#F0F0F0"} expandedSize={800}>
          {/* Lightouse Metrics */}
          <h2 className="text-xl font-semibold py-4 text-[#F0F0F0] text-center">Lighthouse Score Breakdown:</h2>
          <WideTallCard>
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Weight (%)</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Pass/Fail</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityMetrics.audits && securityMetrics.audits.length > 0 && securityMetrics.audits.map((audit, index) => (
                  <TableRow key={index}>
                    <TableCell>{audit.title}</TableCell>                          
                    <TableCell>{100 / securityMetrics.audits.length}</TableCell>              
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
        
        <ThinCard>
          <div className="flex justify-between items-center mb-4"><h2 className="font-semibold text-lg tracking-tight">SSL Certificate Check: </h2>✅</div>
          {/*
          <p>Cipher Suite: TLS_AES_256_GCM_SHA384</p>
          <p>Key Exchange: ECDHE_RSA</p>
          <p>Protocol: TLS 1.3</p>
          <p>Expiration: 2023-09-01</p>
          */}
          <div className="flex justify-between items-center">
            <p>Domain:</p><p className="w-1/2 text-left font-semibold">{securityMetrics.sslCertificate.domain}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Issuer:</p><p className="w-1/2 text-left font-semibold">{securityMetrics.sslCertificate.issuer}</p>
          </div>
          <div className="flex justify-between items-center">
          <p>Valid From:</p><p className="w-1/2 text-left font-semibold">{securityMetrics.sslCertificate.validFrom}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Valid To:</p><p className="w-1/2 text-left font-semibold">{securityMetrics.sslCertificate.validTo}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Days Remaining:</p><p className="w-1/2 text-left font-semibold">{securityMetrics.sslCertificate.validDaysRemaining}</p>
          </div>
        </ThinCard>
        {/*
        <ThinCard>
          <div className="flex justify-between items-center mb-4"><h2 className="font-semibold text-lg tracking-tight">Website Firewall Check: </h2>✅</div>          
          <p>Firewall: Active</p>
          <p>WAF: Active</p>
          <p>DDoS Protection: Active</p>          
        </ThinCard>
        
        <ThinCard>
          <div className="flex justify-between items-center mb-4"><h2 className="font-semibold text-lg tracking-tight">Malware & Phishing Detection: </h2>✅</div>
          <p>Malware Scanner: Active</p>
          <p>Phishing Protection: Active</p>          
        </ThinCard>
        */}        
        <ThinCard>
          <div className="flex justify-between items-center mb-4"><h2 className="font-semibold text-lg tracking-tight">Open Ports & Vulnerability Scan: </h2></div>
          {securityMetrics.openPorts.results && securityMetrics.openPorts.results.length > 0 ? (
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>Port</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityMetrics.openPorts.results.map((port, index) => (
                  port.status === "open" ? (
                    <TableRow key={index}>
                      <TableCell>{port.port}</TableCell>
                      <TableCell>{port.service}</TableCell>
                      <TableCell>{port.status}</TableCell>
                    </TableRow>
                  ) : null
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No open ports detected!</p>
          )}
        </ThinCard>

        <ThinCard>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg tracking-tight">Software Detection:</h2>
          </div>
          {securityMetrics.software && securityMetrics.software.tech_stack && Object.keys(securityMetrics.software.tech_stack).length > 0 ? (
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Version</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(securityMetrics.software.tech_stack).map(([software, data], index) => (
                  <TableRow key={index}>                  
                    <TableCell>{software}</TableCell>
                    <TableCell>{data.version}</TableCell>                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>            
          ) : (
            <p>No software detected!</p>
          )}
        </ThinCard>

        <ThinCard>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg tracking-tight">HTTP Security Headers Analysis:</h2>
            {securityMetrics.securityHeaders.items && securityMetrics.securityHeaders.items.length > 0 ? "❌" : "✅"}
          </div>
          {securityMetrics.securityHeaders.items && securityMetrics.securityHeaders.items.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Severity</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityMetrics.securityHeaders.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.severity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No security headers detected!</p>
          )}
        </ThinCard>

        <SmallCard title="Malware & Phishing Detection" scoreStr={securityMetrics.malware == {} ? "❌" : "✅"} score={securityMetrics.malware == {} ? 0 : 100} textValue={["No Malware Detected", "Malware Detected."]}/>
        <SmallCard 
          title="Web Application Firewall (WAF)"
          scoreStr={securityMetrics.firewall.result !== undefined ? (securityMetrics.firewall.result.includes("No WAF detected by the generic detection") ? "❌" : "✅") : "❌"} 
          score={securityMetrics.firewall.result !== undefined ? (securityMetrics.firewall.result.includes("No WAF detected by the generic detection") ? 0 : 100) : 0} 
          textValue={["Not Detected", "Firewall Active"]}/>
        
        {/* Issues */}
        <WideCard>
          <h2 className="text-xl font-semibold py-4">Issues:</h2>
          <p className="text-gray-700">Nothing to see here... your website has no vulnerabilties!</p>
        </WideCard>    
        
      </div>
    </div>
    </>
  )
}