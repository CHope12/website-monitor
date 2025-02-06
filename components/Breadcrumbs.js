"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Breadcrumbs() {

  const pathname = usePathname();

  const split = pathname.split("/").filter((x) => x);
  const pathArray = split.slice(1, split.length);

  

  return (
    <div className="text-sm text-gray-600 pl-8 bg-gray-100 pt-6">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/app" className="hover:underline text-blue-600">App</Link>
        </li>
        <li>/</li>
        {pathArray.slice(0, pathArray.length).map((part, index) => {
          const path = `/${pathArray.slice(0, index + 1).join("/")}`;
          const label = part.charAt(0).toUpperCase() + part.slice(1);
          if (index === pathArray.length - 1) {
            return <li key={path} className="text-gray-500">{label}</li>;
          }
          return (
            <>
            <li key={path}>
              <Link href={path} className="hover:underline text-blue-600">{label}</Link>
            </li>
            <li key={index}>/</li>
            </>
          );
        })}
      </ul>
    </div>
  )
}