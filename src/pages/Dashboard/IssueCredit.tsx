import edit from '../../assets/edit.png'
import view from '../../assets/view.png'
import trash from '../../assets/trash.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { approveCredit, approveEmployees, deleteProduct, getEmployees, getSingleEmployee } from '../../redux/actions'
import { SelectInput, TextInput } from './DashboardAddProduct'

const IssueCredit = () => {
    const dispatch = useDispatch() as unknown as any
    const navigate = useNavigate()
    const id = localStorage.getItem("companyId") as unknown as string
    const [currentEmployee, setcurrentEmployee] = useState<any>(null)
    const [loadingApprove, setloadingApprove] = useState<boolean>(false)
    const [loadingReject, setloadingReject] = useState<boolean>(false)
    const [compoundInterest, setcompoundInterest] = useState<any>(0)

    const [formData, setFormData] = useState<any>({
        amount: "",
        duration: 0,
    });

    const durations = [
        1,
        2,
        3,
        4,
        5,
        6,
    ]

    const singleEmployee = useSelector((state: any) => state.singleEmployee)
    console.log('singleEmployee', singleEmployee);

    const handleViewEmployeeData = (item: string) => {
        setcurrentEmployee(item)
    }

    const handleApproveEmployee = async (id: string) => {
        await dispatch(approveEmployees(id))
        navigate(-1)
    }

    const handleRejectEmployee = async (id: string) => {
        await dispatch(approveEmployees(id))
        navigate(-1)
    }

    const handleConfirmCredit = async () => {
        const payload = {
            userId: employeeId,
            creditAmount: +formData.amount,
            creditDuration: +formData.duration,
            monthlyRepayment: +compoundInterest,
            totalCreditPayment: +formData.amount + +compoundInterest,
            startDate: new Date().toISOString().split('T')[0]
        }
        console.log('ddddd', payload);

        const res = await dispatch(approveCredit(payload))
        console.log('ressss', res);
        setFormData({
            amount: "",
            duration: 0,
        })
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;

        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { employeeId } = useParams()
    // const annualInterestRate = 4
    console.log('employeeId', employeeId);

    const annualInterestRate = 0.04;
    const compoundingPeriodsPerYear = 12;
    const currentDate = new Date();

    const findDueDate = () => {
        const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + +formData.duration, currentDate.getDate());
        const formattedFutureDate = futureDate.toDateString();
        return formattedFutureDate
    }


    const calculateCompoundInterest = () => {
        const monthlyInterestRate = annualInterestRate / compoundingPeriodsPerYear;
        const totalCompoundingPeriods = compoundingPeriodsPerYear * +formData.duration;
        const futureValue = +formData.amount * Math.pow(1 + monthlyInterestRate, totalCompoundingPeriods);
        const compoundInterest = futureValue - +formData.amount;
        setcompoundInterest(compoundInterest.toFixed(2))
        return compoundInterest.toFixed(2);
    };

    useEffect(() => {
        calculateCompoundInterest()
    }, [formData])

    useEffect(() => {
        if (employeeId) {
            dispatch(getSingleEmployee(employeeId))
        }
    }, [employeeId])
    useEffect(() => {
        dispatch(getEmployees({ approvalStatus: "pending" }))
    }, [])
    useEffect(() => {
        console.log('singleEmployee', singleEmployee);

        if (singleEmployee) {
            setcurrentEmployee(singleEmployee)
        }
    }, [singleEmployee])
    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[8%]`} bg-[#1100770A] min-h-[100vh]  `}>
            <div className='mx-[3%]'>
                <div className='py-[1%]'>
                    <p className='text-[0.7rem]'>Dashboard/Issue Credit</p>
                    <h3 className='text-[1.3rem] font-[500]'>Issue Credit</h3>
                </div>

                <div className='flex justify-between'>
                    <div className='py-[2%] px-[1%] w-[65%]'>
                        <div className='w-[100%] overflow-scroll'>
                            <TextInput
                                label="Amount of loan request"
                                name="amount"
                                value={formData.amount}
                                placeholder={`Amount of loan request`}
                                onChange={handleChange}
                                width={`w-[100%]`}
                            />
                            <SelectInput
                                label="Payment duration in month(s)"
                                name="duration"
                                data={durations}
                                value={formData.duration}
                                width={`w-[100%]`}
                                onChange={handleChange}
                            />
                            {compoundInterest && +compoundInterest > 0 &&
                                <>
                                    <div className='flex justify-center'>
                                        <div className='my-[3%] mr-6 w-[50%]'>
                                            <div className='text-[0.9rem] font-[400] pb-[2px]'>You will pay</div>
                                            <div className='text-[0.9rem] font-[400] text-[#110077]'>₦{((+compoundInterest + +formData.amount) / formData.duration).toFixed(2)}</div>
                                            <div className='text-[0.9rem] font-[400] text-[#C3C3C4]'>Per Month</div>
                                        </div>
                                        <div className='my-[3%] w-[50%]'>
                                            <div className='text-[0.9rem] font-[400] pb-[2px]'>Due Date</div>
                                            <div className='text-[0.9rem] font-[400] text-[#C3C3C4]'>{findDueDate()}</div>
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <div className='my-[3%] mr-6 w-[50%]'>
                                            <div className='text-[0.9rem] font-[400] pb-[2px]'>Loan</div>
                                            <div className='text-[0.9rem] font-[400] text-[#C3C3C4]'>₦{formData.amount}</div>
                                        </div>
                                        <div className='my-[3%] mr-6 w-[50%]'>
                                            <div className='text-[0.9rem] font-[400] pb-[2px]'>Return</div>
                                            <div className='text-[0.9rem] font-[400] text-[#C3C3C4]'>₦{(+compoundInterest + +formData.amount).toFixed(2)}</div>
                                        </div>
                                        <div className='my-[3%] mr-6 w-[50%]'>
                                            <div className='text-[0.9rem] font-[400] pb-[2px]'>Interest</div>
                                            <div className='text-[0.9rem] font-[400] text-[#C3C3C4]'>₦{compoundInterest}</div>
                                        </div>
                                    </div>
                                    <div className='my-[7%] flex justify-center'>
                                        <button className='text-[#ffffff] w-[auto] min-w-[160px] rounded-md bg-[#533AE9] px-[10px] lg:mr-[5%] rounded-md flex justify-center items-center' onClick={() => handleConfirmCredit()}>Confirm</button>
                                    </div>
                                </>
                            }
                        </div>

                    </div>

                    {currentEmployee &&
                        <div className='py-[2%] px-[1%] w-[35%] '>
                            <div className='bg-[#fff] h-[800px]'>
                                <div className="w-[100%]  py-[3%] px-[4%] my-[2%] rounded-md">
                                    <h3 className='text-[1.5rem] font-[500]'> Personal Information </h3>

                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Full Name:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.firstName} {currentEmployee.lastName}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Job Title:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.jobTitle}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Email:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.email}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Salary:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.salary}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Credit Date:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.creditDate}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Phone Number:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>{currentEmployee.phoneNumber}</div>
                                    </div>
                                    <div className='my-[3%]'>
                                        <div className='text-[0.9rem] font-[400] pb-[2px]'>Total Amount Of Credit Collected:</div>
                                        <div className='text-[0.9rem] font-[400] text-[#110077]'>₦{currentEmployee.collectedCredit}</div>
                                    </div>
                                </div>
                            </div>

                        </div>}
                </div>
            </div>


        </div >
    )
}

export default IssueCredit