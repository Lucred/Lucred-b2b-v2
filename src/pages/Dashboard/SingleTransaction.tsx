import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { Progress } from "../../components/ui/progress";
import { Skeleton } from "../../components/ui/skeleton";
import { getSingleEmployeeTransactions } from "../../redux/actions";
import { formatAmount, formatDate } from "../../utils/serviceUtils";
import { cn } from "../../utils";
import { MoveLeft } from "lucide-react";

const SingleTransaction = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { userId } = useParams();
  const singleEmployeetransactions = useSelector(
    (state: any) => state.singleEmployeetransactions
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      dispatch(getSingleEmployeeTransactions(userId)).finally(() =>
        setIsLoading(false)
      );
    }
  }, [userId, dispatch]);

  const trnxData = [
    {
      title: "Credit Funded",
      progress: singleEmployeetransactions?.creditFunded,
      total: singleEmployeetransactions?.creditFunded,
      isAmount: true,
    },
    {
      title: "Interest Rate",
      progress: (
        ((singleEmployeetransactions?.amountTobePaid -
          singleEmployeetransactions?.creditFunded) /
          singleEmployeetransactions?.creditFunded) *
        100
      )?.toFixed(2),
      total: 100,
      isAmount: false,
    },
    {
      title: "Amount to be paid",
      progress: singleEmployeetransactions?.amountTobePaid,
      total: singleEmployeetransactions?.amountTobePaid,
      isAmount: true,
    },
    {
      title: "Credit Tenure",
      progress: singleEmployeetransactions?.creditTenure,
      total: 12,
      isAmount: false,
    },
  ];

  const LoadingCreditSummary = () => (
    <div className='space-y-4'>
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className='space-y-2'>
          <div className='flex justify-between items-center'>
            <Skeleton className='bg-gray-100 animate-pulse h-4 w-24' />
            <Skeleton className='bg-gray-100 animate-pulse h-4 w-16' />
          </div>
          <Skeleton className='bg-gray-100 animate-pulse h-2 w-full' />
        </div>
      ))}
    </div>
  );

  const LoadingPaymentSchedule = () => (
    <div className='space-y-4 w-full'>
      {[1, 2, 3].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className='bg-gray-100 animate-pulse h-4 w-32' />
          </TableCell>
          <TableCell>
            <Skeleton className='bg-gray-100 animate-pulse h-4 w-24' />
          </TableCell>
          <TableCell>
            <Skeleton className='bg-gray-100 animate-pulse h-4 w-24' />
          </TableCell>
          <TableCell>
            <Skeleton className='bg-gray-100 animate-pulse h-4 w-20' />
          </TableCell>
        </TableRow>
      ))}
    </div>
  );

  return (
    <div className={cn("mx-auto px-4 py-6", "ml-[calc(4rem+1px)]")}>
      <div className='space-y-6'>
        <MoveLeft
          size={32}
          onClick={() => navigate(-1)}
          className='cursor-pointer'
        />
        <div>
          <p className='text-sm text-muted-foreground'>
            Dashboard/Transactions
          </p>
          <h1 className='text-2xl font-semibold'>Transactions</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Credit Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingCreditSummary />
            ) : (
              trnxData?.map((trnx, index) => (
                <div key={index} className='space-y-2 mb-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-primary'>{trnx.title}</span>
                    <span className='text-primary'>
                      {trnx.isAmount
                        ? formatAmount(trnx.progress)
                        : index === 1
                        ? `${trnx.progress}%`
                        : `${trnx.progress} months`}
                    </span>
                  </div>
                  <Progress
                    value={(trnx.progress / trnx.total) * 100}
                    className='h-2'
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DUE ON</TableHead>
                  <TableHead>TOTAL PAYMENT</TableHead>
                  <TableHead>MONTHLY PAYMENT</TableHead>
                  <TableHead>PAYMENT STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <LoadingPaymentSchedule />
                ) : (
                  singleEmployeetransactions?.paymentSchedule?.map(
                    (elem: any, id: string) => (
                      <TableRow key={id}>
                        <TableCell>
                          {formatDate(elem.date, "longDateTime")}
                        </TableCell>
                        <TableCell>{formatAmount(elem.amount)}</TableCell>
                        <TableCell>
                          {formatAmount(elem.pendingBalance)}
                        </TableCell>
                        <TableCell>{elem.paymentStatus}</TableCell>
                      </TableRow>
                    )
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

export default SingleTransaction;
