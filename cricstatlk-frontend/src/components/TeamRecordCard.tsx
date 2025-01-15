import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface TeamRecordCardProps {
  name: string
  image: string
  wins: number
  losses: number
}

const TeamRecordCard: React.FC<TeamRecordCardProps> = ({ name, image, wins, losses }) => {
  const total = wins + losses
  const winPercentage = total ? (wins / total) * 100 : 0
  const lossPercentage = total ? (losses / total) * 100 : 0

  const data = [
    { name: "Wins", value: winPercentage },
    { name: "Losses", value: lossPercentage },
  ]

  const COLORS = ["#4CAF50", "#F44336"]

  return (
    <Card className="w-full max-w-sm bg-[#001a14] text-white border-none overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 mr-4">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">{wins}</p>
            <p className="text-sm text-gray-400">Wins</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">{losses}</p>
            <p className="text-sm text-gray-400">Losses</p>
          </div>
        </div>
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Win Rate: <span className="font-bold text-white">{winPercentage.toFixed(1)}%</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamRecordCard

