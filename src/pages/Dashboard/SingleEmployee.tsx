import shoes from "../../assets/shoe1.jpeg";
import drag1 from "../../assets/dragndrop1.png";
import drag2 from "../../assets/dragndrop2.png";
import mac from "../../assets/mac1.jpeg";
import { categories } from "../../data/categories";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getSingleEmployee } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { SelectInput, TextAreaInput, TextInput } from "./DashboardAddProduct";

const SingleEmployee = () => {
  const dispatch = useDispatch() as unknown as any

  const singleEmployee = useSelector((state: any) => state.singleEmployee)  

  const { employeeId } = useParams()

  useEffect(() => {
    if (employeeId) {
      dispatch(getSingleEmployee(employeeId))
    }
  }, [])

  return (
    <div
      className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
        } bg-[#1100770A]min-h-[100vh] `}
    >
      <div className="mx-[3%]">
        <div className="py-[1%]">
          <p className="text-[0.7rem]">Dashboard/Employee</p>
          <h3 className="text-[1.3rem] font-[500]">
            {singleEmployee?.firstName + ' ' + singleEmployee?.lastName}
          </h3>
        </div>

        <form
          className="flex lg:flex-row flex-col justify-between"

        >
          <div className="bg-[#fff] lg:w-[600px] px-[3%] py-[2%] rounded-md ">
            <TextInput
              label="Employee First Name"
              placeholder="Employee First Name"
              type="text"
              name="firstName"
              value={singleEmployee?.firstName}
              readonly={true}
            />
            <TextInput
              label="Employee Last Name"
              placeholder="Employee Last Name"
              type="text"
              name="lastName"
              value={singleEmployee?.lastName}
              readonly={true}
            />

            <TextInput
              label="Job Title"
              name="jobTitle"
              width={`w-[100%]`}
              value={singleEmployee?.jobTitle}
              readonly={true}
            />

            <TextInput
              label="Phone Number"
              name="phoneNumber"
              value={singleEmployee?.phoneNumber}
              readonly={true}
            />
            <TextInput
              label="Company"
              name="company"
              value={singleEmployee?.company}
              readonly={true}
            />
            <TextInput
              label="Collected Credit"
              name="collectedCredit"
              value={singleEmployee?.collectedCredit}
              readonly={true}
            />
            <TextInput
              label="Credit Date"
              name="creditDate"
              value={singleEmployee?.creditDate}
              readonly={true}
            />
          </div>
          {/* <div className="bg-[#fff] lg:w-[50%] px-[3%] py-[2%] rounded-md ">
            <div>
              <h3 className="text-[#110077]">Employee Images</h3>
              <div className="flex justify-between">
                <img
                  src={singleEmployee?.image}
                  alt=""
                  className="w-[auto] border border-dashed border-[#8C858D] rounded-md w-[55%]"
                />

              </div>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default SingleEmployee;
