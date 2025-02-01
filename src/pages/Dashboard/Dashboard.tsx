import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import Employees from "./Employees";
import DashboardAddProduct from "./DashboardAddProduct";
import Transactions from "./Transactions";
import Profile from "./Profile";
import UserReport from "./UserReport";
import Settings from "./Settings";
import SingleEmployee from "./SingleEmployee";
import PendingApproval from "./PendingApproval";
import IssueCredit from "./IssueCredit";
import SingleTransaction from "./SingleTransaction";
// import DashNav from "../../components/dashnav";
import { useState } from "react";
import UserGuide from "./UserGuide";
import DashNav from "../../components/Dashnav";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div>
      <Sidebar onCollapse={(collapsed) => setSidebarCollapsed(collapsed)} />
      <div
        className={`${
          sidebarCollapsed ? "ml-64" : "ml-3"
        } transition-all duration-300 bg-[#1100770A]`}
      >
        <DashNav />
      </div>

      <Routes>
        <Route path='/' element={<DashboardHome />} />
        <Route path='/statistics' element={<Employees />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/pending-approvals' element={<PendingApproval />} />
        <Route path='/employees/:employeeId' element={<SingleEmployee />} />
        <Route path='/add-employee' element={<DashboardAddProduct />} />
        <Route path='/issue-credit/:employeeId' element={<IssueCredit />} />
        <Route
          path='/update-employee/:employeeId'
          element={<DashboardAddProduct />}
        />
        <Route path='/transaction' element={<Transactions />} />
        <Route path='/transaction/:userId' element={<SingleTransaction />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/customer-report' element={<UserReport />} />
        <Route path='/user-guide' element={<UserGuide />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
