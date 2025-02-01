import { truncateString } from "../utils/serviceUtils";
import { useLocation } from "react-router-dom";
import search from "../assets/search.png";
import bellRing from "../assets/bell-ring.png";
import avatar from "../assets/avatar.png";

const DashNav = () => {
  const location = useLocation();
  const logo = localStorage.getItem("logo");
  const email = localStorage.getItem("email");
  const companyName = localStorage.getItem("companyName");
  return (
    <div className='flex justify-between items-center bg-[#533AE90D] pl-[50%] h-[8vh]'>
      <div className='w-[50%] bg-[#FFFFFF] md:flex items-center justify-start h-[5vh] hidden md:invisible'>
        <img src={search} alt='' className='h-[2vh] ml-[15px]' />
        <input
          type='text'
          placeholder='Search'
          className='border-none h-[5vh] pl-[2%] text-[#707070] outline-none'
        />
      </div>
      <div className='flex items-center justify-end w-[40%]'>
        <img src={bellRing} alt='' className='h-[2vh] mr-[5%]' />
        <img
          src={logo || avatar}
          alt=''
          className='h-[3.5vh] w-[3.5vh] mr-[5%] rounded-[50%]'
        />
        <div className='flex flex-col'>
          <p className='truncate'>{companyName} </p>
          <p>{email && truncateString(email, 15)}</p>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
