
import { Search, Menu, Bell } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-haven-gray border-b border-white/10 h-16 flex items-center px-4 lg:px-6">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden text-white/70 hover:text-white transition-colors mr-4"
      >
        <Menu size={24} />
      </button>

      <div className="relative flex-1 max-w-lg hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-haven-dark border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-haven-red"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-white/50" />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-haven-dark transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-haven-red rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-haven-red to-rose-600" />
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-white/60">Haven Gym</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
