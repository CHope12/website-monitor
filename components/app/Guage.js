"use client";

import React from "react";
import { Arc } from "@visx/shape";
import { Group } from "@visx/group";

const Gauge = ({ value = 75, max = 100, size = 150, textColor = "#1f2937" }) => {

  const radius = size / 2;
  const angle = (value / max) * 2 * Math.PI; // Convert value to angle

  //#10B981

  const color = value > 89 ? "#01C55B" : value > 49 ? "#FFA02D" : "#FF2D2D";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Group top={radius} left={radius}>
        {/* Background Arc */}
        <Arc
          startAngle={0}
          endAngle={2*Math.PI}
          innerRadius={radius - 10}
          outerRadius={radius}
          fill={"#E5E7EB"}
        />
        {/* Foreground Arc */}
        <Arc
          startAngle={0}
          endAngle={angle}
          innerRadius={radius - 10}
          outerRadius={radius}
          fill={color}
        />        
        {/* Percentage Label */}
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fontSize={18}
          fontWeight="bold"
          fill={textColor}
        >
          {Math.round((value / max) * 100)}%
        </text>
      </Group>
    </svg>
  );
};

export default Gauge;