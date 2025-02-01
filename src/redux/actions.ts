import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData } from "../interface";
import {
  FormDataPost,
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
  formDataPut,
} from "../utils/axios";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
  fetchDataUser,
  fetchEmployees,
  fetchTransactions,
  fetchSingleEmployee,
  fetchCompanyDataSuccess,
  fetchPendingEmployees,
  fetchSingleEmployeeTransaction,
} from "./reducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData: LoginData, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/company/hr/login", formData);

      localStorage.setItem("userId", response.data.data.hrData._id);
      localStorage.setItem("companyId", response.data.data.companyData._id);
      localStorage.setItem("companyName", response.data.data.companyData.name);
      localStorage.setItem(
        "authcompanyId",
        response.data.data.companyData.companyId
      );
      localStorage.setItem("b2b-signature", response.data.data.token);
      localStorage.setItem("logo", response.data.data.companyData.logo);
      localStorage.setItem(
        "email",
        response.data.data.companyData.emailAddress
      );
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data.data));
      dispatch(fetchCompanyDataSuccess(response.data.data.companyData));
    } catch (error: any) {
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

      dispatch(fetchDataUser(response.data.data));
    } catch (error: any) {
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
      const response = await apiPost(
        "/company/get-employees",
        formData ? formData : ""
      );
      // console.log('response.data', response.data);
      if (formData.approvalStatus === "pending") {
        dispatch(fetchPendingEmployees(response.data.data));
      } else {
        dispatch(fetchEmployees(response.data.data));
      }
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**============== Update Employees======= **/
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, formData }: { id: any; formData: any }, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await formDataPut(`/products/${id}`, formData);
      toast.success(response.data.message);
      // window.location.reload()
    } catch (error: any) {
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
      window.location.reload();
    } catch (error: any) {
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
      const response = await formDataPut(
        `/merchants/update/${id}/logo`,
        imageData
      );
      toast.success("Profile Logo Updated");
      dispatch(fetchDataSuccess(response.data));
      window.location.reload();
    } catch (error: any) {
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
      dispatch(getCompanyDetails());
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
      const response = await apiPost(`/merchants/withdraw`, formData);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Approve Employees======= **/
export const approveEmployees = createAsyncThunk(
  "approveEmployees",
  async (formData: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost(`/company/approve-employee/`, formData);
      toast.success(response.data.message);
      dispatch(getEmployees({ approvalStatus: "approved" }));
      dispatch(getCompanyDetails());
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Reject Employees======= **/
export const rejectEmployees = createAsyncThunk(
  "rejectEmployees",
  async (formData: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost(`/company/reject-employee/`, formData);
      toast.success(response.data.message);
      dispatch(getEmployees({ approvalStatus: "approved" }));
      dispatch(getCompanyDetails());
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Company Details======= **/
export const getCompanyDetails = createAsyncThunk(
  "getCompanyDetails",
  async (_, { dispatch }) => {
    try {
      const authcompanyId = await localStorage.getItem("authcompanyId");
      dispatch(fetchDataStart);
      const response = await apiPost(`/company/company-profile`, {
        companyId: authcompanyId,
      });
      dispatch(fetchCompanyDataSuccess(response.data.data));
    } catch (error: any) {
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
      console.log(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Single Employee Transactions======= **/
export const getSingleEmployeeTransactions = createAsyncThunk(
  "getSingleEmployeeTransactions",
  async (id: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(
        `/company/employee-single-transaction/${id}`
      );
      dispatch(fetchSingleEmployeeTransaction(response.data.data));
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Single Employee======= **/
export const getSingleEmployee = createAsyncThunk(
  "getSingleEmployee",
  async (id: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/company/employee-profile/${id}`);
      dispatch(fetchSingleEmployee(response.data.data));
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);
/**==============Delete Single Transactions======= **/
export const deleteSingleEmployee = createAsyncThunk(
  "deleteSingleEmployee",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchDataStart());
      const response = await apiDelete(`/company/remove-employee/${id}`);

      // Show success message
      toast.success("Employee deleted successfully");

      // Refresh the employee list
      await dispatch(getEmployees({ approvalStatus: "approved" }));

      return response.data;
    } catch (error: any) {
      // Handle different types of error responses
      const errorMessage =
        error.response?.data?.Error ||
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete employee";

      // Display error toast
      toast.error(errorMessage);

      // Update redux state to show error
      dispatch(fetchDataFailure(errorMessage));

      return rejectWithValue(errorMessage);
    }
  }
);

/**==============Approve Credit=======  **/
export const approveCredit = createAsyncThunk(
  "approveCredit",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await apiPost(`/company/approve-credit`, formData);
      return response.data;
    } catch (error: any) {
      // Properly handle and return the error for the component to use
      return rejectWithValue(
        error.response?.data?.data?.message ||
          error.response?.data?.message ||
          "Failed to issue credit"
      );
    }
  }
);
/**==============Logout ======= **/
export const Logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
