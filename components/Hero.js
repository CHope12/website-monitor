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
          <Link href="/" className="flex gap-2 text-2xl min-[350px]:text-3xl md:text-2xl font-bold items-center"><MdMonitorHeart /><h1>MONITORLY</h1></Link>
          <ul className="hidden md:flex gap-16 justify-between pr-16">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="bg-[#D2D4FF] h-full w-1/4 rounded-tr-3xl" />
        <div className="absolute right-0 h-full w-1/4 bg-[#161A19] rounded-bl-3xl flex justify-center items-center">
        <Link href="/app">
          <Button className="text-sm md:text-base px-0 md:px-2 flex justify-center items-center text-[#CDFF65] rounded-full transition-all duration-300">
            START <span className="hidden lg:block">MONITORING</span><FaArrowRight />
          </Button>
        </Link>
        </div>
      </header>
      
      <section className="flex items-center">
        <div className="hidden md:flex w-[40%] h-[60svh] md:h-[50svh] bg-[#D2D4FF] pl-8 py-16 flex justify-center items-center relative">
          <Image src="/hero.svg" alt="Monitoring Dashboard" fill objectFit="contain w-full h-full" />
        </div>
        <div className="flex flex-col w-full md:w-[60%] h-[60svh] md:h-[50svh]">
          <div className="h-[50svh] md:h-[40svh]">
            <div className="bg-[#D2D4FF] rounded-tr-3xl rounded-br-3xl flex flex-col gap-8 pt-8 md:pt-16 pb-8 w-full h-full px-8 sm:px-16 md:pl-0 md:pr-16">
              <p className="text-center md:text-start">[ SIMPLE WEBSITE ANALYSIS ]</p>
              <h2 className="text-5xl min-[390px]:text-6xl min-[500px]:text-6xl lg:text-6xl min-[1025px]:text-7xl min-[1178px]:text-6xl min-[1182px]:text-7xl text-balance md:text-wrap tracking-tighter">Stay Ahead with Real-time Monitoring</h2>            
              {/*
              <Button className="hidden md:flex bg-[#CDFF65] hover:bg-[#CDFF65] text-black text-lg items-center rounded-full h-12 w-[175px] z-10">
                Get Started <GoArrowUpRight />
              </Button>            
              */}
            </div>
          </div>
          <div className="h-[calc(10svh)] md:h-[calc(10svh+1px)]"> {/* 1px off sometimes */}
            <div className="flex bg-[#161A19] h-full">
              <div className="w-[60vw] md:w-[20vw] h-full bg-[#D2D4FF] rounded-br-3xl rounded-bl-3xl md:rounded-bl-none flex justify-center items-center">
                <Link href="/app">
                  <Button className="flex bg-[#CDFF65] hover:bg-[#CDFF65] text-black text-lg items-center rounded-full h-12 w-[175px] md:w-[150px] lg:w-[175px] z-10">
                    Get Started <GoArrowUpRight />
                  </Button>
                </Link>
              </div>
              <div className="w-[40vw] md:w-2/3 h-full bg-[#D2D4FF]">
                <div className="bg-[#161A19] rounded-tl-3xl w-full h-full" />
              </div>
            </div>
          </div>
        </div>        
      </section>  

      <section className="h-[calc(40svh-6.5rem)] md:h-[calc(50svh-6.5rem)] w-full flex gap-2 pt-2">
        <div className="w-[30%] h-full bg-[#5057D3] rounded-3xl p-3 sm:p-4 md:p-0">
          <div className="flex flex-col items-center w-full h-full">
            <div className="h-2/3 md:w-[80%] border-b-2 border-[#5B62D5] md:pt-8 flex flex-col lg:flex-row justify-around md:justify-start md:gap-4 lg:gap-0 lg:justify-between">
              <h3 className="text-xs sm:text-base text-white text-center md:text-start">[ RATING ]</h3>
              <div className="flex gap-1">
                <span className="text-4xl sm:text-7xl text-white">4.9</span>
                <span><FaStar className="text-[#FCC050] text-lg"/></span>
              </div>
            </div>
            <div className="h-1/3 w-full md:w-[80%] flex justify-center md:justify-between items-center">
              <div className="w-full max-w-[150px] md:w-[40%] h-full flex items-center justify-center md:justify-start">
                <div className="bg-gray-400 rounded-full w-[40%] aspect-square flex justify-center items-center -mr-2">
                  <FaUser className="text-white" />
                </div>                
                <div className="bg-[#CDFF65] rounded-full w-[calc(40%+0.25rem)] aspect-square flex justify-center items-center text-black border border-2 border-[#5057D3] cursor-pointer">
                  <GoArrowUpRight />
                </div>
              </div>
              <div className="w-[60%] h-full hidden md:flex md:text-sm text-white justify-center items-center">
                <p>The perfect tool for monitoring and analysing websites.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] h-full bg-[#F1F1F1] rounded-3xl p-3 sm:p-4 md:p-8">
          <div className="flex flex-col justify-between w-full h-full">
            <p className="text-lg sm:text-2xl md:text-4xl min-[1025px]:text-5xl font-medium tracking-tighter leading-none">Real-time insights, faster websites.</p>
            <div className="flex justify-start items-center xl:w-3/4 cursor-pointer group h-1/3 md:h-auto min-h-[1/5] max-w-[150px] md:max-w-[100%]">
              <div className="bg-[#161A19] w-[40%] md:w-[24%] lg:w-1/5 aspect-square p-2 sm:p-4 text-white rounded-full flex justify-center items-center">
                <FaPlay />
              </div>
              <div className="hidden md:flex md:text-sm lg:text-base border border-[#161A19] w-5/6 rounded-full h-full justify-center items-center group-hover:bg-[#161A19] group-hover:text-white transition-all duration-200 ease-in">
                <p>Why Monitorly?</p>
              </div>
            </div>
          </div>          
        </div>
        <div className="w-[calc(40%-0.5rem)] h-[calc(100%+10svh)] bg-[#515161] rounded-3xl p-4 md:p-8 text-white self-end">
          <p className="text-xs md:text-base text-center md:text-start">[ PERFORMANCE IMPROVEMENT ]</p>
          <div className="text-2xl sm:text-5xl md:text-7xl my-4">+22%</div>          
          <ChartContainer config={chartConfig} className="w-full h-[50%] md:h-[70%] z-10">
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
