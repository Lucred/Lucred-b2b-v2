import { Link, useLocation } from "react-router-dom"
import { SelectInput } from "./DashboardAddProduct"
import { AnalyticCard } from "./DashboardHome"
import phone from "../../assets/phone.png"
import xmark from "../../assets/xmark.png"
import search from '../../assets/search.png'
import img from '../../assets/img.png'
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import img4 from '../../assets/img4.png'
import { useEffect, useState } from "react"
import { getEmployeeTransactions, withdraw } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { formatAmount } from "../../utils/serviceUtils"

const Transactions = () => {
    const location = useLocation()

    const [showModal, setShowModal] = useState(false)
    const [currentDate, setcurrentDate] = useState(null)
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const transactions = useSelector((state: any) => state.transactions)
    // const transactions = {
    //     totalCredit: 50000,
    //     totalActiveCredit: 50000,
    //     totalDuePayment: 0,
    //     employeesData: [
    //         {
    //             userId: "658778e9b97e43b88224744b",
    //             name: "solomon aboki",
    //             email: "lotrigogeff@gmail.com",
    //             phoneNumber: "+2349138174761",
    //             workData: [
    //                 {
    //                     companyName: "Adeboye Group",
    //                     jobTitle: "Software Developer",
    //                     employmentStatus: "Full time",
    //                     employeeEmailAddress: "boye@adeboyeboye.com",
    //                     isWorkDataVerified: true,
    //                     workSalary: "400,000",
    //                     proofOfWork: "https://firebasestorage.googleapis.com/v0/b/lucred-715bc.appspot.com/o/company%2Fhair%20salon.jpeg?alt=media&token=af836869-cb16-4a9a-87d2-ad80d280632d",
    //                     company: {
    //                         _id: "65a542fe79a8ab83d00c217a",
    //                         name: "Adeboye Group",
    //                         address: "Ogunrinde Str Lagos",
    //                         emailAddress: "adeboyesamueladeyemi@adeboyegroup.com",
    //                         totalEmployees: 50,
    //                         cacNumber: "2e3rr4e3",
    //                         companyId: "#d78217",
    //                         phoneNumber: "+2348134488510",
    //                         city: "Ikeja",
    //                         country: "Canada",
    //                         logo: "https://firebasestorage.googleapis.com/v0/b/lucred-715bc.appspot.com/o/company%2FbarbingImg.jpeg?alt=media&token=ae342462-a6bc-4adf-b15d-da9d7b61e1ed",
    //                         isCompanyActive: false,
    //                         totalHR: 5,
    //                         createdBy: "6358667bcf19ce096fb7545f",
    //                         createdAt: "2024-01-15T14:36:46.124Z",
    //                         updatedAt: "2024-01-30T17:31:33.562Z",
    //                         __v: 0,
    //                         payDay: 29
    //                     },
    //                     _id: "65a547a879a8ab83d00c2192"
    //                 }
    //             ],
    //             currentCredit: 50000,
    //             totalCredit: 50000,
    //             status: "Active",
    //             date: "2024-01-29T00:00:00.000Z"
    //         }
    //     ]
    // }


    const dispatch = useDispatch() as unknown as any

    console.log(transactions)


    useEffect(() => {
        dispatch(getEmployeeTransactions())
    }, [])

    // useEffect(() => {
    //     const currentDate = new Date();

    //     const options = {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric'
    //     };

    //     const formattedDate = currentDate.toLocaleDateString('en-US', options);
    // }, [])


    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`} bg-[#1100770A]min-h-[100vh] `}>
            <div className='mx-[3%]'>
                <div className="">
                    <div className='py-[1%]'>
                        <p className='text-[0.7rem]'>Dashboard/Transactions</p>
                        <h3 className='text-[1.3rem] font-[500]'>Transactions</h3>
                    </div>
                    <div className='flex items-center justify-start my-[2%]'>
                        <div className="px-[8%] py-[4%] bg-[#110077] text-[#fff] border rounded-xl mr-[2%]">
                            <div className="font-[400] text-[1.2rem]">Total Credit</div>
                            <div className="font-[700] text-[1.2rem] pt-[1%]">NGN {formatAmount(transactions.totalCredit)}</div>
                        </div>
                        <div className="px-[8%] py-[4%] bg-[#32C38F] text-[#fff] border rounded-xl mr-[2%]">
                            <div className="font-[400] text-[1.2rem]">Active Credit</div>
                            <div className="font-[700] text-[1.2rem] pt-[1%]">NGN {formatAmount(transactions.totalActiveCredit)}</div>
                        </div>
                        <div className="px-[8%] py-[4%] bg-[#D72D2DB2] text-[#fff] border rounded-xl">
                            <div className="font-[400] text-[1.2rem]">Due Payment</div>
                            <div className="font-[700] text-[1.2rem] pt-[1%]">NGN {formatAmount(transactions.totalDuePayment)}</div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='lg:w-[25%] w-[50%] bg-[#FFFFFF] flex items-center justify-center h-[5vh] border border-[#C3C3C4] rounded-lg'>
                        <img src={search} alt="" className='h-[2vh] mr-[5%] pl-[5%] lg:pr-[0%]' />
                        <input type="text" placeholder='Search' className='border-none h-[5vh] text-[#707070] outline-none bg-[transparent]' />
                    </div>
                    <select
                        placeholder="Search"
                        className="border-none h-[5vh] pl-[5%] pr-[5%] bg-[#F5F5FA] text-[#707070] outline-none text-[0.8rem]"
                    >
                        <option>Today ({new Date().toLocaleDateString()})</option>
                    </select>
                </div>
                <div className="w-[100%] overflow-scroll">
                    <table className=' lg:w-[100%] border rounded-md my-[2%] w-[250%]'>
                        <thead  >
                            <tr className='bg-[#1100770A] text-[0.8rem]  text-[#171515] font-[700] w-[100%] px-[5%] '>
                                <th className='font-[500]'></th>
                                <th className='font-[500] py-[1%]'>Name</th>
                                <th className='font-[500]'>Email</th>
                                <th className='font-[500]'>Job Title</th>
                                <th className='font-[500]'>Phone No</th>
                                <th className='font-[500]'>Current Credit</th>
                                <th className='font-[500]'>Total Credit</th>
                                <th className='font-[500]'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.allEmployeesData?.map((elem: any, id: number) => (
                                <tr key={id} className='bg-[#FFFFFF] text-[0.8rem] text-[#171515] text-center w-[100%] h-[10vh] '>
                                    <td className='font-[400] flex justify-center items-center h-[10vh]'><img src={elem.coverImage} alt="" className='h-[50px]' /></td>
                                    <td className='font-[400]'>{elem.name}</td>
                                    <td className='font-[400]'>{elem.email}</td>
                                    <td className='font-[400]'>{elem.workData?.[0]?.jobTitle}</td>
                                    <td className='font-[400]'>{elem.phoneNumber}</td>
                                    <td className='font-[400]'>₦{elem.currentCredit}</td>
                                    <td className='font-[400]'>₦{elem.totalCredit}</td>
                                    <td className={`${elem.status === 'Active' ? 'text-[#32C38F]' : 'text-[#D72D2D]'} font-[400]`}>{elem.status}</td>
                                </tr>))}
                        </tbody>
                    </table>

                </div>

            </div>

            {showModal ? <WithdrawModal func={toggleModal} /> : null}
        </div>
    )
}

export default Transactions

export const WithdrawModal = ({ func }: any) => {
    const [formData, setFormData] = useState<any>({
        _ID: localStorage.getItem("userId"),
        amount: "",
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setFormData({
            ...formData, [name]: value
        })
    }

    const dispatch = useDispatch() as unknown as any

    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(withdraw(formData))
    }

    console.log(formData)
    return (
        <div className=" fixed h-[100vh] w-[100%] bg-[#17151599] top-[0] left-[0] flex items-center justify-center">
            <div className="bg-[#fff] lg:w-[40%] w-[80%] rounded-md ">
                <div className="bg-[#1100770A] px-[3%] py-[2%] flex justify-between items-center">
                    <h3>Withdrawal Request</h3>
                    <img src={xmark} alt="" className="cursor-pointer h-[2vh]" onClick={func} />
                </div>
                <div className="flex items-center justify-between my-[3%] px-[3%]">
                    <label className="text-[0.9rem]">Amount Requested</label>
                    <input type="number" placeholder="450000" name="amount" className="border w-[50%] px-[3%] rounded-md py-[1%]" onChange={handleChange} />
                </div>
                <div className="flex items-center justify-between my-[3%] px-[3%]">
                    <label className="text-[0.9rem]">Withdraw To</label>
                    <SelectInput value={`Select bank account`} width={`w-[50%]`} />
                </div>

                <div className='flex justify-end my-[8%] '>
                    <Link to="" className='bg-[#FAFAFA] w-[20%] h-[5vh] text-[#533AE9] font-[600] mr-[5%] rounded-md flex justify-center items-center'>Cancel</Link>
                    <Link to="" className='bg-[#533AE9] w-[20%] h-[5vh] text-[#fff] mr-[5%] font-[600] rounded-md flex justify-center items-center' onClick={handleSubmit}>Confirm</Link>
                </div>

            </div>


        </div>
    )
}