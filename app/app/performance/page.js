//import WideCard from '@/components/app/WideCard';
import Gauge from '@/components/app/Guage';
import { Button } from "@/components/ui/button"
import { MdSpeed } from "react-icons/md";

import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
  
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


export default function Page() {
  return (
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Website Performance Dashboard</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-12">
        {/* Lighthouse Score */}
        <WideCard bgColor='bg-[#151515]'>
          <div className="flex w-full h-full justify-between px-32 items-center">
            <h2 className="text-5xl font-semibold text-[#F0F0F0]">Lighthouse Performance Score</h2>
            <div className="h-full aspect-square flex justify-center items-center">
              <Gauge value={90} max={100} size={100} textColor={"#F0F0F0"}/>
            </div>
          </div>
        </WideCard>
        <ThinCard>
          <h2 className="text-xl font-semibold py-4">Page Load Time: </h2>
          <div className="h-[1px] w-full bg-gray-200 my-1" />
          <p className="text-sm">Time To First Byte (TTFB): 200ms</p>
          <div className="h-[1px] w-full bg-gray-200 my-1" />
          <p className="text-sm">First Contentful Paint (FCP): 1.8s</p>
          <div className="h-[1px] w-full bg-gray-200 my-1" />
          <p className="text-sm">Largest Contentful Paint (LCP): 2.5s</p>
          <div className="h-[1px] w-full bg-gray-200 my-1" />
        </ThinCard>
        <ThinCard>
          <h2 className="text-xl font-semibold py-4">Total Blocking Time (TBT): </h2>
          <div className="h-[1px] w-full bg-gray-200" />
          <p className="text-sm">Total Blocking Time (TBT): 200ms</p>
          <div className="h-[1px] w-full bg-gray-200" />
          <p className="text-sm">Cumulative Layout Shift (CLS): 0.1</p>
          <div className="h-[1px] w-full bg-gray-200" />
          <p className="text-sm">Speed Index (SI): 2.5s</p>
          <div className="h-[1px] w-full bg-gray-200" />
          <p className="text-sm">CSS: 200ms</p>
          <div className="h-[1px] w-full bg-gray-200" />
          <p className="text-sm">JavaScript: 200ms</p>
          <div className="h-[1px] w-full bg-gray-200" />
        </ThinCard>
        {/* Issues */}
        <WideCard>
          <h2 className="text-xl font-semibold py-4">Issues:</h2>
          <p className="text-gray-700">Nothing to see here... your website has a perfect score!</p>
        </WideCard>                 
        
        {/* CDN Usage */}
        <WideCard>
          <h2 className="text-xl font-semibold">Content Delivery Network (CDN) Usage:</h2>
          <div className="flex justify-around items-center w-full h-full">
            <p>Cloudflare✅</p>
            <p>AWS CloudFront✅</p>
          </div>
        </WideCard>

        {/* Lightouse Metrics */}
        <h2 className="text-xl font-semibold py-4">Lighthouse Score Breakdown:</h2>
        <WideTallCard>
          {/*
          Metric	Weight (%)	Description
          Largest Contentful Paint (LCP)	25%	Measures when the largest visible content (image, text block, etc.) is fully rendered. Ideally ≤2.5s.
          Total Blocking Time (TBT)	30%	Measures time between First Contentful Paint (FCP) and Time to Interactive (TTI). A high TBT indicates JavaScript is blocking rendering.
          Cumulative Layout Shift (CLS)	25%	Measures unexpected layout shifts that negatively impact user experience. Ideally ≤0.1.
          Speed Index (SI)	10%	Measures how quickly the page visually loads. Lower is better.
          Time to First Byte (TTFB)	10%	Measures server response time; affects initial page load. Ideally ≤200ms.
          First Contentful Paint (FCP)	10%	Measures how quickly the first piece of content (text, image, etc.) appears. Ideally ≤1.8s.
          */}
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
                  Score
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Largest Contentful Paint (LCP)</TableCell>
                <TableCell>25%</TableCell>
                <TableCell>Measures when the largest visible content (image, text block, etc.) is fully rendered. Ideally ≤2.5s.</TableCell>
                <TableCell>90</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Blocking Time (TBT)</TableCell>
                <TableCell>30%</TableCell>
                <TableCell>Measures time between First Contentful Paint (FCP) and Time to Interactive (TTI). A high TBT indicates JavaScript is blocking rendering.</TableCell>
                <TableCell>90</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cumulative Layout Shift (CLS)</TableCell>
                <TableCell>25%</TableCell>
                <TableCell>Measures unexpected layout shifts that negatively impact user experience. Ideally ≤0.1.</TableCell>
                <TableCell>90</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Speed Index (SI)</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>Measures how quickly the page visually loads. Lower is better.</TableCell>
                <TableCell>90</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Time to First Byte (TTFB)</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>Measures server response time; affects initial page load. Ideally ≤200ms.</TableCell>
                <TableCell>90</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </WideTallCard>  
      </div>
    </div>
  );
}