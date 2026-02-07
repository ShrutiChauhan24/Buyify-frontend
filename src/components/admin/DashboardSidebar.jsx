import { useState } from "react";
import {NavLink} from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  Plus,
  Layers,
  ShoppingCart,
  Users,
  Boxes,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { MenuItem, Dropdown } from "../../helper/helper";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} className="text-[#FF0054]" />
        </button>
        <h1 className="font-bold text-lg text-[#1F1F1F]">Admin Panel</h1>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
        style={{ width: "260px" }}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b">
          <h2 className="text-xl font-bold text-[#FF0054]">Admin</h2>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col px-4 py-6 gap-1 text-sm text-[#1F1F1F]">
          <MenuItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            to="/admin/dashboard"
            end
          />

          <Dropdown
            icon={<Package />}
            label="Products"
            open={openMenu === "products"}
            onClick={() => toggleMenu("products")}
            items={[
              {
                label: "All Products",
                icon: <Boxes size={16} />,
                to: "/admin/dashboard/all-products",
              },
              {
                label: "Add Product",
                icon: <Plus size={16} />,
                to: "/admin/dashboard/add-product",
              },
            ]}
          />

          <Dropdown
            icon={<Layers />}
            label="Categories"
            open={openMenu === "categories"}
            onClick={() => toggleMenu("categories")}
            items={[
              {
                label: "All Categories",
                icon: <Boxes size={16} />,
                to: "/admin/dashboard/all-categories",
              },
              {
                label: "Add Category",
                icon: <Plus size={16} />,
                to: "/admin/dashboard/add-category",
              },
            ]}
          />

          <MenuItem
            icon={<ShoppingCart />}
            label="Orders"
            to="/admin/dashboard/all-orders"
          />

          <MenuItem
            icon={<Users />}
            label="Customers"
            to="/admin/dashboard/customers"
          />

          <MenuItem
           icon={<Boxes />}
           label="Inventory"
           to="/admin/dashboard/inventory"
           />
          <MenuItem
           icon={<Settings />}
            label="Settings" 
            to="/admin/dashboard/settings"
            />
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <button className="w-full flex items-center justify-center gap-2 border border-[#FF0054] text-[#FF0054] py-2 rounded-full hover:bg-[#FF0054] hover:text-white transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
