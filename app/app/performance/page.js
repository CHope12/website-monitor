"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import LighthouseCard from "@/components/app/LighthouseCard";

import { useDataContext } from "../data-provider";
import { FaSquare } from "react-icons/fa";

  
function WideCard({ title, children, bgColor = "bg-white" }) {
  return (
    <div className={`w-full h-[200px] ${bgColor} border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4`}>
      {children}
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

function WideTallCard({ title, children }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4">
      {children}
    </div>
  );
}

function SmallCard({ title, scoreStr, score }) {
  return (
    <div className="w-[calc(25%-0.75rem)] h-[100px] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col gap-2 justify-start px-8 py-4">
      <h2 className="text-base font-semibold tracking-tighter">{title}</h2>
      <div className="flex justify-between items-center">
        <p>{scoreStr}</p>
        <div className={`px-2 py-1 bg-${score > 89 ? "green" : score > 49 ? "yellow" : "red"}-200 rounded-xl text-${score > 89 ? "green" : score > 49 ? "yellow" : "red"}-900`}>
          {score > 99 ? "Perfect!" : score > 89 ? "Good" : score > 49 ? "Average" : "Poor"}
        </div>
      </div>
    </div>
  );
}

export default function Page() {

  const { lighthouseData, loading } = useDataContext();

  const [performanceMetrics, setPerformanceMetrics] = useState({
    ttfb: {
      value: 0,
      score: 0,
    },
    fcp: {
      value: 0,
      score: 0,
    },
    lcp: {
      value: 0,
      score: 0,
    },
    cls: {
      value: 0,
      score: 0,
    },
    tbt: {
      value: 0,
      score: 0,
    },
    si: {
      value: 0,
      score: 0,
    },
    tti: {
      value: 0,
      score: 0,
    },
    js_blocking_time: {
      value: 0,
      score: 0,
    },
    score: 0,
  });

  function getScore(value, goodThreshold, badThreshold) {
    const normalized = Math.min(1, Math.max(0, (value - goodThreshold) / (badThreshold - goodThreshold)));
  
    return normalized === 0
      ? 100  // Perfect
      : normalized < 0.33
      ? 90   // Good
      : normalized < 0.66
      ? 50   // Average
      : 0;   // Poor
  }
  

  useEffect(() => {
    if (!loading && lighthouseData && lighthouseData.data.report){      
      // Set performance metrics make sure values are not null      
      const performance = lighthouseData.data.report.performance;
      setPerformanceMetrics({
        ttfb: {
          value: performance.ttfb.value || 0,
          score: performance.ttfb.score || 0,
        },
        fcp: {
          value: performance.fcp.value || 0,
          score: performance.fcp.score || 0,
        },
        lcp: {
          value: performance.lcp.value || 0,
          score: performance.lcp.score || 0,
        },
        cls: {
          value: performance.cls.value || 0,
          score: performance.cls.score || 0,
        },
        tbt: {
          value: performance.tbt.value || 0,
          score: performance.tbt.score || 0,
        },
        si: {
          value: performance.speedIndex.value || 0,
          score: performance.speedIndex.score || 0,
        },
        tti: {
          value: performance.tti.value || 0,
          score: performance.tti.score || 0,
        },
        js_blocking_time: {
          value: performance.js_blocking_time.value || 0,
          score: performance.js_blocking_time.score || 0,
        },
        score: performance.score || 0,
      });      
    }
  }, [lighthouseData]);

  if (loading) return (  
    <div className="w-full h-[66vh] flex flex-col justify-center items-center gap-4">
      <div className="w-20 h-20 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>      
      <p className="text-sm text-gray-700">Make sure you have set a website.</p>
    </div>
  );

  return(
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Performance Dashboard</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-12">
        {/* Lighthouse Score */}
        <LighthouseCard title="Lighthouse Performance Score" bgColor='bg-[#151515]' value={performanceMetrics.score} textColor={"#F0F0F0"} expandedSize={725}>
          {/* Lightouse Metrics */}
          <h2 className="text-xl font-semibold py-4 text-[#F0F0F0] text-center">Lighthouse Score Breakdown:</h2>
          <WideTallCard>            
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>
                    Metric
                  </TableCell>
                  <TableCell>
                    Weight (%)
                  </TableCell>
                  <TableCell>
                    Description
                  </TableCell>
                  <TableCell>
                    Score/100
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>First Contentful Paint (FCP)</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>Measures when the first text or image is visible. Ideally ≤1.8s.</TableCell>
                  <TableCell>{Math.round(performanceMetrics.fcp.score * 100)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Speed Index (SI)</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>Measures how quickly the content is visually displayed. Lower is better.</TableCell>
                  <TableCell>{Math.round(performanceMetrics.si.score * 100)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Largest Contentful Paint (LCP)</TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>Measures when the largest visible content (image, text block, etc.) is fully rendered. Ideally ≤2.5s.</TableCell>
                  <TableCell>{Math.round(performanceMetrics.lcp.score * 100)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Blocking Time (TBT)</TableCell>
                  <TableCell>30%</TableCell>
                  <TableCell>Measures the time between FCP and TTI where JavaScript is blocking rendering. Lower is better.</TableCell>
                  <TableCell>{Math.round(performanceMetrics.tbt.score * 100)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cumulative Layout Shift (CLS)</TableCell>
                  <TableCell>25%</TableCell>
                  <TableCell>Measures unexpected layout shifts that negatively impact user experience. Ideally ≤0.1.</TableCell>
                  <TableCell>{Math.round(performanceMetrics.cls.score * 100)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </WideTallCard>  
        </LighthouseCard>
        
        {/* Performance Metrics */}
        <SmallCard 
          title="Time To First Byte:" 
          scoreStr={Math.round(performanceMetrics.ttfb.value) + "ms"} 
          score={getScore(performanceMetrics.ttfb.value, 100, 2000)} 
        />
        <SmallCard 
          title="First Contentful Paint:" 
          scoreStr={Math.round(performanceMetrics.fcp.value) + "ms"} 
          score={getScore(performanceMetrics.fcp.value, 1800, 5000)} 
        />
        <SmallCard 
          title="Largest Contentful Paint:" 
          scoreStr={Math.round(performanceMetrics.lcp.value) + "ms"} 
          score={getScore(performanceMetrics.lcp.value, 2500, 6000)} 
        />
        <SmallCard 
          title="Cumulative Layout Shifts:" 
          scoreStr={performanceMetrics.cls.value.toFixed(2)} 
          score={getScore(performanceMetrics.cls.value, 0.1, 0.5)} 
        />
        <SmallCard 
          title="Speed Index:" 
          scoreStr={Math.round(performanceMetrics.si.value) + "ms"} 
          score={getScore(performanceMetrics.si.value, 3000, 7000)} 
        />
        <SmallCard 
          title="Time to Interactive:" 
          scoreStr={Math.round(performanceMetrics.tti.value) + "ms"} 
          score={getScore(performanceMetrics.tti.value, 200, 7300)} 
        />
        <SmallCard 
          title="Total Blocking Time:" 
          scoreStr={Math.round(performanceMetrics.tbt.value) + "ms"} 
          score={getScore(performanceMetrics.tbt.value, 300, 1000)} 
        />
        <SmallCard 
          title="JavaScript Blocking time:" 
          scoreStr={Math.round(performanceMetrics.js_blocking_time.value) + "ms"} 
          score={getScore(performanceMetrics.js_blocking_time.value, 300, 1200)} 
        />


        {/* Issues */}
        {/* Map each score metric with score < 1 */}
        <WideTallCard className="h-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold py-4">Areas for improvement:</h2>
            <div className="flex flex justify-center items-center gap-8">
              <span className="font-semibold">Priority:</span> 
              <div className="flex-col gap-4">
                <span className="flex justify-end items-center gap-2">Low <FaSquare className="text-green-300"/></span>
                <span className="flex justify-end items-center gap-2">Medium <FaSquare className="text-yellow-300"/></span>
                <span className="flex justify-end items-center gap-2">High <FaSquare className="text-red-300"/></span>
              </div>
            </div>
          </div>
          {/* if any metric is less than 1 show */}
          {Object.values(performanceMetrics).some(metric => metric.score < 1) ? (
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>
                    Metric
                  </TableCell>
                  <TableCell>
                    Value
                  </TableCell>
                  <TableCell>
                    Score
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
            {Object.entries(performanceMetrics).map(([key, metric]) => {
              if (metric.score < 1) {
                return (
                  <TableRow 
                    key={key}
                    className={`bg-${metric.score > .89 ? "green" : metric.score > .49 ? "yellow" : "red"}-200`}
                  >
                    <TableCell>
                      {key.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {(metric.value).toFixed(2) + "ms"}
                    </TableCell>
                    <TableCell>
                      {metric.score}
                    </TableCell>
                  </TableRow>                    
                );
              }
            })}
            </TableBody>
            </Table>     
          ) : (                                               
          <p className="text-gray-700">Nothing to see here... your website has a perfect score!</p>                   
          )}
          
        </WideTallCard>                 
                
      </div>
    </div>
  );
}