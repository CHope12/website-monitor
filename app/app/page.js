import Link from "next/link"
import { MdSpeed, MdSearch, MdSecurity, MdAccessTime, MdTraffic, MdCompare, MdInsights, MdAccessibility } from "react-icons/md"

function Card({ children, title, icon, bgColor, href }) {  

  return (    
    <div className="w-[50%] md:w-[25%] h-[50%] p-6">
      <Link 
        href={href} 
        className="w-full h-full p-6 bg-[#fafafa] border border-gray-200 rounded-xl flex flex-col justify-center items-center gap-4 hover:bg-white group transition-colors duration-200 ease-in-out shadow-md"
      >
        <div className={`w-[50%] aspect-square rounded-full flex justify-center items-center p-12 ${bgColor}`}>
          {icon}
        </div>
        <h1 className="text-lg text-center font-semibold text-gray-900 group-hover:text-black">{title}</h1>
      </Link>
    </div>
  )
}

export default function Page() {
  return (
    <>      
      <div className="flex flex-wrap w-full h-full">            
        {/*Performance */}
        <Card 
          title="Performance & Speed Optimization" 
          icon={<MdSpeed className="w-full h-full text-blue-500 group-hover:text-blue-600"/>} 
          bgColor="bg-blue-200"
          href="/app/performance" 
        />
        {/* SEO */}
        <Card 
          title="SEO & Metadata Management" 
          icon={<MdSearch className="w-full h-full text-green-500 group-hover:text-green-600"/>} 
          bgColor="bg-green-200" 
          href="/app/SEO" 
        />
        {/* Security */}
        <Card 
          title="Website Security & Protection" 
          icon={<MdSecurity className="w-full h-full text-red-500 group-hover:text-red-600"/>} 
          bgColor="bg-red-200" 
          href="/app/security" 
        />
        {/* Uptime */}
        <Card 
          title="Uptime Monitoring" 
          icon={<MdAccessTime className="w-full h-full text-yellow-500 group-hover:text-yellow-600"/>}
          bgColor="bg-yellow-200" 
          href="/app/uptime" 
        />
        {/* Traffic */}
        <Card 
          title="Traffic Analysis" 
          icon={<MdTraffic className="w-full h-full text-purple-500 group-hover:text-purple-600"/>}
          bgColor="bg-purple-200" 
          href="/app/traffic" 
        />
        {/* Competitors */}
        <Card 
          title="Competitor Analysis" 
          icon={<MdCompare className="w-full h-full text-indigo-500 group-hover:text-indigo-600"/>}
          bgColor="bg-indigo-200" 
          href="/app/competitors" 
        />
        {/* Insights */}
        <Card 
          title="Insights & Analytics" 
          icon={<MdInsights className="w-full h-full text-teal-500 group-hover:text-teal-600"/>} 
          bgColor="bg-teal-200" 
          href="/app/insights" 
        />
        {/* Accessibility */}
        <Card 
          title="Accessibility Improvements" 
          icon={<MdAccessibility className="w-full h-full text-pink-500 group-hover:text-pink-600"/>} 
          bgColor="bg-pink-200" 
          href="/app/accessibility" 
        />        
      </div>
    </>
  )
}