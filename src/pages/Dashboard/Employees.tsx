import search from '../../assets/search.png'
import edit from '../../assets/edit.png'
import view from '../../assets/view.png'
import trash from '../../assets/trash.png'
import img from '../../assets/img.png'
import img1 from '../../assets/img1.png'
import img2 from '../../assets/img2.png'
import img3 from '../../assets/img3.png'
import img4 from '../../assets/img4.png'
import phone from '../../assets/phone.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteProduct, deleteSingleEmployee, getEmployees } from '../../redux/actions'

const Employees = () => {
    const dispatch = useDispatch() as unknown as any
    const navigate = useNavigate()
    const id = localStorage.getItem("companyId") as unknown as string
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [currentId, setcurrentId] = useState("");

    const handleButtonClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        await dispatch(deleteSingleEmployee(currentId))
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const employees = useSelector((state: any) => state.employees)
    console.log('employees', employees);

    const deleteEmployee = (id: string) => {
        setcurrentId(id)
        handleButtonClick()
    }

    useEffect(() => {
        dispatch(getEmployees({ approvalStatus: "approved" }))
        dispatch(getEmployees({ approvalStatus: "pending" }))
    }, [])
    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[8%]`} bg-[#1100770A]min-h-[100vh] `}>
            <div className='mx-[3%]'>
                <div className='py-[1%]'>
                    <p className='text-[0.7rem]'>Dashboard/Employee</p>
                    <h3 className='text-[1.3rem] font-[500]'>Employee</h3>
                </div>

                <div className='bg-[#fff] py-[2%] px-[1%]'>
                    <div className='flex items-center justify-between mb-[20px]'>
                        <div className='lg:w-[25%] w-[50%] bg-[#FFFFFF] flex items-center justify-center h-[5vh] border border-[#C3C3C4] rounded-md'>
                            <img src={search} alt="" className='h-[2vh] mr-[5%] pl-[5%] lg:pr-[0%]' />
                            <input type="text" placeholder='Search' className='border-none h-[5vh] text-[#707070] outline-none bg-[transparent]' />
                        </div>
                        <div className='flex items-center justify-between'>
                            {/* <Link to="/dashboard/add-employee" className='text-[#533AE9] w-[auto] min-w-[150px] border border-[1px] px-[10px] h-[5vh] border-[#11007766] lg:mr-[5%] rounded-md flex justify-center items-center'>Approve Credit</Link> */}
                            <Link to="/dashboard/pending-approvals" className='text-[#533AE9]  w-[auto] min-w-[160px] border border-[1px] px-[10px] h-[5vh] border-[#11007766] lg:mr-[5%] rounded-md flex justify-center items-center'>Pending Approval</Link>
                        </div>
                    </div>
                    <div className='w-[100%] overflow-scroll'>
                        <table className='w-[250%] lg:w-[100%]  rounded-md my-[2%]'>
                            <thead  >
                                <tr className='bg-[#1100770A] text-[0.8rem]  text-[#171515] font-[700] w-[100%] px-[5%] '>
                                    <th className='font-[500]'></th>
                                    <th className='font-[500] py-[1%]'>Name</th>
                                    <th className='font-[500]'>Email</th>
                                    <th className='font-[500]'>Job Title</th>
                                    <th className='font-[500]'>Pay</th>
                                    <th className='font-[500]'>Phone No</th>
                                    <th className='font-[500]'>Status</th>
                                    <th className='font-[500]'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees?.map((elem: any, id: number) => (
                                    <tr key={id} className='bg-[#FFFFFF] text-[0.8rem] text-[#171515] text-center w-[100%] h-[10vh] '>
                                        <td className='font-[400] flex justify-center items-center h-[10vh]'><img src={elem.coverImage} alt="" className='h-[50px]' /></td>
                                        <td className='font-[400]'>{elem.name}</td>
                                        <td className='font-[400]'>{elem.email}</td>
                                        <td className='font-[400]'>{elem.workData?.jobTitle}</td>
                                        <td className='font-[400]'>₦{elem.workData?.workSalary}</td>
                                        <td className='font-[400]'>{elem.phoneNumber}</td>
                                        <td className='font-[400]'>{elem.workData?.employmentStatus}</td>
                                        <td className='font-[400] flex justify-center items-center h-[12vh]'>
                                            <div className='mx-[2px] text-[#32C38F] cursor-pointer' onClick={() => navigate(`/dashboard/employees/${elem.id}`)} ><img src={view} alt='view' /> </div>
                                            <div className='mx-[2px] text-[#32C38F] cursor-pointer' onClick={() => navigate(`/dashboard/issue-credit/${elem.id}`)} ><img src={edit} alt='edit' /> </div>
                                            <div className='mx-[2px] text-[#32C38F] cursor-pointer' onClick={() => deleteEmployee(elem.id)} ><img src={trash} alt='trash' /> </div>
                                        </td>

                                    </tr>))}

                            </tbody>
                        </table>

                    </div>

                </div>


                {showConfirmation && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-300 shadow-md z-50">
                        <p className="mb-4">Are you sure you want to proceed?</p>
                        <button onClick={handleConfirm} className="bg-green-500 text-white px-4 mr-3 py-2 rounded">
                            Yes
                        </button>
                        <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">
                            No
                        </button>
                    </div>
                )}

            </div>

        </div>
    )
}

export default Employees