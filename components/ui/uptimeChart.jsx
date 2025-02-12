"use client";

import React from "react";
import { cn } from "@/lib/utils"; // ShadCN utility function
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

const UptimeChart = ({ uptimeData, alertLog}) => {

  if (uptimeData === null || alertLog === null) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Uptime</h2>
      {/* Timeline Chart */}
      <div className="relative flex w-full bg-gray-100 rounded-md overflow-hidden h-5">
        {uptimeData.map((entry, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 h-full",
              entry.status === "up" ? "bg-green-500" : "bg-red-500"
            )}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-start space-x-4 mt-3 text-sm">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-green-500 rounded" />
          <span>Uptime</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-red-500 rounded" />
          <span>Downtime</span>
        </div>
      </div>

      {/* Alert Log Table */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Alert Log</h2>
      <Table className="w-full">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableCell className="p-3 font-semibold">Date</TableCell>
            <TableCell className="p-3 font-semibold">Reason</TableCell>
            <TableCell className="p-3 font-semibold">Duration</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alertLog.map((alert, index) => (
            <TableRow key={index} className="border-t">
              <TableCell className="p-3">{alert.date}</TableCell>
              <TableCell className={cn("p-3", alert.status === "down" ? "text-red-500" : "text-green-600")}>
                {alert.reason}
              </TableCell>
              <TableCell className="p-3">{alert.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UptimeChart;