import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData } from "../interface";
import { FormDataPost, apiDelete, apiGet, apiPatch, apiPost, apiPut, formDataPut } from "../utils/axios";
import { fetchDataFailure, fetchDataStart, fetchDataSuccess, fetchDataUser, fetchEmployees, fetchTransactions, fetchSingleEmployee } from "./reducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData: LoginData, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/company/hr/login", formData);
      console.log(response)
      localStorage.setItem("userId", response.data.data.hrData._id);
      localStorage.setItem("companyId", response.data.data.companyData._id);
      localStorage.setItem("b2b-signature", response.data.data.token);
      localStorage.setItem("logo", response.data.data.companyData.logo)
      localStorage.setItem("email", response.data.data.companyData.emailAddress)
      toast.success(response.data.message);

      dispatch(fetchDataSuccess(response.data.data));
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.statusText);
      dispatch(fetchDataFailure(error.response.statusText));
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData: LoginData, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/user/signup", formData);
      toast.success(response.data.message);
      localStorage.setItem("b2b-signature", response.data.signature);
      localStorage.setItem("role", response.data.role);
      dispatch(fetchDataSuccess(response.data));
      setTimeout(() => {
        window.location.href = "/confirm";
      }, 2000);
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Dashboard Info======= **/
export const getDashboardInfo = createAsyncThunk(
  "dashboadInfo",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/company/dashboard`);
      console.log(response)
      dispatch(fetchDataUser(response.data.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Employees======= **/
export const getEmployees = createAsyncThunk(
  "getEmployees",
  async (formData: { approvalStatus?: string }, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/company/get-employees", formData ? formData : '');
      // console.log('response.data', response.data);
      dispatch(fetchEmployees(response.data.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**============== Update Employees======= **/
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, formData }: { id: any, formData: any }, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await formDataPut(`/products/${id}`, formData);
      toast.success(response.data.message);
      // window.location.reload()
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Deleter Products======= **/
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiDelete(`/products/${id}`);
      toast.success(response.data.message);
      window.location.reload()
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Update Logo=======  **/
export const updateLogo = createAsyncThunk(
  "updateLogo",
  async ({ id, imageData }: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await formDataPut(`/merchants/update/${id}/logo`, imageData);
      toast.success("Profile Logo Updated");
      dispatch(fetchDataSuccess(response.data));
      window.location.reload()
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Update Profile=======  **/
export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ formData }: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPut(`/company/update`, formData);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Update Profile=======  **/
export const withdraw = createAsyncThunk(
  "withdraw",
  async (formData: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPut(`/merchants/withdraw`, formData);
      toast.success(response.data.message);
      // dispatch(fetchDataSuccess(response.data));
      // setTimeout(() => {
      //   window.location.href = "/dashboard/profile";
      // }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Approve Employees======= **/
export const approveEmployees = createAsyncThunk(
  "approveEmployees",
  async (id: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost(`/company/approve-employees${id}`, {});
      toast.success(response.data.message);
      dispatch(getEmployees({ approvalStatus: "approved" }))
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Employee Transactions======= **/
export const getEmployeeTransactions = createAsyncThunk(
  "getEmployeeTransactions",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/company/employees-transaction`);
      dispatch(fetchTransactions(response.data.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Employee Transactions======= **/
export const getSingleEmployee = createAsyncThunk(
  "getSingleEmployee",
  async (id: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/company/employee-profile/${id}`);
      console.log(response.data)
      dispatch(fetchSingleEmployee(response.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);



/**==============Logout ======= **/
export const Logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};