import { Link, useNavigate } from 'react-router-dom'
import profille from '../../assets/profille.png'
import { TextInput } from './DashboardAddProduct'
import { useState } from 'react'
import { updateProfile } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'


const Settings = () => {
    const navigate = useNavigate()
    const company = useSelector((state: any) => state.companyProfile)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<any>({
        name: company?.name,
        emailAddress: company?.emailAddress,
        address: company?.address,
        cacNumber: company?.cacNumber,
        payDay: company?.payDay,
        phoneNumber: company?.phoneNumber,
        totalEmployees: company?.totalEmployees,
        totalHR: company?.totalHR,
        country: company?.country,
        city: company?.city,
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    const id = localStorage.getItem("userId")
    const logo = localStorage.getItem("logo")

    const dispatch = useDispatch() as unknown as any

    const handleSubmit = async (e: any) => {
        setLoading(true)
        e.preventDefault()
        await dispatch(updateProfile({ formData }))
        setLoading(false)
        navigate("/dashboard/profile")
    }

    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`} bg-[#1100770A]`}>
            <div className='mx-[3%]'>
                <div className="flex items-center justify-between">
                    <div>
                        <div className='py-[1%]'>
                            <p className='text-[0.7rem]'>Dashboard/Profile</p>
                            <h3 className='text-[1.3rem] font-[500]'>Profile</h3>
                        </div>
                        <h3 className="lg:text-[1.5rem] text-[1.2rem] font-[500]">Company Information</h3>
                        <p className="text-[#8C858D] lg:text-[0.9rem] text-[0.6rem]">Here you can edit information about your company</p>

                    </div>
                    <div className='flex flex-col items-center py-[4%]'>
                        <p className='text-[0.8rem]'>Company Logo</p>
                        <div className='bg-[#fff] w-[100px] h-[100px] border border-[#533AE9] border-[5px] rounded-[50%] flex items-center justify-center '>
                            <img src={logo || profille} alt="" className='w-[90px] h-[90px] object-cover object-top rounded-[50%]' />
                        </div>
                    </div>
                </div>

                <div className='flex lg:flex-row flex-col justify-between'>
                    <div className='lg:w-[45%]'>
                        <TextInput name='name' label='Company Name' type="text" onChange={handleChange} value={formData?.name} />
                        <TextInput name='emailAddress' label='Email Address' type="email" onChange={handleChange} value={formData?.emailAddress} />
                        <TextInput name='address' label='Address' type="text" onChange={handleChange} value={formData?.address} />
                        <TextInput name='cacNumber' label='CAC Number' onChange={handleChange} value={formData?.cacNumber} />
                        <TextInput name='payDay' label='Pay Day' onChange={handleChange} value={formData?.payDay} />

                    </div >
                    <div className='lg:w-[45%]'>
                        <TextInput name='phoneNumber' label='Contact Number' type="text" onChange={handleChange} value={formData?.phoneNumber} />
                        <TextInput name='totalEmployees' label='Total Employees' type='number' onChange={handleChange} value={formData?.totalEmployees} />
                        <TextInput name='totalHR' label='Total HR' type='number' onChange={handleChange} value={formData?.totalHR} />
                        <TextInput name='country' label='Country' value={formData?.country} onChange={handleChange} />
                        <TextInput name='city' label='City' value={formData?.city} onChange={handleChange} />
                    </div>

                </div>
                <div className='flex justify-end  py-[5%]'>
                    <Link to="" className='bg-[#FFF] lg:w-[20%] w-[50%] h-[5vh] text-[#533AE9] mr-[5%] rounded-md flex justify-center items-center' onClick={() => navigate(-1)}>Cancel</Link>
                    <button disabled={loading} className='bg-[#533AE9] lg:w-[20%] w-[50%] h-[5vh] text-[#fff] rounded-md flex justify-center items-center' onClick={handleSubmit}> {loading ? 'Please wait...' : 'Save Changes'}</button>
                </div>
            </div>
        </div>
    )
}

export default Settings