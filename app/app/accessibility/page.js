"use client";
import React, { useEffect, useState } from "react";
import { useDataContext } from "../../../components/data-provider";

import LighthouseCard from "@/components/app/LighthouseCard";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import Gauge from '@/components/app/Guage';

import ReactMarkdown from "react-markdown";

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
          {textValue ? (score > 89 ? textValue[1] : textValue[0]) : 
          ( score > 99 ? "Perfect" : score > 89 ? "Good" : score > 49 ? "Average" : "Poor")}
          
        </div>  
      </div>
    </div>
  );
}

function WCAGCard({ title, scoreStr, score }) {
  return (
    <div className="w-[calc(25%-0.75rem)] h-[100px] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col gap-2 justify-start px-8 py-4">
      <h2 className="text-base font-semibold tracking-tighter">{title}</h2>
      <div className="flex justify-between items-center">
        <p>{scoreStr}</p>
        <div className={`px-2 py-1 bg-${score === 0 ? "green" : score === 1 ? "yellow" : score === 2 ? "orange" : "red"}-200 rounded-xl text-${score === 0 ? "green" : score === 1 ? "yellow" : score === 2 ? "orange" : "red"}-900`}>
          {score === 0 ? "Perfect" : score === 1 ? "Good" : score === 2 ? "Average" : score === 3 ? "Poor" : "Null"}
        </div>
      </div>
    </div>
  )
}

function ThinCard({ title, children }) {
  return (
    <div className="w-[calc(50%-0.5rem)] h-[200px] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-start items-center px-8 py-4">
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

function AlertCard({ title, children, bgColor = "bg-white" }) {
  return (
    <div className={`w-[calc(25%-0.75rem)] h-[200px] ${bgColor} border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4`}>
      {children}
    </div>
  );
}

const accessibilityWeights = [
  { check: "`[accesskey]` values are unique", weight: 7 },
  { check: "`[aria-*]` attributes match their roles", weight: 10 },
  { check: "Uses ARIA roles only on compatible elements", weight: 1 },
  { check: "`button`, `link`, and `menuitem` elements have accessible names", weight: 7 },
  { check: "Elements with `role=\"dialog\"` or `role=\"alertdialog\"` have accessible names.", weight: 7 },
  { check: "`[aria-hidden=\"true\"]` is not present on the document `<body>`", weight: 10 },
  { check: "`[aria-hidden=\"true\"]` elements do not contain focusable descendents", weight: 7 },
  { check: "ARIA input fields have accessible names", weight: 7 },
  { check: "ARIA `meter` elements have accessible names", weight: 7 },
  { check: "ARIA `progressbar` elements have accessible names", weight: 7 },
  { check: "`[role]`s have all required `[aria-*]` attributes", weight: 10 },
  { check: "Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.", weight: 10 },
  { check: "`[role]`s are contained by their required parent element", weight: 10 },
  { check: "`[role]` values are valid", weight: 7 },
  { check: "Elements with the `role=text` attribute do not have focusable descendents.", weight: 7 },
  { check: "ARIA toggle fields have accessible names", weight: 7 },
  { check: "ARIA `tooltip` elements have accessible names", weight: 7 },
  { check: "ARIA `treeitem` elements have accessible names", weight: 7 },
  { check: "`[aria-*]` attributes have valid values", weight: 10 },
  { check: "`[aria-*]` attributes are valid and not misspelled", weight: 10 },
  { check: "Buttons have an accessible name", weight: 10 },
  { check: "The page contains a heading, skip link, or landmark region", weight: 7 },
  { check: "Background and foreground colors have a sufficient contrast ratio", weight: 7 },
  { check: "`<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.", weight: 7 },
  { check: "Definition list items are wrapped in `<dl>` elements", weight: 7 },
  { check: "Document has a `<title>` element", weight: 7 },
  { check: "`[id]` attributes on active, focusable elements are unique", weight: 7 },
  { check: "ARIA IDs are unique", weight: 10 },
  { check: "No form fields have multiple labels", weight: 3 },
  { check: "`<frame>` or `<iframe>` elements have a title", weight: 7 },
  { check: "Heading elements appear in a sequentially-descending order", weight: 3 },
  { check: "`<html>` element has a `[lang]` attribute", weight: 7 },
  { check: "`<html>` element has a valid value for its `[lang]` attribute", weight: 7 },
  { check: "`<html>` element has an `[xml:lang]` attribute with the same base language as the `[lang]` attribute.", weight: 3 },
  { check: "Image elements have `[alt]` attributes", weight: 10 },
  { check: "Image elements do not have `[alt]` attributes that are redundant text.", weight: 1 },
  { check: "Input buttons have discernible text.", weight: 10 },
  { check: "`<input type=\"image\">` elements have `[alt]` text", weight: 10 },
  { check: "Elements with visible text labels have matching accessible names", weight: 7 },
  { check: "Form elements have associated labels", weight: 7 },
  { check: "Links are distinguishable without relying on color.", weight: 7 },
  { check: "Links have a discernible name", weight: 7 },
  { check: "Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).", weight: 7 },
  { check: "List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent elements", weight: 7 },
  { check: "The document does not use `<meta http-equiv=\"refresh\">`", weight: 10 },
  { check: "`[user-scalable=\"no\"]` is not used in the `<meta name=\"viewport\">` element and the `[maximum-scale]` attribute is not less than 5.", weight: 10 },
  { check: "`<object>` elements have alternate text", weight: 7 },
  { check: "Select elements have associated label elements.", weight: 7 },
  { check: "Skip links are focusable.", weight: 3 },
  { check: "No element has a `[tabindex]` value greater than 0", weight: 7 },
  { check: "Tables have different content in the summary attribute and `<caption>`.", weight: 1 },
  { check: "Tables use `<caption>` instead of cells with the `[colspan]` attribute to indicate a caption.", weight: 7 },
  { check: "`<td>` elements in a large `<table>` have one or more table headers.", weight: 10 },
  { check: "Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.", weight: 7 },
  { check: "`<th>` elements and elements with `[role=\"columnheader\"/\"rowheader\"]` have data cells they describe.", weight: 7 },
  { check: "`[lang]` attributes have a valid value", weight: 7 },
  { check: "`<video>` elements contain a `<track>` element with `[kind=\"captions\"]`", weight: 10 },
  //GPT values
  {check: "ARIA attributes are used as specified for the element's role", weight: 7},
  {check: "Deprecated ARIA roles were not used", weight: 3},
  {check: "Elements use only permitted ARIA attributes", weight: 7},
  {check: "Touch targets have sufficient size and spacing.", weight: 7},
  {check: "Interactive controls are keyboard focusable", weight: 7},
  {check: "Interactive elements indicate their purpose and state", weight: 7},
  {check: "The page has a logical tab order", weight: 7},
  {check: "Visual order on the page follows DOM order", weight: 7},
  {check: "User focus is not accidentally trapped in a region", weight: 10},
  {check: "The user's focus is directed to new content added to the page", weight: 10},
  {check: "HTML5 landmark elements are used to improve navigation", weight: 7},
  {check: "Offscreen content is hidden from assistive technology", weight: 7},
  {check: "Custom controls have associated labels", weight: 7},
  {check: "Custom controls have ARIA roles", weight: 7},
  {check: "All heading elements contain content.", weight: 7},
  {check: "Identical links have the same purpose.", weight: 7},
  {check: "Document has a main landmark.", weight: 7},
  {check: "Elements with visible text labels have matching accessible names.", weight: 7},
  {check: "Tables use <caption> instead of cells with the [colspan] attribute to indicate a caption.", weight: 7},
  {check: "<td> elements in a large <table> have one or more table headers.", weight: 10}
  
];

export default function Page(){

  const { lighthouseData, loading } = useDataContext();

  const [accessibilityMetrics, setAccessibilityMetrics] = useState({
      audits: [],
      links: [],
      brokenLinks: [],
      viewport: 0,
      altTextScore: 0,
      ariaLabelScore: 0,
      colorContrast: {},
      mediaElements: [],
      brokenMedia: [],
      fontReadability: 0,
      wcag: {},
      wcagGrade: {},
      fleschKincaid: {
        readability: {
          fleschReadingEase: 0,
          fleschKincaidGradeLevel: 0,
        }
      },
      score: 100,
    });
  
    useEffect(() => {
      if (!loading && lighthouseData && lighthouseData.data.report){
        const accessibility = lighthouseData.data.report.accessibility;
        const seo = lighthouseData.data.report.seo;    
                        
        setAccessibilityMetrics({          
          audits: accessibility.audits || [],
          links: seo.links || [],
          brokenLinks: seo.brokenLinks || [],          
          viewport: accessibility.viewport || 0,
          altTextScore: accessibility.altTextScore || 0,
          ariaLabelScore: accessibility.ariaLabelScore || 0,
          colorContrast: accessibility.colorContrast || {},
          mediaElements: accessibility.mediaElements || [],
          brokenMedia: accessibility.brokenMedia || [],
          fontReadability: accessibility.fontReadability,
          wcag: accessibility.wcag || {},
          wcagGrade: accessibility.wcagGrade || {},
          fleschKincaid: accessibility.fleschKincaid || {},
          score: accessibility.score,
        });
      }      
    }, [lighthouseData]);
  
    if (loading){
      return (
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold">Accessibility & Content Analytics</h1>
          <p>Loading...</p>
        </div>
      )
    }

  return (
    <>
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Accessibility & Content Analytics</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-12">


      {/* Lighthouse Score */}
      <LighthouseCard title="Lighthouse Accessibility Score" bgColor='bg-[#151515]' value={accessibilityMetrics.score} textColor={"#F0F0F0"} expandedSize={725}>                  

        <h2 className="text-xl font-semibold py-4 text-[#F0F0F0] text-center">Lighthouse Score Breakdown:</h2>
        <WideTallCard>            
          <Table>
            <TableHeader className="bg-[#151515] text-white">
              <TableRow>
                <TableCell>
                  Category
                </TableCell>
                <TableCell> 
                  Weight (%)                   
                </TableCell>
                <TableCell>
                  Example Audits
                </TableCell>
                <TableCell>
                  Score
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
                {accessibilityMetrics.audits && accessibilityMetrics.audits.length > 0 && accessibilityMetrics.audits.map((audit, index) => (
                  (audit.score !== null && (
                  <TableRow key={index}>
                    <TableCell>{audit.title}</TableCell>
                    <TableCell>
                      {
                        accessibilityWeights.find((weight) => weight.check === audit.title) ?
                        accessibilityWeights.find((weight) => weight.check === audit.title).weight
                        : "N/A"
                      }
                    </TableCell>
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
                    <TableCell>{audit.score === 1 ? "✅" : "❌"}</TableCell>
                  </TableRow>
                  ))
                ))}            
            </TableBody>
          </Table>
        </WideTallCard>  
      </LighthouseCard> 

      {/* Small Cards */}
      <SmallCard 
        title="Broken Media" 
        scoreStr={accessibilityMetrics.brokenMedia.length + " / " + accessibilityMetrics.mediaElements.length} 
        score={accessibilityMetrics.brokenMedia.length > 0 ? 0 : 100} 
      />

      <SmallCard 
        title="Broken Links" 
        scoreStr={accessibilityMetrics.brokenLinks.length + " / " + accessibilityMetrics.links.length} 
        score={100} 
      />

      <SmallCard 
        title="Mobile Friendly" 
        scoreStr={accessibilityMetrics.viewport === 1 ? "Viewport detected" : "No viewport"} 
        score={accessibilityMetrics.viewport * 100} 
        textValue={["No", "Yes"]}
      />
      
      <SmallCard 
        title="Alt Text Score" 
        scoreStr={accessibilityMetrics.altTextScore !== 0 ? Math.round(accessibilityMetrics.altTextScore * 100) + "%" : "N/A"} 
        score={accessibilityMetrics.altTextScore !== 0 ? accessibilityMetrics.altTextScore * 100 : 100} 
      />

      <SmallCard 
        title="ARIA Labels Score" 
        scoreStr={accessibilityMetrics.ariaLabelScore !== 0 ? Math.round(accessibilityMetrics.ariaLabelScore * 100) + "%" : "N/A"} 
        score={accessibilityMetrics.ariaLabelScore !== 0 ? accessibilityMetrics.ariaLabelScore * 100 : 100} 
      />


      <SmallCard 
        title="Contrast & Color" 
        scoreStr={accessibilityMetrics.colorContrast.score == 1 ? "No Issues" : "Issues found"} score={accessibilityMetrics.colorContrast.score*100} 
      />

      {/* Font Readibility */}
      <SmallCard 
        title="Font Readability" 
        scoreStr={accessibilityMetrics.fontReadability === 1 ? "No Issues" : "Issues found"}
        score={accessibilityMetrics.fontReadability * 100} 
      />

      {/* WCAG Compliance */}
      <WCAGCard 
        title="WCAG Accessibility Compliance" 
        scoreStr={accessibilityMetrics.wcagGrade.message} 
        score={accessibilityMetrics.wcagGrade.grade} 
      />      

      {/* Readibility Score Breakdown */}                        
      <ThinCard>
        <h2 className="text-lg font-semibold tracking-tight text-center">Content Readibility Score (Flesch-Kincaid)</h2>
        <div className="flex gap-4 h-full">

          <div className="h-full flex justify-center items-center gap-8">
            <Gauge value={accessibilityMetrics.fleschKincaid.readability.fleschReadingEase} max={100} size={100} textColor="text-blue-500"/>
            <div className="flex flex-col justify-center items-center gap-2">
              <p>Flesch Reading Ease Score: {accessibilityMetrics.fleschKincaid.readability.fleschReadingEase}</p>
              <p>Flesch Kincaid Grade Level: {accessibilityMetrics.fleschKincaid.readability.fleschKincaidGradeLevel}</p>
              <p className="font-semibold">{accessibilityMetrics.fleschKincaid.readability.fleschReadingEase > 90 
                  ? "Very Easy (simple sentences)" :
                  accessibilityMetrics.fleschKincaid.readability.fleschReadingEase > 70
                  ? "Fairly Easy (conversational English)" :
                  accessibilityMetrics.fleschKincaid.readability.fleschReadingEase > 60
                  ? "Standard (plain English)" :
                  accessibilityMetrics.fleschKincaid.readability.fleschReadingEase > 30
                  ? "Difficult (College, professional)" :
                  "Very Difficult (College graduate, technical)"                  
                }
              </p>
            </div>
          </div>

        </div>
      </ThinCard>   

      
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
          {(accessibilityMetrics.wcag.total_issues > 0) && (
            <Table>
              <TableHeader className="bg-[#151515] text-white">
                <TableRow>
                  <TableCell>
                    Description
                  </TableCell>                  
                  <TableCell>
                    Element(s)
                  </TableCell>
                  <TableCell>
                    Impact
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessibilityMetrics.wcag.violations.map((violation) => (
                  <TableRow
                    key={violation.id}
                    className={`bg-${violation.impact === "moderate" ? "yellow" : violation.impact === "critical" ? "orange" : "red"}-200`}
                  >
                    <TableCell>
                      {violation.description}
                    </TableCell>
                    <TableCell>
                      <ul className="max-h-[200px] overflow-y-scroll">
                        {violation.elements.map((element, index) => {
                          return (
                           <li key={index} className="text-xs"><span className="font-semibold">{index+1}</span>: {element}</li> 
                          )
                        })}
                      </ul>
                    </TableCell>
                    <TableCell>
                      {violation.impact}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}          
                                
          {accessibilityMetrics.audits.some(audit => (audit.score < 1) && (audit.score !== null)) ? (
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
            {accessibilityMetrics.audits.map((audit) => {
              if (audit.score < 1 && audit.score !== null) {
                return (
                  <TableRow 
                    key={audit.id}
                    className={`bg-${audit.score > .89 ? "green" : audit.score > .49 ? "yellow" : "red"}-200`}
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
            </TableBody>
            </Table>
          ) : ( !(accessibilityMetrics.wcag.total_issues > 0) && (
          <p className="text-gray-700">Nothing to see here... your website has a perfect score!</p>
          ))}
          
        </WideTallCard> 
        
      </div>
    </div>
    </>
  )
}