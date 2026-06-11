"use client";

import { useState } from "react";

interface AnalyticsChartsProps {
  metrics: {
    totalPageViews: number;
    successfulLogins: number;
    failedLogins: number;
    formSubmissionsByDate: Record<string, number>;
    pageViewsByDate: Record<string, number>;
  };
}

export default function AnalyticsCharts({ metrics }: AnalyticsChartsProps) {
  const [hoveredSubIndex, setHoveredSubIndex] = useState<number | null>(null);
  const [hoveredViewIndex, setHoveredViewIndex] = useState<number | null>(null);

  // Generate last 7 days list (chronological)
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const formatDateLabel = (dateStr: string) => {
    const [,, day] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date(dateStr);
    return `${months[d.getMonth()]} ${day}`;
  };

  // Extract counts
  const submissionsData = last7Days.map((d) => metrics.formSubmissionsByDate[d] || 0);
  const viewsData = last7Days.map((d) => metrics.pageViewsByDate[d] || 0);

  // Max bounds for scaling
  const maxSub = Math.max(...submissionsData, 3); // minimum scaling height 3
  const maxView = Math.max(...viewsData, 10);    // minimum scaling height 10

  // Chart dimensions
  const width = 500;
  const height = 200;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // 1. Line Chart Coordinates for Submissions
  const getSubPoints = () => {
    return submissionsData.map((val, idx) => {
      const x = padding + (idx * chartWidth) / 6;
      const y = height - padding - (val * chartHeight) / maxSub;
      return { x, y, val };
    });
  };
  const subPoints = getSubPoints();
  const linePath = subPoints.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = subPoints.length > 0 
    ? `${linePath} L ${subPoints[subPoints.length - 1].x} ${height - padding} L ${subPoints[0].x} ${height - padding} Z`
    : "";

  // 2. Bar Chart Coordinates for Page Views
  const barWidth = (chartWidth / 7) * 0.6;
  const barGap = (chartWidth / 7) * 0.4;
  const getBarCoords = () => {
    return viewsData.map((val, idx) => {
      const w = barWidth;
      const h = (val * chartHeight) / maxView;
      const x = padding + idx * (barWidth + barGap) + barGap / 2;
      const y = height - padding - h;
      return { x, y, w, h, val };
    });
  };
  const barCoords = getBarCoords();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* 1. Form Submissions Peak Graph (Line/Area) */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Form Submission Peaks
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Frequency of contact submissions (Last 7 Days)
            </p>
          </div>
          <span className="text-xs font-bold text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400 px-2 py-0.5 rounded">
            Trend Graph
          </span>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
            {/* Gradients */}
            <defs>
              <linearGradient id="subGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(124, 58, 237)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {Array.from({ length: 4 }).map((_, i) => {
              const yVal = padding + (i * chartHeight) / 3;
              const gridLabel = Math.round(maxSub - (i * maxSub) / 3);
              return (
                <g key={i} className="opacity-40">
                  <line
                    x1={padding}
                    y1={yVal}
                    x2={width - padding}
                    y2={yVal}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-zinc-200 dark:text-zinc-800"
                  />
                  <text
                    x={padding - 8}
                    y={yVal + 4}
                    textAnchor="end"
                    fontSize="9"
                    className="fill-zinc-400 dark:fill-zinc-500 font-semibold font-mono"
                  >
                    {gridLabel}
                  </text>
                </g>
              );
            })}

            {/* Filled Area */}
            {areaPath && (
              <path d={areaPath} fill="url(#subGradient)" />
            )}

            {/* Plot Line */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="rgb(124, 58, 237)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Data Nodes */}
            {subPoints.map((p, idx) => (
              <g key={idx}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredSubIndex === idx ? "6" : "4"}
                  className="fill-white dark:fill-zinc-950 stroke-violet-600 cursor-pointer transition-all"
                  strokeWidth="2.5"
                  onMouseEnter={() => setHoveredSubIndex(idx)}
                  onMouseLeave={() => setHoveredSubIndex(null)}
                />
                
                {/* Invisible Hover Area */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="15"
                  className="fill-transparent cursor-pointer"
                  onMouseEnter={() => setHoveredSubIndex(idx)}
                  onMouseLeave={() => setHoveredSubIndex(null)}
                />
              </g>
            ))}

            {/* Date Labels */}
            {last7Days.map((d, idx) => {
              const x = padding + (idx * chartWidth) / 6;
              return (
                <text
                  key={idx}
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-zinc-400 dark:fill-zinc-500 font-semibold"
                >
                  {formatDateLabel(d)}
                </text>
              );
            })}
          </svg>

          {/* Line Chart HTML Tooltip */}
          {hoveredSubIndex !== null && (
            <div
              className="absolute bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex flex-col pointer-events-none transition-all duration-150 animate-fade-in"
              style={{
                left: `${(subPoints[hoveredSubIndex].x / width) * 100}%`,
                top: `${(subPoints[hoveredSubIndex].y / height) * 100 - 32}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span>Submissions: {submissionsData[hoveredSubIndex]}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                {formatDateLabel(last7Days[hoveredSubIndex])}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Daily Visitor Volume Graph (Bar Chart) */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Daily Traffic Metrics
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Separated page load sessions (Last 7 Days)
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded">
            Volume Chart
          </span>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
            {/* Horizontal Gridlines */}
            {Array.from({ length: 4 }).map((_, i) => {
              const yVal = padding + (i * chartHeight) / 3;
              const gridLabel = Math.round(maxView - (i * maxView) / 3);
              return (
                <g key={i} className="opacity-40">
                  <line
                    x1={padding}
                    y1={yVal}
                    x2={width - padding}
                    y2={yVal}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-zinc-200 dark:text-zinc-800"
                  />
                  <text
                    x={padding - 8}
                    y={yVal + 4}
                    textAnchor="end"
                    fontSize="9"
                    className="fill-zinc-400 dark:fill-zinc-500 font-semibold font-mono"
                  >
                    {gridLabel}
                  </text>
                </g>
              );
            })}

            {/* Plot Bars */}
            {barCoords.map((b, idx) => {
              const hovered = hoveredViewIndex === idx;
              return (
                <g key={idx}>
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    rx="4"
                    ry="4"
                    className={`${
                      hovered ? "fill-emerald-500" : "fill-emerald-600 dark:fill-emerald-700"
                    } cursor-pointer transition-all duration-300`}
                    onMouseEnter={() => setHoveredViewIndex(idx)}
                    onMouseLeave={() => setHoveredViewIndex(null)}
                  />
                  {/* Invisible broad hover area */}
                  <rect
                    x={b.x - barGap / 2}
                    y={padding}
                    width={barWidth + barGap}
                    height={chartHeight}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredViewIndex(idx)}
                    onMouseLeave={() => setHoveredViewIndex(null)}
                  />
                </g>
              );
            })}

            {/* Date Labels */}
            {last7Days.map((d, idx) => {
              const x = padding + idx * (barWidth + barGap) + (barWidth + barGap) / 2;
              return (
                <text
                  key={idx}
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-zinc-400 dark:fill-zinc-500 font-semibold"
                >
                  {formatDateLabel(d)}
                </text>
              );
            })}
          </svg>

          {/* Bar Chart HTML Tooltip */}
          {hoveredViewIndex !== null && (
            <div
              className="absolute bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex flex-col pointer-events-none transition-all duration-150 animate-fade-in"
              style={{
                left: `${((barCoords[hoveredViewIndex].x + barWidth / 2) / width) * 100}%`,
                top: `${(barCoords[hoveredViewIndex].y / height) * 100 - 32}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span>Page Views: {viewsData[hoveredViewIndex]}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                {formatDateLabel(last7Days[hoveredViewIndex])}
              </span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
