import Sidebar from './Sidebar'
import {Routes, Route} from 'react-router-dom'
import DashboardHome, { DashNav } from './DashboardHome'
import DashboardProduct from './DashboardProduct'
import DashboardAddProduct from './DashboardAddProduct'
import SalesInfo from './SalesInfo'
import Profile from './Profile'
import UserReport from './UserReport'
import Settings from './Settings'
import SingleProduct from './SingleProduct'

const Dashboard = () => {
  
  
  return (
    <div >
        <Sidebar />
        <div className={`${window.innerWidth > 768 ? `ml-[15%]`:`ml-[10%]`} bg-[#1100770A]`}>
          <DashNav />
        </div>
        
        <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/statistics" element={<DashboardProduct />} />
            <Route path="/employees" element={<DashboardProduct />} />
            <Route path="/employees/:employeeId" element={<SingleProduct />} />
            <Route path="/add-employee" element={<DashboardAddProduct />} />
            <Route path="/update-employee/:employeeId" element={<DashboardAddProduct />} />
            <Route path="/transaction" element={<SalesInfo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customer-report" element={<UserReport />} />
            <Route path="/settings" element={<Settings />} />

        </Routes>

    </div>
  )
}

export default Dashboard