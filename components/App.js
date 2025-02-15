"use client"
import { useState, useEffect } from "react";
import { NavigationMenuApp } from "@/components/app/nav/nav"
import Breadcrumbs from "@/components/Breadcrumbs";
import DataProvider from "./data-provider";

export default function App({children}) {

  const [website, setWebsite] = useState(null);

  const handleWebsite = (website) => {    
    setWebsite(website);
  }

  useEffect(() => {
    if (website !== null || website !== undefined){
      runLighthouseTest();
    }
  }, [website]);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [lighthouseData, setLighthouseData] = useState(null);

  async function runLighthouseTest() {
    if (!website) {
      alert("Please provide a website URL.");
      return;
    }

    setMessages([]);
    setLighthouseData(null);
    setReporting(false);
    setLoading(true);    

    try {
      // 🔹 First, send a POST request to start the Lighthouse audit
      const response = await fetch("/api/lighthouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: website }),
      });      

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error starting Lighthouse test: " + errorData.error);
        setLoading(false);        
        return;
      }

      const data = await response.json();
      if (data.data){
        setLighthouseData(data);
        setLoading(false);
        return;
      }

      setReporting(true);
      // 🔹 Now, listen for real-time updates via SSE (GET request)
      const eventSource = new EventSource("/api/lighthouse");

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        // 🔹 If we receive the final report, store it and close SSE
        if (data.report) {
          setLighthouseData(data.report);
          setReporting(false);
          setLoading(false);
          eventSource.close();
        } else {
          setMessages((prev) => [...prev, data.message]); // Append live updates
        }
      };

      eventSource.onerror = (event) => {
        console.error("Error receiving SSE updates:", event);
        eventSource.close();
        //setLoading(false);
        setReporting(false);
        setMessages((prev) => [...prev, "Error receiving updates. Please try again."]);
      };

    } catch (error) {
      console.error("Fetch request failed:", error);
      //setLoading(false);
      setReporting(false);
      alert("Failed to start Lighthouse test.");
    }
  }

  useEffect(() => {
    console.log(messages);
  }, [messages]);


  if (reporting) {
    return (
      <>
      <NavigationMenuApp onWebsiteChange={handleWebsite}/>      
      <div className="w-full h-[66vh] flex flex-col justify-center items-center gap-4">
        <div className="w-20 h-20 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>      
          <p className="text-sm text-gray-700">{messages[messages.length - 1]}</p>
      </div>      
      </>
    )
  }

  if (loading) {
    return (
      <>
      <NavigationMenuApp onWebsiteChange={handleWebsite}/>      
      <div className="w-full h-[66vh] flex flex-col justify-center items-center gap-4">
        <div className="w-20 h-20 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>      
          <p className="text-sm text-gray-700">Make sure you have set a website.</p>
      </div>
      </>
    )
  }

  return (
    <>
      <NavigationMenuApp onWebsiteChange={handleWebsite}/>
      <Breadcrumbs />
      <main className="min-h-[calc(100vh-8rem)] p-6 flex justify-center bg-gray-100"> {/* Screen - header - padding */}
        <DataProvider lighthouseData={lighthouseData} loading={loading} >
        {children}
        </DataProvider>
      </main>      
    </>
  );
}