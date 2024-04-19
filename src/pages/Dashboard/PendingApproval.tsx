import edit from '../../assets/edit.png'
import view from '../../assets/view.png'
import trash from '../../assets/trash.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { approveEmployees, deleteProduct, getEmployees } from '../../redux/actions'

const PendingApproval = () => {
    const dispatch = useDispatch() as unknown as any
    const navigate = useNavigate()
    const id = localStorage.getItem("companyId") as unknown as string
    const [currentEmployee, setcurrentEmployee] = useState<any>(null)
    const [loadingApprove, setloadingApprove] = useState<boolean>(false)
    const [loadingReject, setloadingReject] = useState<boolean>(false)

    const employees = useSelector((state: any) => state.pendingemployees)
    console.log('employees', employees);

    const handleViewEmployeeData = (item: string) => {
        setcurrentEmployee(item)
    }

    const handleApproveEmployee = async (employeeId: string, workProfileId: string) => {
        const formData = {
            workProfileId,
            employeeId
        }
        await dispatch(approveEmployees(formData))
        navigate(-1)
    }

    const handleRejectEmployee = async (employeeId: string, workProfileId: string) => {
        const formData = {
            workProfileId,
            employeeId
        }
        await dispatch(approveEmployees(formData))
        navigate(-1)
    }

    useEffect(() => {
        dispatch(getEmployees({ approvalStatus: "pending" }))
    }, [])
    useEffect(() => {
        setcurrentEmployee(employees?.[0])
    }, [employees])
    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[8%]`} bg-[#1100770A] min-h-[100vh]  `}>
            <div className='mx-[3%]'>
                <div className='py-[1%]'>
                    <p className='text-[0.7rem]'>Dashboard/Pending Approval</p>
                    <h3 className='text-[1.3rem] font-[500]'>Pending Approval</h3>
                </div>

                <div className='flex justify-between'>
                    <div className='py-[2%] px-[1%] w-[65%]'>
                        <div className='w-[100%] overflow-scroll'>
                            <table className='w-[250%] lg:w-[100%]  rounded-md my-[2%]'>
                                <thead  >
                                    <tr className='bg-[#1100770A] text-[0.8rem]  text-[#171515] font-[700] w-[100%] px-[5%] '>
                                        <th className='font-[500]'></th>
                                        <th className='font-[500] py-[1%]'>Name</th>
                                        <th className='font-[500]'>Job Title</th>
                                        <th className='font-[500]'>Salary</th>
                                        <th className='font-[500]'>Phone No</th>
                                        <th className='font-[500]'>Status</th>
                                        <th className='font-[500]'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees?.map((elem: any, id: number) => (
                                        <tr key={id} className='bg-[#FFFFFF] text-[0.8rem] text-[#171515] text-center w-[100%] h-[10vh] '>
                                            <td className='font-[400] flex justify-center items-center h-[10vh]'><img src={elem.coverImage} alt="" className='h-[50px]' /></td>
                                            <td className='font-[400]'>{elem.name}</td>
                                            <td className='font-[400]'>{elem.workData?.jobTitle}</td>
                                            <td className='font-[400]'>₦{elem.workData?.workSalary}</td>
                                            <td className='font-[400]'>{elem.phoneNumber}</td>
                                            <td className='font-[400]'>{elem.workData?.employmentStatus}</td>
                                            <td className='font-[400]  '><div className='flex items-center justify-center mx-[2px] text-[#32C38F] cursor-pointer' onClick={() => handleViewEmployeeData(elem)} >View </div> </td>
                                        </tr>))}

                                </tbody>
                            </table>

                        </div>

                    </div>

                    {currentEmployee &&
                        <div className='py-[2%] px-[1%] w-[35%] '>
                            <div className='bg-[#fff] h-[800px]'>
                                <div className="w-[100%]  py-[3%] px-[4%] my-[2%] rounded-md">
                                    <h3 className='text-[1.5rem] font-[500]'> Personal Information </h3>

                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Full Name:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.name}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Job Title:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.workData?.jobTitle}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Personal Email:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.email}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Official Email:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.workData?.employeeEmailAddress}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Phone Number:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.phoneNumber}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Salary:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>₦{currentEmployee.workData?.workSalary}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Status:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.workData?.employmentStatus}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Proof Of Employment. (Kindly click link below to view document):</div>
                                        <a href={currentEmployee.workData?.proofOfWork} target='_blank' className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.workData?.proofOfWork}</a>
                                    </div>
                                    <div className='my-[7%] flex justify-center'>
                                        <button className='text-[#533AE9] w-[auto] min-w-[160px] rounded-md bg-[#ffffff] border border-[1px] px-[10px] border-[#11007766] lg:mr-[5%] rounded-md flex justify-center items-center' onClick={() => handleRejectEmployee(currentEmployee.id, currentEmployee.workData?._id)}>Reject</button>
                                        <button className='text-[#ffffff] w-[auto] min-w-[160px] rounded-md bg-[#533AE9] px-[10px] lg:mr-[5%] rounded-md flex justify-center items-center' onClick={() => handleApproveEmployee(currentEmployee.id, currentEmployee.workData?._id)}>Accept</button>
                                    </div>
                                </div>
                            </div>

                        </div>}
                </div>
            </div>


        </div >
    )
}

export default PendingApproval