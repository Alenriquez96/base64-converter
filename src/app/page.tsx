"use client";
import Base64Enconder from "@/containers/Base64Enconder";
import Base64Viewer from "@/containers/Base64Viewer";
import SizeChart from "@/containers/SizeChart";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <main className="min-h-screen flex justify-center ">
      <Tabs defaultValue="encode" className="w-3/4 m-7">
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="encode">
            Encode
          </TabsTrigger>
          <TabsTrigger className="w-full" value="view">
            Viewer
          </TabsTrigger>
        </TabsList>
        <TabsContent value="encode">
          <Base64Enconder setChartData={setData} />
        </TabsContent>
        <TabsContent value="view">
          <Base64Viewer />
        </TabsContent>
      </Tabs>

      {/* {chartData.length > 0 && <SizeChart chartData={chartData} />} */}
    </main>
  );
}
