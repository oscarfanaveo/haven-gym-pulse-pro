
import { useState } from "react";
import { CalendarIcon, DownloadIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const ReportsHeader = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold text-white">Reportes y Análisis</h2>
        <p className="text-white/60">Seguimiento del rendimiento y datos financieros del gimnasio</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-haven-dark"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "MMMM yyyy") : "Seleccionar mes"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-haven-gray border-white/10">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-haven-gray text-white"
            />
          </PopoverContent>
        </Popover>
        <Button variant="outline" className="border-white/10 hover:bg-haven-dark">
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualizar
        </Button>
        <Button className="bg-haven-red hover:bg-haven-red/90">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
