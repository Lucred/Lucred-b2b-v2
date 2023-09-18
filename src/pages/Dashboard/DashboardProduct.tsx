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
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteProduct, getProducts } from '../../redux/actions'

const DashboardProduct = () => {
    const dispatch = useDispatch() as unknown as any
    const id = localStorage.getItem("merchantId") as unknown as string

    // const products = useSelector((state: any) => state.product)
    const products = [
        {
            id: 1,
            coverImage: img,
            name: 'Jolly peter',
            email: 'jollypeter@gmail.com',
            jobTitle: 'Accountant',
            gender: 'Male',
            pay: '120,000',
            phoneNo: '08130601026',
            status: 'Full Time'
        },
        {
            id: 2,
            coverImage: img1,
            name: 'Oyinkan Onasile',
            email: 'oyinkanyonasile@gmail.com',
            jobTitle: 'marketing',
            gender: 'Female',
            pay: '120,000',
            phoneNo: '08130601026',
            status: 'Full Time'
        },
        {
            id: 3,
            coverImage: img2,
            name: 'Bethel Aboh',
            email: 'bethelaboh@gmail.com',
            jobTitle: 'Manager',
            gender: 'Female',
            pay: '120,000',
            phoneNo: '08130601026',
            status: 'Full Time'
        },
        {
            id: 4,
            coverImage: img3,
            name: 'Emeka Collins',
            email: 'emecollins@gmail.com',
            jobTitle: 'Graphic Designer',
            gender: 'Male',
            pay: '120,000',
            phoneNo: '08130601026',
            status: 'Contract'
        },
        {
            id: 5,
            coverImage: img4,
            name: 'Marvina Ojeri',
            email: 'marvinaoj@gmail.com',
            jobTitle: 'Marketing',
            gender: 'Male',
            pay: '120,000',
            phoneNo: '08130601026',
            status: 'Part Time'
        },
    ]


    useEffect(() => {
        dispatch(getProducts(id))
    }, [])
    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[8%]`} bg-[#1100770A]min-h-[100vh] `}>
            <div className='mx-[3%]'>
                <div className='py-[1%]'>
                    <p className='text-[0.7rem]'>Dashboard/Employee</p>
                    <h3 className='text-[1.3rem] font-[500]'>Employee</h3>
                </div>

                <div className='bg-[#fff] py-[2%] px-[1%]'>
                    <div className='flex items-center justify-between'>
                        <div className='lg:w-[25%] w-[50%] bg-[#FFFFFF] flex items-center justify-center h-[5vh] border border-[#C3C3C4] rounded-md'>
                            <img src={search} alt="" className='h-[2vh] mr-[5%] pl-[5%] lg:pr-[0%]' />
                            <input type="text" placeholder='Search' className='border-none h-[5vh] text-[#707070] outline-none bg-[transparent]' />
                        </div>
                        <Link to="/dashboard/add-employee" className='bg-[#533AE9] lg:w-[20%] w-[40%] h-[5vh] text-[#fff] lg:mr-[5%] rounded-md flex justify-center items-center'>Add Employee</Link>
                    </div>
                    <div className='w-[100%] overflow-scroll'>
                        <table className='w-[250%] lg:w-[100%]  rounded-md my-[2%]'>
                            <thead  >
                                <tr className='bg-[#1100770A] text-[0.8rem]  text-[#171515] font-[700] w-[100%] px-[5%] '>
                                    <th className='font-[500]'></th>
                                    <th className='font-[500] py-[1%]'>Name</th>
                                    <th className='font-[500]'>Email</th>
                                    <th className='font-[500]'>Job Title</th>
                                    <th className='font-[500]'>Gender</th>
                                    <th className='font-[500]'>Pay</th>
                                    <th className='font-[500]'>Phone No</th>
                                    <th className='font-[500]'>Status</th>
                                    <th className='font-[500]'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((elem: any, id: number) => (
                                    <tr key={id} className='bg-[#FFFFFF] text-[0.8rem] text-[#171515] text-center w-[100%] h-[10vh] '>
                                        <td className='font-[400] flex justify-center items-center h-[10vh]'><img src={elem.coverImage} alt="" className='h-[50px]' /></td>
                                        <td className='font-[400]'>{elem.name}</td>
                                        <td className='font-[400]'>{elem.email}</td>
                                        <td className='font-[400]'>{elem.jobTitle}</td>
                                        <td className='font-[400]'>{elem.gender}</td>
                                        <td className='font-[400]'>₦{elem.pay}</td>
                                        <td className='font-[400]'>{elem.phoneNo}</td>
                                        <td className='font-[400]'>{elem.status}</td>
                                        <td className='font-[400]  '><div className='flex items-center justify-center'><Link to={`/dashboard/employees/${elem._id}`}><img src={view} className='mx-[2px]' alt="" /></Link><Link to={`/dashboard/update-employee/${elem._id}`}><img src={edit} className='mx-[2px]' alt="" /> </Link><img src={trash} className='mx-[2px]' alt="" onClick={async () => await dispatch(deleteProduct(elem._id))} /> </div> </td>

                                    </tr>))}

                            </tbody>
                        </table>

                    </div>

                </div>




            </div>

        </div>
    )
}

export default DashboardProduct