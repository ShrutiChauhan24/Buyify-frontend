import DashboardSidebar from "../components/admin/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main
  className="
    pt-20        /* mobile top bar */
    px-4
    lg:pt-6
    lg:pl-64     /* sidebar width */
    transition-all
  "
>
  {children}
</main>

    </div>
  );
};

export default DashboardLayout;



