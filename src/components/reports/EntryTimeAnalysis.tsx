
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Clock, TrendingUp } from "lucide-react";

// Mock data for entry time analysis
const entryTimeData = [
  { hour: "06:00", entries: 2, label: "6 AM" },
  { hour: "07:00", entries: 8, label: "7 AM" },
  { hour: "08:00", entries: 15, label: "8 AM" },
  { hour: "09:00", entries: 12, label: "9 AM" },
  { hour: "10:00", entries: 6, label: "10 AM" },
  { hour: "11:00", entries: 4, label: "11 AM" },
  { hour: "12:00", entries: 3, label: "12 PM" },
  { hour: "13:00", entries: 5, label: "1 PM" },
  { hour: "14:00", entries: 7, label: "2 PM" },
  { hour: "15:00", entries: 9, label: "3 PM" },
  { hour: "16:00", entries: 14, label: "4 PM" },
  { hour: "17:00", entries: 18, label: "5 PM" },
  { hour: "18:00", entries: 22, label: "6 PM" },
  { hour: "19:00", entries: 16, label: "7 PM" },
  { hour: "20:00", entries: 11, label: "8 PM" },
  { hour: "21:00", entries: 5, label: "9 PM" },
];

const chartConfig = {
  entries: {
    label: "Entradas",
    color: "#ef4444",
  },
};

const EntryTimeAnalysis = () => {
  // Calculate peak hour
  const peakHour = entryTimeData.reduce((prev, current) => 
    prev.entries > current.entries ? prev : current
  );

  // Calculate average entries per hour
  const totalEntries = entryTimeData.reduce((sum, hour) => sum + hour.entries, 0);
  const averageEntriesPerHour = Math.round(totalEntries / entryTimeData.length);

  // Calculate morning vs evening distribution
  const morningEntries = entryTimeData
    .filter(hour => parseInt(hour.hour.split(':')[0]) < 12)
    .reduce((sum, hour) => sum + hour.entries, 0);
  
  const eveningEntries = totalEntries - morningEntries;
  const morningPercentage = Math.round((morningEntries / totalEntries) * 100);

  return (
    <div className="grid gap-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="haven-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Hora Pico</p>
                <p className="text-xl font-bold text-haven-red">{peakHour.label}</p>
                <p className="text-xs text-white/40">{peakHour.entries} entradas</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-haven-red/20 flex items-center justify-center">
                <TrendingUp className="text-haven-red" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Promedio/Hora</p>
                <p className="text-xl font-bold text-blue-400">{averageEntriesPerHour}</p>
                <p className="text-xs text-white/40">entradas promedio</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Clock className="text-blue-400" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="haven-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/60">Mañana vs Tarde</p>
                <p className="text-xl font-bold text-green-400">{morningPercentage}% / {100 - morningPercentage}%</p>
                <p className="text-xs text-white/40">distribución</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Clock className="text-green-400" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entry Time Chart */}
      <Card className="haven-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-haven-red" />
            Análisis de Horarios de Entrada
          </CardTitle>
          <CardDescription className="text-white/60">
            Distribución de entradas por hora del día
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={entryTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="label" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff80', fontSize: 11 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff80', fontSize: 11 }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                />
                <Bar 
                  dataKey="entries" 
                  fill="var(--color-entries)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <Card className="haven-card">
        <CardHeader>
          <CardTitle className="text-white text-lg">Insights de Horarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-haven-dark/50 rounded-lg">
              <span className="text-white/80">Horario más concurrido:</span>
              <span className="text-haven-red font-semibold">{peakHour.label} ({peakHour.entries} entradas)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-haven-dark/50 rounded-lg">
              <span className="text-white/80">Preferencia matutina:</span>
              <span className="text-blue-400 font-semibold">{morningPercentage}% de clientes</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-haven-dark/50 rounded-lg">
              <span className="text-white/80">Total de entradas registradas:</span>
              <span className="text-green-400 font-semibold">{totalEntries} entradas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntryTimeAnalysis;
