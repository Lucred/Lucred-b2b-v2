import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Skeleton } from "../../components/ui/skeleton";
import { Loader2, Search } from "lucide-react";
import { cn } from "../../utils";
import { getEmployeeTransactions, withdraw } from "../../redux/actions";
import { formatAmount } from "../../utils/serviceUtils";
import { TransactionsState } from "../../../types/transaction";
import { Transaction } from "../../../types/transaction";

// Define interfaces for our data structures

const Transactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const transactions = useSelector(
    (state: any) => state.transactions as TransactionsState
  );
  const [isLoading, setIsLoading] = useState(true);

  // Search state with proper typing
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  // Initial data fetch
  useEffect(() => {
    setIsLoading(true);
    dispatch(getEmployeeTransactions()).finally(() => setIsLoading(false));
  }, [dispatch]);

  // Search filtering effect
  useEffect(() => {
    if (!transactions?.allEmployeesData) return;

    const filtered = transactions.allEmployeesData.filter(
      (elem: Transaction) =>
        elem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        elem.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (elem.type === "CREDIT_DEPOSIT" ? "DISBURSEMENT" : "REPAYMENT")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        elem.phoneNumber.includes(searchTerm)
    );
    setFilteredTransactions([...filtered].reverse());
  }, [searchTerm, transactions]);

  // // Process transactions with proper sorting
  // const getDisplayTransactions = (): Transaction[] => {
  //   if (!transactions?.allEmployeesData) return [];
  //   const baseData = searchTerm
  //     ? filteredTransactions
  //     : [...transactions.allEmployeesData];
  //   return baseData.sort(
  //     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  //   );
  // };

  // const displayTransactions = getDisplayTransactions();

  const LoadingTableRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-32' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-40' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-32' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-28' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-24' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-6 w-16 rounded-full' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-12' />
      </TableCell>
    </TableRow>
  );

  const cardData = [
    {
      title: "Total Credit",
      value: `${formatAmount(transactions.totalCredit)}`,
      bgColor: "bg-[#110077]",
    },
    {
      title: "Active Credit",
      value: transactions.totalActiveCredit,
      bgColor: "bg-[#32C38F]",
    },
    {
      title: "Due Payment",
      value: `${formatAmount(transactions.totalDuePayment)}`,
      bgColor: "bg-[#D72D2DB2]",
    },
  ];

  return (
    <div className={cn("mx-auto px-4 py-6", "ml-[calc(4rem+1px)]")}>
      <div className='space-y-6'>
        <div>
          <p className='text-sm text-muted-foreground'>
            Dashboard/Transactions
          </p>
          <h1 className='text-2xl font-semibold'>Transactions</h1>
        </div>

        <div className='grid md:grid-cols-3 gap-4'>
          {cardData.map(({ title, value, bgColor }) => (
            <Card key={title} className={`${bgColor} text-white`}>
              <CardContent className='pt-6'>
                <div className='text-lg font-medium'>{title}</div>
                <div className='text-2xl font-bold pt-2'>
                  {isLoading ? (
                    <div className='flex items-center space-x-2'>
                      <Loader2 className='h-6 w-6 animate-spin' />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    value
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='flex items-center justify-between space-x-4'>
          <div className='relative flex-grow'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
              size={20}
            />
            <Input
              placeholder='Search by name, email, transaction type, or phone'
              className='pl-10'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue
                placeholder={`Today (${new Date().toLocaleDateString()})`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>
                Today ({new Date().toLocaleDateString()})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Name",
                    "Email",
                    "Transaction Type",
                    "Phone No",
                    "Transaction Value",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <TableHead key={header} className='text-center'>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => <LoadingTableRow key={index} />)
                  : filteredTransactions.map(
                      (elem: Transaction, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{elem.name}</TableCell>
                          <TableCell>{elem.email}</TableCell>
                          <TableCell className='lowercase '>
                            <span
                              className={`rounded-full text-white text-[12px] px-2 py-1 ${
                                elem.type === "CREDIT_DEPOSIT"
                                  ? "bg-green-600"
                                  : "bg-[#533ae9]"
                              }`}
                            >
                              {elem.type === "CREDIT_DEPOSIT"
                                ? "DISBURSEMENT"
                                : "REPAYMENT"}
                            </span>
                          </TableCell>
                          <TableCell>{elem.phoneNumber}</TableCell>
                          <TableCell className='lg:pl-10'>
                            {formatAmount(elem.currentCredit)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`rounded-full text-white text-[12px] px-2 py-1 ${
                                elem.status === "Active"
                                  ? "bg-green-600"
                                  : "bg-red-500"
                              }`}
                            >
                              {elem.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant='link'
                              onClick={() =>
                                navigate(
                                  `/dashboard/transaction/${elem.userId}`
                                )
                              }
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
