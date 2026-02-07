import { Edit, Trash2 } from "lucide-react";
import {NavLink} from "react-router-dom"

export const MenuItem = ({ icon, label, to, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition
         ${isActive ? "bg-[#FF0054] text-white" : "hover:bg-[#FFF1F6]"}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export const Dropdown = ({ icon, label, open, onClick, items }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[#FFF1F6]"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
      </button>

      {open && (
        <div className="ml-8 mt-1 flex flex-col gap-1">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm
                 ${isActive ? "text-[#FF0054] font-medium" : "hover:bg-[#FFF1F6]"}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
    <div className="p-3 rounded-full bg-[#FFF1F6] text-[#FF0054]">
      {icon}
    </div>

    <div>
      <p className="text-sm text-[#6B6B6B]">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);

export const StatusBadge = ({ status }) => {
  const colors = {
    Delivered: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export const StockBadge = ({ stock }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        stock > 10
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {stock > 10 ? "In Stock" : "Low Stock"}
    </span>
  );
};

export const ActionButtons = ({onDelete}) => (
  <>
    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
      onClick={(e)=>{
        e.stopPropagation();
        onDelete()}}
    >
      <Trash2 size={16} />
    </button>
  </>
);
