import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  data: any;
  employees: any[];
  pendingemployees: any[];
  company: any[];
  companyProfile: any[];
  singleEmployee: any;
  transactions:any[];
  singleEmployeetransactions:any;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: {},
  employees: [],
  pendingemployees: [],
  company: [],
  companyProfile: [],
  singleEmployee: {},
  transactions:[],
  singleEmployeetransactions:{},
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCompanyDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.companyProfile = action.payload;
    },
    fetchEmployees: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.employees = action.payload;
    },
    fetchPendingEmployees: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.pendingemployees = action.payload;
    },
    fetchDataUser: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.company = action.payload;
    },
    fetchSingleEmployee : (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.singleEmployee = action.payload;
    },
    fetchTransactions : (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    fetchSingleEmployeeTransaction : (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.singleEmployeetransactions = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchCompanyDataSuccess, fetchDataSuccess, fetchEmployees, fetchPendingEmployees, fetchDataUser, fetchSingleEmployee, fetchDataFailure, fetchTransactions, fetchSingleEmployeeTransaction} = dataSlice.actions;

export default dataSlice.reducer;
