export interface Transaction {
  userId: string;
  name: string;
  email: string;
  type: "CREDIT_DEPOSIT" | "REPAYMENT";
  phoneNumber: string;
  currentCredit: number;
  status: "Active" | "Inactive";
  date: string;
}

export interface TransactionsState {
  allEmployeesData: Transaction[];
  totalCredit: number;
  totalActiveCredit: number;
  totalDuePayment: number;
}
