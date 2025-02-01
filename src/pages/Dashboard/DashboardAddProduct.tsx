/* eslint-disable @typescript-eslint/no-empty-function */
import shoes from "../../assets/shoe1.jpeg";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { updateProduct } from "../../redux/actions";
import { useDispatch } from "react-redux";

const DashboardAddProduct = () => {
  const id = localStorage.getItem("companyId");

  const [formData, setFormData] = useState<any>({
    title: "",
    category: "",
    coverImage: "",
    description: "",
    isAvailable: true,
    subCategory: "",
    specifications: [],
    price: 0,
    merchantId: id,
    categoryId: "",
  });

  const [updateData, setupdateData] = useState<any>({
    title: "",
    category: "",
    coverImage: "",
    description: "",
    isAvailable: true,
    subCategory: "",
    specifications: [],
    price: 0,
    categoryId: "",
  });

  const titles = [
    "Accountant",
    "marketing",
    "Manager",
    "Head of Cashier",
    "Graphic Designer",
    "Web Developer",
    "Product Designer",
    "Driver",
    "Customer Rep",
    "Security",
    "IT Staff",
    "Others",
  ];

  const [desc, setDesc] = useState("");

  const [images, setImages] = useState<any>(null);

  const imageRef = useRef<any>(null);

  const handleRef = () => {
    imageRef.current.click();
  };

  const [chips, setChips] = useState<string[]>([]);

  const dispatch = useDispatch() as unknown as any;

  const handleDeleteChip = (index: number) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };

  const onDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setDesc(value);
  };

  const onEnterDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      setFormData({
        ...formData,
        specifications: JSON.stringify([...chips, value]), // Use the current chips state directly
      });

      setupdateData({
        ...updateData,
        specifications: JSON.stringify([...chips, value]), // Use the current chips state directly
      });

      setChips([...chips, value]); // Update the chips state with the new value

      setDesc("");

      setDesc("");

      console.log(formData);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    if (name === "coverImage") {
      console.log(e.target.files[0]);
      setImages(URL.createObjectURL(e.target.files[0]));
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });

      setupdateData({
        ...updateData,
        [name]: e.target.files[0],
      });
    } else {
      console.log(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });

      setupdateData({
        ...updateData,
        [name]: value,
      });
    }
  };

  console.log(formData);

  const handleSubmit = async (e: any) => {};

  const updateSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(updateProduct({ id: employeeId, formData: updateData }));
  };

  const { employeeId } = useParams();

  return (
    <div
      className={`${
        window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
      } bg-[#1100770A]min-h-[100vh] `}
    >
      <div>
        <div className='mx-[3%]'>
          <div className='py-[1%]'>
            <p className='text-[0.7rem]'>Dashboard/Employee</p>
            <h3 className='text-[1.3rem] font-[500]'>
              {employeeId ? ` Update Employee` : `Add Employee`}
            </h3>
          </div>
          <p className='text-[#8C858D] w-[60%] lg:text-[0.9rem] text-[0.6rem]'>
            Be sure to fill the priority information requested with the
            personnel completely.
          </p>
        </div>

        <form
          className='flex lg:flex-row flex-col justify-between'
          onSubmit={employeeId ? updateSubmit : handleSubmit}
        >
          <div className='bg-[#fff] lg:w-[40%] px-[3%] py-[2%] rounded-md '>
            <TextInput
              label='Name'
              placeholder='Name'
              type='text'
              name='name'
              value={formData.title}
              onChange={handleChange}
              error='Do not exceed 20 character.'
            />
            <SelectInput
              label='Job title'
              name='Jobtitle'
              data={titles}
              width={`w-[100%]`}
              onChange={handleChange}
            />
            <div className='flex justify-between w-[100%] '>
              <SelectInput
                label='Gender'
                data={["Male", "Female"]}
                width={`w-[50%]`}
              />
              <SelectInput
                label='Status'
                data={["Full Staff", "Contract Staff"]}
                width={`w-[50%]`}
              />
            </div>
            <TextInput
              label='Address'
              name='Address'
              value={formData.address}
              placeholder={`Address`}
              onChange={handleChange}
              width={`w-[100%]`}
            />
            <TextInput
              label='Email Address'
              name='Address'
              value={formData.email}
              placeholder={`Email Address`}
              onChange={handleChange}
              width={`w-[100%]`}
            />
            <TextInput
              label='Description'
              name='description'
              value={formData?.description}
              onChange={handleChange}
            />
            <TextAreaInput
              label='Specifications'
              name='specifications'
              value={desc}
              chips={chips}
              del={handleDeleteChip}
              onChange={onDescription}
              onKeyPress={onEnterDescription}
              error='Do not exceed 20 character when entering product description. '
            />
          </div>
          <div className='bg-[#fff] lg:w-[50%] px-[3%] py-[2%] rounded-md '>
            <div>
              <h3 className='text-[#110077]'>Product Images</h3>
              <div className='flex justify-between'>
                <img
                  src={images || shoes}
                  alt=''
                  className='h-[20vh] border border-dashed border-[#8C858D] rounded-md w-[55%]'
                  onClick={handleRef}
                />
                <input
                  type='file'
                  name='coverImage'
                  className='hidden'
                  ref={imageRef}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <TextInput
                label='Price'
                name='price'
                value={formData.price}
                placeholder={`₦35,000`}
                onChange={handleChange}
                width={`w-[100%]`}
              />
            </div>

            <div className='flex justify-center my-[8%]'>
              <Link
                to='/dashboard/employees'
                className='bg-[#FAFAFA] w-[50%] h-[5vh] text-[#533AE9] mr-[5%] rounded-md flex justify-center items-center'
              >
                Cancel
              </Link>
              {employeeId ? (
                <button
                  type='submit'
                  disabled
                  className='bg-[#533AE9] w-[40%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center'
                >
                  Update Employee
                </button>
              ) : (
                <button
                  type='submit'
                  disabled
                  className='bg-[#533AE9] w-[50%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center t'
                >
                  Add Employee
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddProduct;

export const TextInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  width,
  readonly,
}: any) => {
  return (
    <div className='flex flex-col py-[2%]'>
      <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-[#11007766] rounded-md h-[6vh] lg:h-[4vh] px-[2%] outline-none ${width}`}
        readOnly={readonly}
      />
      {error && <p className='text-[0.7rem] text-[#8C858D]'>{error}</p>}
    </div>
  );
};

export const SelectInput = ({
  label,
  name,
  data,
  onChange,
  width,
  readonly,
}: any) => {
  const location = useLocation();
  return (
    <div className={`flex flex-col ${width} py-[2%]`}>
      <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>
        {label}
      </label>
      <select
        name={name}
        onChange={onChange}
        className={`border border-[#11007766] rounded-md px-[2%] outline-none w-[100%] h-[6vh] lg:h-[4vh] ${
          location.pathname === "/dashboard/statistics"
            ? `bg-[transparent]`
            : null
        }`}
        disabled={readonly}
      >
        <option>select</option>
        {name === "category"
          ? data?.map((elem: any, id: number) => (
              <option key={id} value={elem.name}>
                {elem.name}
              </option>
            ))
          : data?.map((elem: string, id: number) => (
              <option key={id} value={elem}>
                {elem}
              </option>
            ))}
      </select>
    </div>
  );
};

export const TextAreaInput = ({
  label,
  del,
  chips,
  name,
  value,
  onChange,
  onKeyPress,
  width,
  error,
}: any) => {
  return (
    <div>
      <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>
        {label}
      </label>
      <div
        className={`flex flex-col ${width} py-[2%] border border-[#11007766] rounded-md`}
      >
        <div className='flex flex-wrap '>
          {chips?.map((chip: string, index: number) => (
            <Chip key={index} text={chip} onDelete={() => del(index)} />
          ))}
        </div>
        {label === "Specifications" ? (
          <input
            className=' px-[2%] outline-none w-[100%]'
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyPress}
          ></input>
        ) : (
          <textarea
            className=' px-[2%] outline-none w-[100%]'
            name={name}
            value={value}
            onChange={onChange}
          ></textarea>
        )}
      </div>
      {error && <p className='text-[0.7rem] text-[#8C858D]'>{error}</p>}
    </div>
  );
};

const Chip = ({ text, onDelete }: any) => {
  const location = useLocation();
  return (
    <div className='chip bg-[#fff] border border-[#ccc] w-[auto] flex justify-between items-center py-[2%] px-[3%] rounded-md mx-[2%] my-[2%]'>
      <span className='chip-text'>{text}</span>
      {location.pathname === "/dashboard/add-employee" ? (
        <button
          className='h-[2px] w-[2px] flex justify-center items-center ml-[5%] bg-[#fff]'
          onClick={onDelete}
        >
          &times;
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
