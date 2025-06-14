
import { NavLink } from "react-router-dom";
import { 
  UsersRound, ShoppingBag, BarChart, Dumbbell, Home, 
  ChevronLeft, ChevronRight, ShoppingCart, UserCog, Settings, UserCheck
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { hasPermission } = useAuth();

  const menuItems = [
    {
      to: "/",
      icon: Home,
      label: "Panel Principal",
      permission: "/"
    },
    {
      to: "/subscriptions",
      icon: UsersRound,
      label: "Suscripciones",
      permission: "/subscriptions"
    },
    {
      to: "/sales",
      icon: ShoppingCart,
      label: "Ventas",
      permission: "/sales"
    },
    {
      to: "/products",
      icon: ShoppingBag,
      label: "Productos",
      permission: "/products"
    },
    {
      to: "/reports",
      icon: BarChart,
      label: "Reportes",
      permission: "/reports"
    },
    {
      to: "/training",
      icon: Dumbbell,
      label: "Entrenamiento",
      permission: "/training"
    },
    {
      to: "/client-tracking",
      icon: UserCheck,
      label: "Seguimiento Cliente",
      permission: "/client-tracking"
    }
  ];

  const adminItems = [
    {
      to: "/subscription-plans",
      icon: Settings,
      label: "Gestión de Planes",
      permission: "/subscription-plans"
    },
    {
      to: "/users",
      icon: UserCog,
      label: "Gestión de Usuarios",
      permission: "/users"
    }
  ];

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
          {menuItems.map((item) => (
            hasPermission(item.permission) && (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <item.icon size={20} />
                  {open && <span>{item.label}</span>}
                </NavLink>
              </li>
            )
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-2 space-y-1">
        {adminItems.map((item) => (
          hasPermission(item.permission) && (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <item.icon size={20} />
              {open && <span>{item.label}</span>}
            </NavLink>
          )
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
