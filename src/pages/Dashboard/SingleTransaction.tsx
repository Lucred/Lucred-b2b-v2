import React, { useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEmployeeTransactions } from '../../redux/actions';
import { formatAmount, formatDate } from '../../utils/serviceUtils';

const SingleTransaction: React.FC = () => {
    const [repayedAmount, setRepayedAmount] = useState<number>(3);
    const [totalAmount, setTotalAmount] = useState<number>(12);

    const dispatch = useDispatch() as unknown as any

    const singleEmployeetransactions = useSelector((state: any) => state.singleEmployeetransactions)

    const { userId } = useParams()

    useEffect(() => {
        if (userId) {
            dispatch(getSingleEmployeeTransactions(userId))
        }
    }, [])

    const trnxData = [
        {
            title: "Credit Funded",
            progress: singleEmployeetransactions?.creditFunded,
            total: singleEmployeetransactions?.creditFunded,
            isAmount: true
        },
        {
            title: "Interest Rate",
            progress: (((singleEmployeetransactions?.amountTobePaid - singleEmployeetransactions?.creditFunded) / singleEmployeetransactions?.creditFunded) * 100)?.toFixed(2),
            total: 100,
            isAmount: false
        },
        {
            title: "Amount to be paid",
            progress: singleEmployeetransactions?.amountTobePaid,
            total: singleEmployeetransactions?.amountTobePaid,
            isAmount: true
        },
        {
            title: "Credit Tenure",
            progress: singleEmployeetransactions?.creditTenure,
            total: 12,
            isAmount: false
        },
    ]

    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`} bg-[#1100770A]min-h-[100vh] `}>
            <div className='mx-[3%]'>
                <div className="">
                    <div className='py-[1%]'>
                        <p className='text-[0.7rem]'>Dashboard/Transactions</p>
                        <h3 className='text-[1.3rem] font-[500]'>Transactions</h3>
                    </div>
                    <div className='p-4 border shadow-md z-50'>
                        <div className='text-[1.3rem] font-[500]'>Credit Summary</div>
                        <div className="my-4">
                            {trnxData?.map((trnx, index) => (
                                <div key={index} className="my-3">
                                    <div className='flex items-center justify-between mb-5'>
                                        <h1 className="text-[1rem] font-[400] text-[#110077]">{trnx.title}</h1>
                                        <h1 className="text-[1rem] font-[400] text-[#110077]">{trnx.isAmount ? formatAmount(trnx.progress) : index == 1 ? trnx.progress + '%' : trnx.progress + ' months'}</h1>
                                    </div>
                                    <ProgressBar completedRepayment={trnx.progress} totalRepayment={trnx.total} />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className='p-4 mt-8 border shadow-md z-50'>
                        <div className='text-[1.3rem] font-[500]'>Payment Schedule</div>
                        <div className="w-[100%] overflow-scroll">
                            <table className=' lg:w-[100%] border rounded-md my-[2%] w-[250%]'>
                                <thead  >
                                    <tr className='bg-[#1100770A] text-[0.8rem]  text-[#171515] font-[700] w-[100%] px-[5%] '>
                                        <th className='font-[500] py-[1%]'>DUE ON</th>
                                        <th className='font-[500]'>TOTAL PAYMENT</th>
                                        <th className='font-[500]'>MONTHLY PAYMENT</th>
                                        <th className='font-[500]'>PAYMENT STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {singleEmployeetransactions?.paymentSchedule?.map((elem: any, id: number) => (
                                        <tr key={id} className='bg-[#FFFFFF] text-[0.8rem] text-[#171515] text-center w-[100%] h-[10vh] '>
                                            <td className='font-[400]'>{formatDate(elem.date, 'longDateTime')}</td>
                                            <td className='font-[400]'>{formatAmount(elem.amount)}</td>
                                            <td className='font-[400]'>{formatAmount(elem.pendingBalance)}</td>
                                            <td className='font-[400]'>{elem.paymentStatus}</td>
                                        </tr>))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTransaction;
