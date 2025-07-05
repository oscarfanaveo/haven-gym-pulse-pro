
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Clock, Users } from "lucide-react";

interface EntryRecord {
  id: string;
  clientId: string;
  clientName: string;
  entryTime: string;
  date: string;
}

interface TodayEntryHistoryProps {
  entryHistory: EntryRecord[];
}

export const TodayEntryHistory = ({ entryHistory }: TodayEntryHistoryProps) => {
  const todayEntries = entryHistory.filter(entry => {
    const today = new Date().toDateString();
    const entryDate = new Date(entry.date).toDateString();
    return today === entryDate;
  });

  return (
    <Card className="haven-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Ingresos de Hoy
            </h3>
            <div className="flex items-center gap-2 text-white/60">
              <Users className="h-4 w-4" />
              <span className="text-sm">{todayEntries.length} ingresos</span>
            </div>
          </div>
          
          {todayEntries.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Clock className="h-12 w-12 mx-auto mb-4 text-white/30" />
              <p>No hay ingresos registrados para hoy</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead>Cliente</TableHead>
                    <TableHead>Hora de Entrada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayEntries.map((entry) => (
                    <TableRow key={entry.id} className="border-white/10 hover:bg-haven-dark/70">
                      <TableCell className="font-medium">{entry.clientName}</TableCell>
                      <TableCell className="font-mono text-blue-400">{entry.entryTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
