import { Link } from 'react-router-dom'
import profille from '../../assets/profille.png'
import { SelectInput, TextInput } from './DashboardAddProduct'
import { useEffect, useRef, useState } from 'react'
import { updateLogo } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
    const [imgFile, setImgFile] = useState('')

    const id = localStorage.getItem("userId") as string
    const logo = localStorage.getItem("logo")
    const dispatch = useDispatch() as unknown as any

    const company = useSelector((state: any) => state.data)?.companyData


    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`} bg-[#1100770A]min-h-[100vh]`} >
            <div className='mx-[3%]'>
                <div className="flex items-center justify-between">
                    <div className='py-[1%]'>
                        <p className='text-[0.7rem]'>Dashboard/Profile</p>
                        <h3 className='text-[1.3rem] font-[500]'>Profile</h3>
                    </div>
                </div>
                <div className='bg-[#533AE9] mb-[6%] px-[1%] rounded-md flex items-end'>
                    <div className='flex items-end h-[20vh]'>
                        <div className='bg-[#fff] w-[150px] h-[150px] rounded-[50%] flex items-center justify-center mb-[-21%]' >
                            {!imgFile ? <img src={logo || profille} alt="" className='w-[150px] h-[150px] object-cover object-top rounded-[50%]' /> :
                                <img src={imgFile} alt="" className='w-[150px] h-[150px] object-cover object-top rounded-[50%]' />}
                        </div>
                        <h3 className='text-[1.3rem] font-[500] text-[#fff] ml-[10px]'>{company?.name}</h3>
                    </div>
                </div>

                <div className=' py-[2%] px-[1%] rounded-md lg:grid grid-cols-2 grid-rows-4 gap-x-8 mt-[15%] lg:mt-[0%]' >
                    <TextInput label='Company Name' value={company?.name} readonly={true} />
                    <TextInput label='Email Address' type='email' value={company?.emailAddress} readonly={true} />
                    <TextInput label='CAC Number' value={company?.cacNumber} readonly={true} />
                    <TextInput label='Pay Day' value={company?.payDay} readonly={true} />
                    <TextInput label='Total Employees' type='number' value={company?.totalEmployees} readonly={true} />
                    <TextInput label='Total HR' type='number' value={company?.totalHR} readonly={true} />
                    <TextInput label='Contact Number' type='text' value={company?.phoneNumber} readonly={true} />
                    <TextInput label='Country' value={company?.country} readonly={true} />
                    <TextInput label='City' value={company?.city} readonly={true} />
                    <TextInput label='Address' value={company?.address} readonly={true} />
                </div>
                <div className='flex justify-end'>
                    <Link to="/dashboard/settings" className='bg-[#533AE9] w-[50%] lg:w-[10%] h-[5vh] text-[#fff] rounded-md flex justify-center items-center'>Edit</Link>
                </div>
            </div>


        </div>
    )
}

export default Profile