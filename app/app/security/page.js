"use client";
import { useEffect, useState } from "react";
import { useDataContext } from "../../../components/data-provider";

import LighthouseCard from "@/components/app/LighthouseCard";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';

import ReactMarkdown from "react-markdown"

import { FaSquare } from "react-icons/fa"

function WideTallCard({ title, children }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4">
      <h2 className="text-xl font-semibold tracking-tight pb-4">{title}</h2>
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
    audits: [],
    sslCertificate: {},
    securityHeaders: {},
    malware: {},
    firewall: "",
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
        audits: best_practices.audits || [],
        sslCertificate: best_practices.sslCertificate || {},
        securityHeaders: best_practices.securityHeaders || {},
        malware: best_practices.malware || {},
        firewall: best_practices.firewall || "",
        openPorts: best_practices.openPorts || {},
        software: best_practices.software || {},
        score: best_practices.score
      });

      console.log(securityMetrics.securityHeaders);

    }    
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
          scoreStr={securityMetrics.firewall !== ("" || undefined) ? (securityMetrics.firewall?.includes("No WAF detected") ? "❌" : "✅") : "❌"} 
          score={securityMetrics.firewall !== ("" || undefined) ? (securityMetrics.firewall?.includes("No WAF detected") ? 0 : 100) : 0} 
          textValue={["Not Detected", "Firewall Active"]}/>
        
        {/* Issues */}
        {/* Map each score metric with score < 1 */}
        <WideTallCard className="h-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold py-4">Potential Issues:</h2>
            <div className="flex flex justify-center items-center gap-8">
              <span className="font-semibold">Priority:</span> 
              <div className="flex-col gap-4">
                <span className="flex justify-end items-center gap-2">Low <FaSquare className="text-yellow-400"/></span>
                <span className="flex justify-end items-center gap-2">Medium <FaSquare className="text-orange-400"/></span>
                <span className="flex justify-end items-center gap-2">High <FaSquare className="text-red-400"/></span>
              </div>
            </div>
          </div>
          {/* if any metric is less than 1 show */}
          {securityMetrics.audits.some(audit => audit.score < 1) ? (
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>
                    Metric
                  </TableCell>                  
                  <TableCell>
                    Value/Severity
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
            {securityMetrics.audits.map((audit) => {
              if (audit.score < 1) {
                return (
                  <TableRow 
                    key={audit.id}
                    className={`bg-${audit.score > .89 ? "yellow" : audit.score > .49 ? "orange" : "red"}-200`}
                  >
                    <TableCell>
                      {audit.id}
                    </TableCell>                    
                    <TableCell>
                      {audit.score === null ? "Not found" : "Broken"}
                    </TableCell>
                  </TableRow>                    
                );
              }
            })}
            {securityMetrics.securityHeaders.items?.map((header) => {
              return (
                <TableRow
                  key={header}
                  className={`bg-${header.severity === "High" ? "red" : header.severity === "medium" ? "orange" : "yellow"}-200`}
                >
                  <TableCell>
                    {header.description}
                  </TableCell>                  
                  <TableCell>
                    {header.severity}
                  </TableCell>
                </TableRow>
              )
            })}

            {securityMetrics.firewall !== ("" || undefined) && securityMetrics.firewall?.includes("No WAF detected") && (
              <TableRow className="bg-red-200">
                <TableCell>
                  Firewall Not Detected
                </TableCell>
                <TableCell>
                  High
                </TableCell>
              </TableRow>
            )}
            </TableBody>
            </Table>
          ) : (
          <p className="text-gray-700">Nothing to see here... your website has a perfect score!</p>
          )}
          
        </WideTallCard>
        
      </div>
    </div>
    </>
  )
}