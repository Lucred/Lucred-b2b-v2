import Sidebar from './Sidebar'
import {Routes, Route} from 'react-router-dom'
import DashboardHome, { DashNav } from './DashboardHome'
import Employees from './Employees'
import DashboardAddProduct from './DashboardAddProduct'
import Transactions from './Transactions'
import Profile from './Profile'
import UserReport from './UserReport'
import Settings from './Settings'
import SingleEmployee from './SingleEmployee'
import PendingApproval from './PendingApproval'
import IssueCredit from './IssueCredit'

const Dashboard = () => {
  
  
  return (
    <div >
        <Sidebar />
        <div className={`${window.innerWidth > 768 ? `ml-[15%]`:`ml-[10%]`} bg-[#1100770A]`}>
          <DashNav />
        </div>
        
        <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/statistics" element={<Employees />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/pending-approvals" element={<PendingApproval />} />
            <Route path="/employees/:employeeId" element={<SingleEmployee />} />
            <Route path="/add-employee" element={<DashboardAddProduct />} />
            <Route path="/issue-credit/:employeeId" element={<IssueCredit />} />
            <Route path="/update-employee/:employeeId" element={<DashboardAddProduct />} />
            <Route path="/transaction" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customer-report" element={<UserReport />} />
            <Route path="/settings" element={<Settings />} />

        </Routes>

    </div>
  )
}

export default Dashboard