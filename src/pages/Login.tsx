import lucred from "../assets/lucred.png";
import mi from "../assets/mi.png";
import apple from "../assets/apple.png";
import huawei from "../assets/huawei.png";
import alcatel from "../assets/alcatel.png";
import loginImg from "../assets/loginImg.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getDashboardInfo,
  getEmployeeTransactions,
  loginUser,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState<any>({
    emailAddress: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch() as unknown as any;
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(loginUser(formData));
    navigate("/dashboard");
    dispatch(getDashboardInfo());
    dispatch(getEmployeeTransactions());
    setLoading(false);
  };

  return (
    <div className='flex lg:flex-row flex-col justify-between px-[5%] py-[3%] h-[100vh]'>
      <div className='xl:w-[50%] lg:w-[60%]  py-[5%] pl-[5%] lg:block flex flex-col items-center justify-center'>
        <img src={lucred} alt='Lucred' />
        <div className='text-center lg:text-left'>
          <div className='mt-[15%]'>
            <h3 className='font-[500] text-[2.4rem]'>Welcome back</h3>
            <p className='text-[#8C858D]'>
              Welcome back! Please enter your details.{" "}
            </p>
          </div>
          <div className='text-left my-[2%]'>
            <label className='text-[#171515]'>Email</label>
            <br></br>
            <input
              type='text'
              name='emailAddress'
              placeholder='Enter your email'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <div className='text-left'>
            <label>Password</label>
            <br></br>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-between items-center w-[100%] lg:w-[70%] my-[2%]'>
            <div className=' flex xl:w-[50%] lg:w-[35%] items-center'>
              <input type='checkbox' className='bg-[#533AE9]' />
              <label className='ml-[5px]'>Remember me</label>
            </div>
            <p>Forgot password?</p>
          </div>
          <button
            className='bg-[#533AE9] text-white rounded-md w-[70%]'
            disabled={loading}
            onClick={handleSubmit}
            onKeyDown={handleSubmit}
          >
            {loading ? "Please wait..." : "Sign in"}
          </button>
          <p className=' text-center text-[.8rem] lg:w-[70%] my-[3%]'>
            Want to partner with us? Sign up
          </p>
          <div className='flex items-center mt-[10%]'>
            <img src={mi} alt='mi' className='w-[40px] h-[40px] mr-[5px]' />
            <img
              src={apple}
              alt='apple'
              className='w-[40px] h-[40px] mr-[5px]'
            />
            <img
              src={huawei}
              alt='huawei'
              className='w-[40px] h-[40px] mr-[5px]'
            />
            <img
              src={alcatel}
              alt='alcatel'
              className='w-[40px] h-[40px] mr-[5px]'
            />
            <p className='text-[.8rem]'>Partner with us today</p>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex flex-col items-center justify-center bg-[#1100770A] xl:w-[50%] lg:w-[45%] rounded-md py-[5%] text-center'>
        <h2 className='text-[1.5rem] lg:text-[2.2rem] text-[#110077] font-[600]'>
          Invest in your employee’s
        </h2>
        <p className='w-[70%] mx-auto text-[0.9rem]'>
          Invest in your staffs well-being by offering them credit cards
        </p>
        <img
          src={loginImg}
          alt='loginImg'
          className='lg:h-[35vh] xl:h-[65vh] my-[3%]'
        />
      </div>
    </div>
  );
};

export default Login;
