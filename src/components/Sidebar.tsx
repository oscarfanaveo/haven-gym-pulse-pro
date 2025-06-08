
import { NavLink } from "react-router-dom";
import { 
  UsersRound, ShoppingBag, BarChart, Dumbbell, Home, 
  ChevronLeft, ChevronRight, ShoppingCart, UserCog, Settings
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <aside
      className={`bg-haven-gray border-r border-white/10 transition-all duration-300 h-screen ${
        open ? "w-64" : "w-16"
      } flex flex-col fixed lg:relative z-30`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        {open ? (
          <h1 className="font-bold text-2xl text-white flex items-center">
            <span className="text-haven-red">Haven</span>
            <span className="ml-1">Gym</span>
          </h1>
        ) : (
          <h1 className="font-bold text-xl text-haven-red">HG</h1>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-white/70 hover:text-white transition-colors"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Home size={20} />
              {open && <span>Panel Principal</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscriptions"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <UsersRound size={20} />
              {open && <span>Suscripciones</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sales"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <ShoppingCart size={20} />
              {open && <span>Ventas</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <ShoppingBag size={20} />
              {open && <span>Productos</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <BarChart size={20} />
              {open && <span>Reportes</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/training"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Dumbbell size={20} />
              {open && <span>Entrenamiento</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="border-t border-white/10 p-2 space-y-1">
        <NavLink
          to="/subscription-plans"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={20} />
          {open && <span>Gestión de Planes</span>}
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <UserCog size={20} />
          {open && <span>Gestión de Usuarios</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
