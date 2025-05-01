import React from "react"
import { ChartContainer } from "./chart"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend } from "recharts"
import { chartData } from "@/assets/data"


const chartConfig = {
    tasks: {
        label: "Tasks",
        color: "#10b981", // Indigo-600
    },
}

const MyChart = () => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[240px] w-full">
            <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={8}
                    axisLine={false}
                />
                <YAxis dataKey="total" />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="var(--color-tasks)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartContainer>
    )
}

export default MyChart
