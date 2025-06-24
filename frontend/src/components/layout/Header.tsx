import { Link, useLocation } from "react-router-dom";
import { CheckSquare, BarChart3, List } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/tasks", label: "Tasks", icon: List },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <CheckSquare className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TaskManager</span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
