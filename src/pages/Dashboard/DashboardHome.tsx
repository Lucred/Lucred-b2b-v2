import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import {
  HelpCircle,
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "../../utils/serviceUtils";
import { getDashboardInfo, getEmployeeTransactions } from "../../redux/actions";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import DashboardHomeLoader from "../../components/SkeletalLoading";
import { Link } from "react-router-dom";
import { TransactionsState } from "../../../types/transaction";

const AnalyticCard = ({
  icon: Icon,
  title,
  value,
  percentage,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  percentage?: number;
}) => (
  <Card className='w-full'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>{title}</CardTitle>
      <Icon className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl text-[#533ae9] font-bold'>{value}</div>
      {percentage && (
        <p className='text-xs text-muted-foreground'>
          +{percentage}% from last month
        </p>
      )}
    </CardContent>
  </Card>
);

const DashboardHome = () => {
  const dispatch = useDispatch<any>();
  const company = useSelector((state: any) => state.company);
  const transactions = useSelector(
    (state: any) => state.transactions as TransactionsState
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        dispatch(getDashboardInfo()),
        dispatch(getEmployeeTransactions()),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return <DashboardHomeLoader />;
  }

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-16` : `ml-16`
      }  bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='container mx-auto p-4 space-y-6'>
        {/* Time Period Selector */}
        <div className='flex justify-between items-center'>
          <div className='hidden  space-x-4'>
            {["Last 24 hours", "Last week", "Last month", "Last year"].map(
              (period) => (
                <Button variant='ghost' key={period}>
                  {period}
                </Button>
              )
            )}
          </div>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Today' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>Today (March 18, 2024)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Analytics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <AnalyticCard
            icon={Users}
            title='Total Employees'
            value={company?.totalEmployees?.toString() || "0"}
            percentage={13}
          />
          <AnalyticCard
            icon={DollarSign}
            title='Days Until Next Payment'
            value={company?.daysTillPayDay?.toString() || "0"}
          />
          <AnalyticCard
            icon={CreditCard}
            title='Total Credit'
            value={formatAmount(company?.totalNumberOfCreditAmount)}
            percentage={20}
          />
          <AnalyticCard
            icon={TrendingUp}
            title='Due Payment'
            value={formatAmount(transactions?.totalDuePayment)}
          />
        </div>

        {/* Tables */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Employee Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Pay</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {company?.employeesSummary?.map((employee: any) => (
                    <TableRow key={employee.email}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.jobTitle}</TableCell>
                      <TableCell>₦{employee.pay}</TableCell>
                      <TableCell className='text-green-500'>
                        {employee.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Top Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead>Image</TableHead> */}
                    <TableHead>Name</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Transaction Value</TableHead>
                    <TableHead>Transaction Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.allEmployeesData

                    ?.slice(1, 6)
                    .reverse()
                    .map((transaction: any) => (
                      <TableRow key={transaction.name}>
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell>
                          {transaction.workData?.[0]?.jobTitle}
                        </TableCell>
                        <TableCell>
                          {formatAmount(transaction.currentCredit)}
                        </TableCell>
                        <TableCell className='lowercase'>
                          <span
                            className={`rounded-full text-white text-[12px] px-2 py-1 ${
                              transaction.type === "CREDIT_DEPOSIT"
                                ? "bg-green-600"
                                : "bg-[#533ae9]"
                            }`}
                          >
                            {transaction.type === "CREDIT_DEPOSIT"
                              ? "DISBURSEMENT"
                              : "REPAYMENT"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`rounded-full text-white text-[12px] px-2 py-1 ${
                              transaction.status === "Active"
                                ? "bg-green-600"
                                : "bg-red-500"
                            } `}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Link
                to={"/dashboard/transaction"}
                className='mt-4 flex justify-center'
              >
                <Button>View All Transactions</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
