import LighthouseCard from "@/components/app/LighthouseCard";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";

import ShadcnAreaChart from "@/components/ui/areaChart";
import UptimeChart from "@/components/ui/uptimeChart";

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

export default function Page(){
  return (
    <>
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Uptime & Downtime Monitoring</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">Update</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-12">       

        {/* Response Time Graph */}
        <div className="w-full">
          <ShadcnAreaChart title="Server Response Time" description={"High 238ms, Low 112ms, Avg 126ms"}/>
        </div>
        <div className="w-full">
          <UptimeChart uptimeData={uptimeData} alertLog={alertLog} />          
        </div>

        {/* Alerts */}
        <AlertCard>
          <h2 className="text-lg font-semibold tracking-tight">Downtime Alerts</h2>
          <p className="text-sm py-2">Get notified when your website goes down or is slow to respond.</p>
          <div className="flex items-center justify-between space-x-2 py-2">            
            <Label htmlFor="email-swtich">Email</Label>
            <Switch id="email-switch" />
          </div>
          <div className="flex items-center justify-between space-x-2 py-2">            
            <Label htmlFor="sms-swtich">SMS</Label>
            <Switch id="sms-switch" />
          </div>
        </AlertCard>

        {/* DNS Health Check */}
        <AlertCard>
          <h2 className="text-lg font-semibold tracking-tight">DNS Health Check</h2>
          <p className="text-sm pt-2">Monitor your DNS records to ensure they are correct and up-to-date.</p>
          <div className="w-full h-full flex items-end">
            <Button className="w-full">Check DNS</Button>
          </div>
        </AlertCard>

        {/* Multi-Location Monitoring */}
        <ThinCard>
          <h2 className="text-lg font-semibold tracking-tight">Multi-Location Monitoring</h2>
          <p className="text-sm py-2">Monitor your website's uptime from multiple locations around the world.</p>
          <div className="w-full h-full flex items-end">
            <Button className="w-full">View Locations</Button>
          </div>
        </ThinCard>
        
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