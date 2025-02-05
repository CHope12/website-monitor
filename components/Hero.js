"use client";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdMonitorHeart } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

// Chart

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 202, mobile: 120 },
  { month: "April", desktop: 250, mobile: 190 },
  { month: "May", desktop: 260, mobile: 130 },
  { month: "June", desktop: 300, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#CDFF65",
  },
  mobile: {
    label: "Mobile",
    color: "#5057D3",
  },
}

// Hero foreground: #D2D4FF
// Hero background: #161A19
// Hero secondary: #CDFF65
// Card 1: #5057D3
// Card 2: #F1F1F1
// Card 3: #515161


export default function Hero() {
  return (
    <div className="min-h-screen bg-[#161A19] text-black p-2">

      <header className="relative h-20 flex justify-between items-center">
        <div className="bg-[#D2D4FF] h-full w-3/4 rounded-t-3xl flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold flex gap-2 items-center"><MdMonitorHeart />MONITORLY</h1>
          <ul className="flex gap-16 justify-between pr-16">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="bg-[#D2D4FF] h-full w-1/4 rounded-tr-3xl" />
        <div className="absolute right-0 h-full w-1/4 bg-[#161A19] rounded-bl-3xl flex justify-center items-center">
          <Button className="text-base flex justify-center items-center text-[#CDFF65]">START MONITORING <FaArrowRight /></Button>
        </div>
      </header>
      
      <section className="flex flex-col md:flex-row items-center">
        <div className="w-[40%] h-[50vh] bg-[#D2D4FF] pl-8 py-16 rounded-bl-3xl flex justify-center items-center relative">
          <Image src="/hero.svg" alt="Monitoring Dashboard" fill objectFit="contain w-full h-full" />
        </div>
        <div className="flex flex-col w-[60%] h-[50vh]">
          <div className="h-[40vh]">
            <div className="bg-[#D2D4FF] rounded-tr-3xl rounded-br-3xl flex flex-col gap-8 pt-16 pb-8 w-full h-full pr-16">
              <p className="">[ SIMPLE WEBSITE ANALYSIS ]</p>
              <h2 className="text-7xl tracking-tighter">Stay Ahead with Real-time Monitoring</h2>            
              <Button className="bg-[#CDFF65] hover:bg-[#CDFF65] text-black text-lg flex items-center rounded-full h-12 w-[175px] z-10">
                Get Started <GoArrowUpRight />
              </Button>            
            </div>
          </div>
          <div className="h-[calc(10vh+1px)]"> {/* 1px is important somehow */}
            <div className="flex bg-[#161A19] h-full">
              <div className="w-[20vw] h-full bg-[#D2D4FF] rounded-br-3xl"/>
              <div className="w-2/3 h-full bg-[#D2D4FF]">
                <div className="bg-[#161A19] rounded-tl-3xl w-full h-full" />
              </div>
            </div>
          </div>
        </div>        
      </section>  

      <section className="h-[calc(50vh-6.5rem)] w-full flex gap-2 pt-2">
        <div className="w-[30%] h-full bg-[#5057D3] rounded-3xl">
          <div className="flex flex-col items-center w-full h-full">
            <div className="h-2/3 w-[80%] border-b-2 border-[#5B62D5] pt-8 flex justify-between">
              <h3 className="text-white">[ RATING ]</h3>
              <div className="flex gap-1">
                <span className="text-7xl text-white">4.9</span>
                <span><FaStar className="text-[#FCC050] text-lg"/></span>
              </div>
            </div>
            <div className="h-1/3 w-[80%] flex justify-between items-center">
              <div className="w-[40%] h-full flex items-center">
                <div className="bg-gray-400 rounded-full w-[40%] aspect-square flex justify-center items-center -mr-2">
                  <FaUser className="text-white" />
                </div>                
                <div className="bg-[#CDFF65] rounded-full w-[calc(40%+0.25rem)] aspect-square flex justify-center items-center text-black border border-2 border-[#5057D3] cursor-pointer">
                  <GoArrowUpRight />
                </div>
              </div>
              <div className="w-[60%] h-full text-sm text-white flex justify-center items-center">
                <p>The perfect tool for monitoring and analysing websites.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] h-full bg-[#F1F1F1] rounded-3xl p-8">
          <div className="flex flex-col justify-between w-full h-full">
            <p className="text-5xl font-medium tracking-tighter">Real-time insights, faster websites.</p>
            <div className="flex justify-start items-center w-3/4 cursor-pointer group">
              <div className="bg-[#161A19] w-1/6 aspect-square p-4 text-white rounded-full flex justify-center items-center">
                <FaPlay />
              </div>
              <div className="border border-[#161A19] w-5/6 rounded-full h-full flex justify-center items-center group-hover:bg-[#161A19] group-hover:text-white transition-all duration-300 ease-in">
                <p>Why Monitorly?</p>
              </div>
            </div>
          </div>          
        </div>
        <div className="w-[calc(40%-0.5rem)] h-[calc(100%+10vh)] bg-[#515161] rounded-3xl p-8 text-white self-end">
          <p>[ PERFORMANCE IMPROVEMENT ]</p>
          <div className="text-7xl my-4">+22%</div>          
          <ChartContainer config={chartConfig} className="w-full h-[70%] z-10">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              {/*
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              */}
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>            
        </div>
      </section>
    </div>
  );
}
