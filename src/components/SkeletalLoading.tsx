import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardInfo, getEmployeeTransactions } from "../redux/actions";
import { Users, DollarSign, CreditCard, TrendingUp } from "lucide-react";
import { formatAmount } from "../utils/serviceUtils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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

const AnalyticCardLoader = () => (
  <Card className='w-full bg-gray-100 animate-pulse'>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <Skeleton className='h-4 w-1/2' />
      <Skeleton className='h-4 w-4 rounded-full' />
    </CardHeader>
    <CardContent>
      <Skeleton className='h-8 w-3/4 mb-2' />
      <Skeleton className='h-3 w-1/2' />
    </CardContent>
  </Card>
);

const EmployeeSummaryTableLoader = () => (
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
          {[1, 2, 3, 4, 5].map((row) => (
            <TableRow key={row} className='bg-gray-100 animate-pulse'>
              {[1, 2, 3, 4, 5].map((cell) => (
                <TableCell key={cell}>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const TopTransactionsTableLoader = () => (
  <Card>
    <CardHeader>
      <CardTitle>Top Transactions</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Transaction Value</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((row) => (
            <TableRow key={row} className='bg-gray-100 animate-pulse'>
              <TableCell>
                <Skeleton className='h-10 w-10 rounded-full' />
              </TableCell>
              {[1, 2, 3, 4, 5].map((cell) => (
                <TableCell key={cell}>
                  <Skeleton className='h-4 w-full' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-4 flex justify-center'>
        <Skeleton className='h-10 w-40' />
      </div>
    </CardContent>
  </Card>
);

const DashboardHomeLoader = () => {
  const dispatch = useDispatch<any>();
  const company = useSelector((state: any) => state.company);
  const transactions = useSelector((state: any) => state.transactions);

  const [loadedSections, setLoadedSections] = useState({
    analyticsCards: false,
    employeeSummary: false,
    topTransactions: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getDashboardInfo());
        setLoadedSections((prev) => ({ ...prev, analyticsCards: true }));
      } catch (error) {
        console.error("Failed to load analytics cards", error);
      }

      try {
        await dispatch(getEmployeeTransactions());
        setLoadedSections((prev) => ({
          ...prev,
          employeeSummary: true,
          topTransactions: true,
        }));
      } catch (error) {
        console.error("Failed to load transactions", error);
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <div
      className={`bg-white ${
        window.innerWidth > 768 ? `ml-16` : `ml-16`
      } bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='container mx-auto p-4 space-y-6'>
        {/* Time Period Selector */}
        <div className='flex justify-between items-center'>
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
          {!loadedSections.analyticsCards ? (
            [1, 2, 3, 4].map((card) => <AnalyticCardLoader key={card} />)
          ) : (
            <>
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
                value={formatAmount(company?.totalDuePaymentAmount)}
              />
            </>
          )}
        </div>

        {/* Tables */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Employee Summary */}
          {!loadedSections.employeeSummary ? (
            <EmployeeSummaryTableLoader />
          ) : (
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
          )}

          {/* Top Transactions */}
          {!loadedSections.topTransactions ? (
            <TopTransactionsTableLoader />
          ) : (
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
                      <TableHead>Transaction value</TableHead>
                      <TableHead>Transaction Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions?.allEmployeesData
                      ?.slice(0, 5)
                      .map((transaction: any) => (
                        <TableRow key={transaction.name}>
                          {/* <TableCell>
                            <Avatar
                              className={`${
                                transaction.name[0] === "J"
                                  ? "bg-green-600"
                                  : "bg-orange-600"
                              }  text-white`}
                            >
                              <AvatarImage src={transaction.coverImage} />
                              <AvatarFallback>
                                {transaction.name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell> */}
                          <TableCell>{transaction.name}</TableCell>
                          <TableCell>
                            {transaction.workData?.[0]?.jobTitle}
                          </TableCell>
                          <TableCell>
                            {formatAmount(transaction.currentCredit)}
                          </TableCell>
                          <TableCell>
                            {formatAmount(transaction.type)}
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
                <div className='mt-4 flex justify-center'>
                  <Button>View All Transactions</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeLoader;
