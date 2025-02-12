import LighthouseCard from "@/components/app/LighthouseCard";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";

import ShadcnAreaChart from "@/components/ui/areaChart";
import UptimeChart from "@/components/ui/uptimeChart";
import VisitorChart from "@/components/ui/visitorChart";
import MultipleBarChart from "@/components/ui/multipleBarChart";

function WideTallCard({ title, children }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4">
      <h2 className="text-xl font-semibold tracking-tight py-4">{title}</h2>
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

function AlertCard({ title, children, bgColor = "bg-white" }) {
  return (
    <div className={`w-[calc(25%-0.75rem)] h-[200px] ${bgColor} border border-gray-200 rounded-lg shadow-md flex flex-col justify-start px-8 py-4`}>
      {children}
    </div>
  );
}

const uptimeData = [
  { time: "12AM", status: "up" },
  { time: "3AM", status: "down" },
  { time: "6AM", status: "up" },
  { time: "9AM", status: "up" },
  { time: "12PM", status: "down" },
  { time: "3PM", status: "up" },
  { time: "6PM", status: "up" },
  { time: "9PM", status: "up" },
];

const alertLog = [
  { date: "Oct 29, 2023 3:10 a.m. BST", reason: "OK", duration: "3d 22h", status: "up" },
  { date: "Oct 28, 2023 3:58 p.m. BST", reason: "PING CRITICAL - Packet loss = 100%", duration: "11h 12m", status: "down" },
  { date: "Oct 27, 2023 7:08 a.m. BST", reason: "OK", duration: "1d 9h", status: "up" },
  { date: "Oct 20, 2023 4:44 a.m. BST", reason: "PING CRITICAL - Packet loss = 100%", duration: "7d 2h", status: "down" },
];

const visitorChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const bounceRateData = [
  { month: "Home", desktop: 186, mobile: 80 },
  { month: "Services", desktop: 305, mobile: 200 },
  { month: "About", desktop: 73, mobile: 190 },
  { month: "Contact", desktop: 237, mobile: 120 },  
]

export default function Page(){
  return (
    <>
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Traffic & User Behaviour Analytics</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-12">       

        {/* Traffic Graph */}
        <div className="w-full">
          <ShadcnAreaChart />
        </div>
        {/* Visitor Devices */}
        <div className="w-[calc(33%-2rem)]">
          <VisitorChart 
            chartData={visitorChartData} 
            title="Visitors"
            description="January - June 2024"
            footerTitle="Trending up by 5.2% this month"
            footerDescription="Showing total visitors for the last 6 months"
          />
        </div>
        <div className="w-[calc(66%-2rem)]">
          <MultipleBarChart             
            chartData={bounceRateData} 
            title="Exit Rate Per Page" 
            description="January - June 2024"
            footerTitle="Trending down by 2.4% this month"
            footerDescription="Showing exit rates for the last 6 months"
          />
        </div>
        
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