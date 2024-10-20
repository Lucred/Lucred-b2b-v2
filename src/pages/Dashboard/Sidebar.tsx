import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import lucred from '../../assets/lucred-logo.png'
import lucredMini from '../../assets/lucred-mini.png'
import home from '../../assets/home.png'
import statistics from '../../assets/statistics.png'
import profile from '../../assets/profile.png'
import userGuide from '../../assets/userGuide.png'
import transaction from '../../assets/transactionicon.png'
import employees from '../../assets/employees.png'
import settings from '../../assets/settings.png'
import help from '../../assets/help.png'
import logout from '../../assets/logout.png'
import { Logout } from '../../redux/actions'

const Sidebar = () => {
    return (
        <div>
            {window.innerWidth > 768 ? <MaxSidebar /> : <MinSidebar />}
        </div>
    )
}

export const MaxSidebar = () => {
    return (
        <div className='w-[15%] bg-[#533AE9] fixed h-[100vh] '>
            <img src={lucred} alt="Lucred" className='bg-[#fff] rounded-md mx-[auto] my-[12%] w-[15vh]' />
            <ul className='h-[60vh] flex flex-col justify-evenly ml-[5%]'>
                <li><Link to={'/dashboard'} className='text-[#fff] flex pl-[5%] items-center '><img src={home} alt="" className='h-[2vh] mr-[5%]' />Dashboard</Link></li>
                <li><Link to={'/dashboard/employees'} className='text-[#fff] flex pl-[5%] items-center '><img src={employees} alt="" className='h-[2vh] mr-[5%]' />Employees</Link></li>
                {/* <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center '><img src={statistics} alt="" className='h-[2vh] mr-[5%]' />Statistics</Link></li> */}
                <li><Link to={'/dashboard/transaction'} className='text-[#fff] flex pl-[5%] items-center '><img src={transaction} alt="" className='h-[2vh] mr-[5%]' />Transaction</Link></li>
                {/* <li><Link to={'/dashboard/user-guide'} className='text-[#fff] flex pl-[5%] items-center '><img src={userGuide} alt="" className='h-[auto] mr-[5%]' />User Guide</Link></li> */}
                <li><Link to={'/dashboard/profile'} className='text-[#fff] flex pl-[5%] items-center '><img src={profile} alt="" className='h-[2vh] mr-[5%]' />Profile</Link></li>
                <li><Link to={'/dashboard/settings'} className='text-[#fff] flex pl-[5%] items-center '><img src={settings} alt="" className='h-[2vh] mr-[5%]' />Settings</Link></li>
                {/* <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center '><img src={help} alt="" className='h-[2vh] mr-[5%]' />Help</Link></li> */}
                <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={Logout}><img src={logout} alt="" className='h-[2vh] mr-[5%]' />Logout</Link></li>
            </ul>



        </div>
    )
}

export const MinSidebar = () => {
    const [showNav, setShowNav] = useState(true)
    const toggleNav = () => {
        setShowNav(!showNav)
    }
    return (
        <>
            {showNav ? <MinSidebar1 click={toggleNav} /> : <MinSidebar2 click={toggleNav} />}
        </>

    )
}

export const MinSidebar1 = ({ click }: any) => {
    return (
        <div className='w-[10%] bg-[#533AE9] fixed h-[100vh] py-[5%] '>
            <img src={lucredMini} alt="Lucred" className=' mx-auto ' />
            <ul className='h-[60vh] flex flex-col justify-evenly items-center ml-[5%]'>
                <li><Link to={'/dashboard'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={home} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
                <li><Link to={'/dashboard/employees'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={employees} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
                {/* <li><Link to={'/dashboard/statistics'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={statistics} alt="" className='h-[2vh] mr-[5%]' /></Link></li> */}
                <li><Link to={'/dashboard/transaction'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={transaction} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
                {/* <li><Link to={'/dashboard/user-guide'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={userGuide} alt="" className='h-[auto] mr-[5%]' /></Link></li> */}
                <li><Link to={'/dashboard/profile'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={profile} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
                <li><Link to={'/dashboard/settings'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={settings} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
                {/* <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={help} alt="" className='h-[2vh] mr-[5%]' /></Link></li> */}
                <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={logout} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
            </ul>

        </div>
    )
}

export const MinSidebar2 = ({ click }: any) => {
    return (
        <div className='w-[50%] md:w-[30%] bg-[#533AE9] fixed h-[100vh] py-[5%] z-[17]'>
            <img src={lucred} alt="Lucred" className='bg-[#fff] rounded-md mx-[auto] my-[12%] py-[5%] px-[5%] h-[9vh]' />
            <ul className='h-[60vh] flex flex-col justify-evenly ml-[5%]'>
                <li><Link to={'/dashboard'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={home} alt="" className='h-[2vh] mr-[5%]' />Dashboard</Link></li>
                <li><Link to={'/dashboard/employees'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={employees} alt="" className='h-[2vh] mr-[5%]' />Employees</Link></li>
                <li><Link to={'/dashboard/statistics'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={statistics} alt="" className='h-[2vh] mr-[5%]' />Statistics</Link></li>
                <li><Link to={'/dashboard/transaction'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={transaction} alt="" className='h-[2vh] mr-[5%]' />Transaction</Link></li>
                {/* <li><Link to={'/dashboard/user-guide'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={userGuide} alt="" className='h-[auto] mr-[5%]' />User Guide</Link></li> */}
                <li><Link to={'/dashboard/profile'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={profile} alt="" className='h-[2vh] mr-[5%]' />Profile</Link></li>
                <li><Link to={'/dashboard/settings'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={settings} alt="" className='h-[2vh] mr-[5%]' />Settings</Link></li>
                {/* <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={help} alt="" className='h-[2vh] mr-[5%]' />Help</Link></li> */}
                <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={Logout}><img src={logout} alt="" className='h-[2vh] mr-[5%]' />Logout</Link></li>
            </ul>

        </div>
    )
}



export default Sidebar