import search from "../../assets/search.png";
import bellRing from "../../assets/bell-ring.png";
import avatar from "../../assets/avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import revenue from "../../assets/revenue.png";
import product from "../../assets/product.png";
import transaction from "../../assets/transaction.png";
import customer from "../../assets/customer.png";
import Help from "./Help";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount, truncateString } from "../../utils/serviceUtils";
import { getDashboardInfo, getEmployeeTransactions } from "../../redux/actions";

const DashboardHome = () => {
  const [showHelp, setShowHelp] = useState(false)
  const dispatch = useDispatch() as unknown as any

  const company = useSelector((state: any) => state.company)
  const transactions = useSelector((state: any) => state.transactions)

  useEffect(() => {
    dispatch(getDashboardInfo())
    dispatch(getEmployeeTransactions())
  }, [])

  return (
    <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`} bg-[#1100770A] lg:h-[100vh]  `}>
      <div className="mx-[3%] ">
        <div className="w-[100%] overflow-x-scroll">
          <div className="flex justify-between items-center py-[1%] w-[250%] lg:w-[100%] ">
            <ul className="flex w-[40%] justify-between">
              <li>
                <Link to="" className="text-[#8C858D] text-[0.8rem]">
                  Last 24 hours
                </Link>
              </li>
              <li>
                <Link to="" className="text-[#8C858D] text-[0.8rem]">
                  Last weeks
                </Link>
              </li>
              <li>
                <Link to="" className="text-[#8C858D] text-[0.8rem]">
                  Last month
                </Link>
              </li>
              <li>
                <Link to="" className="text-[#8C858D] text-[0.8rem]">
                  Last year
                </Link>
              </li>
            </ul>
            <div className="w-[20%]  flex items-center justify-center h-[5vh] border">
              <select
                placeholder="Search"
                className="border-none h-[5vh] pl-[5%] bg-[#F5F5FA] text-[#707070] outline-none text-[0.8rem]"
              >
                <option>Today (March 18, 2022)</option>
              </select>
            </div>
          </div>

        </div>

        <div className=" w-[100%] overflow-x-scroll">
          <div className="flex justify-between w-[250%] lg:w-[100%] my-[5%] lg:my-[0%] ">
            <AnalyticCard width={`w-[23%]`} icon={revenue} total={`Total Number of Employees`} amount={company?.totalEmployees} />
            <AnalyticCard width={`w-[23%]`} icon={customer} total={`Days Until Next Payment`} amount={company?.daysTillPayDay} />
            <AnalyticCard width={`w-[23%]`} icon={transaction} total={`Total Number of Credit`} amount={formatAmount(company?.totalNumberOfCreditAmount)} />
            <AnalyticCard width={`w-[23%]`} icon={product} total={`Due Payment`} amount={formatAmount(company?.totalDuePaymentAmount)} />
          </div>

        </div>

        <div className=" flex flex-col lg:flex-row items-center justify-between ">
          <div className="my-[3%] lg:my-[0%] w-[100%] mr-[2%]">
            <TransactionTable company={company} />
          </div>
          <div className="my-[3%] lg:my-[0%] w-[100%] ">
            <TopTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

export const DashNav = () => {
  const location = useLocation();
  const logo = localStorage.getItem("logo")
  const email = localStorage.getItem("email")
  const companyName = localStorage.getItem("companyName")
  return (
    <div className="flex justify-between items-center bg-[#533AE90D] px-[3%] h-[8vh]">
      <div className="w-[50%] bg-[#FFFFFF] flex items-center justify-start h-[5vh] ">
        <img src={search} alt="" className="h-[2vh] ml-[15px]" />
        <input
          type="text"
          placeholder="Search"
          className="border-none h-[5vh] pl-[2%] text-[#707070] outline-none"
        />
      </div>
      <div className="flex items-center justify-end w-[40%]">
        <img src={bellRing} alt="" className="h-[2vh] mr-[5%]" />
        <img src={logo || avatar} alt="" className="h-[3.5vh] w-[3.5vh] mr-[5%] rounded-[50%]" />
        <div className="flex">
          {companyName} <br />
          {email && truncateString(email, 15)}
        </div>
      </div>
    </div>
  );
};

export const AnalyticCard = ({ width, icon, total, amount }: any) => {
  const location = useLocation();
  return (
    <div className={`bg-[#fff] ${width} rounded-md px-[2%] py-[1%]`}>
      <div className="flex  items-center">
        <img src={icon} alt="" className="h-[2vh]" />
        <p className="ml-[3%] text-[0.8rem] text-[#171515]">{total}(₦)</p>
      </div>
      <div className="flex justify-between items-center pt-[3%]">
        <h3 className="text-[1.4rem] font-[700]">{amount}</h3>
        {location.pathname !== "/dashboard/statistics" ? (
          <div className="text-right">
            <p className="text-[#32C38F] text-[0.7rem]">13%</p>
            <p className="text-[#9C9AA4] text-[0.7rem]">Last 7 days</p>
          </div>
        ) : (
          <div className="flex justify-center items-center border rounded-md bg-[#533AE9] text-[#fff] text-[0.6rem] w-[50px] h-[30px]">
            +31%
          </div>
        )}
      </div>
      {location.pathname !== "/dashboard/statistics" ? null : (
        <p className="text-[0.8rem]">20% more than last month</p>
      )}
    </div>
  );
};

const TransactionTable = (company: any) => {
  return (
    <div className="bg-[#fff] w-[100%]  py-[3%] px-[4%] my-[2%] rounded-md">
      <div className="pb-[2%]">
        <h3 className="text-[#000000] font-[500] text-[1.2rem] mb-[4px]">Employee Summary</h3>
      </div>
      <div className="">
        <table className=" w-[100%] border rounded-md">
          <thead>
            <tr className="bg-[#1100770A] text-[0.8rem]  text-[#56555B] w-[100%] px-[5%]">
              <th className="font-[400] py-[2.7%]">Employee Name</th>
              <th className="font-[400] py-[2.7%]">Email</th>
              <th className="font-[400] py-[2.7%]">Job Title</th>
              <th className="font-[400] py-[2.7%]">Pay</th>
              <th className="font-[400] py-[2.7%]">Status</th>
            </tr>
          </thead>
          <tbody>
            {company?.company?.employeesSummary?.map((elem: any, id: number) => (
              <tr key={id} className="text-[0.7rem] text-center ">
                <td className="py-[3%]">{elem.name}</td>
                <td>{elem.email}</td>
                <td>{elem.jobTitle}</td>
                <td>₦{elem.pay}</td>
                <td className="text-[#32C38F]">{elem.status}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TopTransactions = (transactions: any) => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#fff] w-[100%] py-[3%] px-[4%] my-[2%] rounded-md">
      <div className="pb-[2%]">
        <h3 className="text-[#000000] font-[500] text-[1.2rem] mb-[4px]">Top Transactions</h3>
      </div>
      <div className="">
        <table className=" w-[100%] border rounded-md">
          <thead>
            <tr className='bg-[#1100770A] text-[0.8rem]  text-[#171515] font-[700] w-[100%] px-[5%] '>
              <th className='font-[500]'></th>
              <th className='font-[500] py-[1%]'>Name</th>
              <th className='font-[500]'>Job Title</th>
              <th className='font-[500]'>Current Credit</th>
              <th className='font-[500]'>Total Credit</th>
              <th className='font-[500]'>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.transactions?.allEmployeesData?.slice(0, 5).map((elem: any, id: number) => (
              <tr key={id} className='bg-[#FFFFFF] text-[0.8rem] text-[#171515] text-center w-[100%]'>
                <td className='font-[400] flex justify-center items-center'><img src={elem.coverImage} alt="" className='h-[50px]' /></td>
                <td className='font-[400]'>{elem.name}</td>
                <td className='font-[400]'>{elem.workData?.[0]?.jobTitle}</td>
                <td className='font-[400]'>{formatAmount(elem.currentCredit)}</td>
                <td className='font-[400]'>{formatAmount(elem.totalCredit)}</td>
                <td className={`${elem.status === 'Active' ? 'text-[#32C38F]' : 'text-[#D72D2D]'} font-[400]`}>{elem.status}</td>
              </tr>))}
          </tbody>
        </table>
        <div className="flex items-center justify-center mt-[2%]">
          <button className='text-[#56555B] w-[auto] min-w-[200px] rounded-md bg-[#ffffff] border border-[1px] px-[10px] border-[#11007766] lg:mr-[5%] rounded-md flex justify-center items-center' onClick={() => navigate('/dashboard/transaction')}>View All</button>
        </div>
      </div>
    </div>
  );
};


