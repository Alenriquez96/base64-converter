"use client";
import Base64Enconder from "@/containers/Base64Enconder";
import Base64Viewer from "@/containers/Base64Viewer";
import SizeChart from "@/containers/SizeChart";
import { useState } from "react";

interface ChartData {
  item: string;
  size: number;
}

export default function Home() {
  const [chartData, setchartData] = useState<ChartData[]>([]);

  const setData = (data: ChartData[]) => {
    // setchartData(data);
  };

  return (
    <main className="min-h-screen">
      <Base64Enconder setChartData={setData} />
      <Base64Viewer />
      {/* {chartData.length > 0 && <SizeChart chartData={chartData} />} */}
    </main>
  );
}
