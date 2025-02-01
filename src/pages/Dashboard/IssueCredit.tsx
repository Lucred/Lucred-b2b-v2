import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  approveCredit,
  getSingleEmployee,
  getEmployees,
} from "../../redux/actions";
import { formatAmount } from "../../utils/serviceUtils";
import { cn } from "../../utils";
import { Employee } from "@/interface";
import { MoveLeft, Calculator, Calendar, CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";

const IssueCredit = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const [formData, setFormData] = useState({
    amount: "",
    duration: 0,
  });
  const [compoundInterest, setCompoundInterest] = useState(0);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  const singleEmployee = useSelector((state: any) => state.singleEmployee);

  const durations = [1, 2, 3, 4, 5, 6];
  const annualInterestRate = 0.04;
  const compoundingPeriodsPerYear = 12;

  const calculateCompoundInterest = () => {
    if (!formData.amount || !formData.duration) return;

    const monthlyInterestRate = annualInterestRate / compoundingPeriodsPerYear;
    const totalCompoundingPeriods =
      compoundingPeriodsPerYear * +formData.duration;
    const futureValue =
      +formData.amount *
      Math.pow(1 + monthlyInterestRate, totalCompoundingPeriods);
    const interest = futureValue - +formData.amount;
    setCompoundInterest(parseFloat(interest.toFixed(2)));
    setShowSummary(true);
  };

  const findDueDate = () => {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + +formData.duration,
      currentDate.getDate()
    );
    return futureDate.toDateString();
  };

  const handleConfirmCredit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = {
        userId: employeeId,
        creditAmount: +formData.amount,
        creditDuration: +formData.duration,
        monthlyRepayment: +(
          (+compoundInterest + +formData.amount) /
          formData.duration
        ).toFixed(2),
        totalCreditPayment: +formData.amount + +compoundInterest,
        startDate: new Date().toISOString().split("T")[0],
      };

      const result = await dispatch(approveCredit(payload)).unwrap();
      toast.success(
        result.data?.message || result.message || "Credit issued successfully"
      );
      setFormData({ amount: "", duration: 0 });
      setCompoundInterest(0);
      setShowSummary(false);
    } catch (error: any) {
      toast.error(typeof error === "string" ? error : "Failed to issue credit");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      dispatch(getSingleEmployee(employeeId));
    }
    dispatch(getEmployees({ approvalStatus: "pending" }));
  }, [employeeId, dispatch]);

  useEffect(() => {
    if (singleEmployee) {
      setCurrentEmployee(singleEmployee);
    }
  }, [singleEmployee]);

  useEffect(() => {
    if (formData.amount && formData.duration) {
      calculateCompoundInterest();
    }
  }, [formData]);

  return (
    <div className={cn("mx-auto px-4 py-6", "ml-[calc(4rem+1px)]")}>
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <MoveLeft
            onClick={() => navigate(-1)}
            className='h-6 w-6 cursor-pointer'
          />
          <div>
            <p className='text-sm text-muted-foreground'>
              Dashboard/Issue Credit
            </p>
            <h1 className='text-2xl font-semibold'>Issue Credit</h1>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Credit Request</CardTitle>
              <CardDescription>
                Enter credit details to calculate repayment terms
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='amount'>Amount of Credit Request</Label>
                  <div className='relative'>
                    <CreditCard className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      id='amount'
                      type='number'
                      className='pl-8'
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                      placeholder='Enter credit amount'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='duration'>Payment Duration</Label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        duration: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger id='duration' className='w-full'>
                      <SelectValue placeholder='Select duration' />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration.toString()}>
                          {duration} Month{duration !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {compoundInterest > 0 && showSummary && (
                <Card className='bg-secondary'>
                  <CardHeader>
                    <CardTitle className='text-lg'>Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Calculator className='h-4 w-4' />
                            <Label>Monthly Payment</Label>
                          </div>
                          <p className='text-lg font-semibold'>
                            {formatAmount(
                              (
                                (+compoundInterest + +formData.amount) /
                                formData.duration
                              ).toFixed(2)
                            )}
                          </p>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <Label>Due Date</Label>
                          </div>
                          <p className='text-lg font-semibold'>
                            {findDueDate()}
                          </p>
                        </div>
                      </div>

                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className='font-medium'>
                              Credit Amount
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatAmount(formData.amount)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className='font-medium'>
                              Interest
                            </TableCell>
                            <TableCell className='text-right'>
                              {formatAmount(compoundInterest)}
                            </TableCell>
                          </TableRow>
                          <TableRow className='font-semibold'>
                            <TableCell>Total Return</TableCell>
                            <TableCell className='text-right'>
                              {formatAmount(
                                (+compoundInterest + +formData.amount).toFixed(
                                  2
                                )
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Button
                        className='w-full shadow-md bg-[#533ae9] text-white'
                        onClick={handleConfirmCredit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Confirm Credit"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {currentEmployee && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Employee details and credit history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {[
                      {
                        label: "Full Name",
                        value: `${currentEmployee?.firstName} ${currentEmployee.lastName}`,
                      },
                      { label: "Job Title", value: currentEmployee.jobTitle },
                      { label: "Email", value: currentEmployee.email },
                      { label: "Salary", value: `₦${currentEmployee.salary}` },
                      {
                        label: "Credit Date",
                        value: currentEmployee.creditDate,
                      },
                      {
                        label: "Phone Number",
                        value: currentEmployee.phoneNumber,
                      },
                      {
                        label: "Total Credit Collected",
                        value: formatAmount(currentEmployee.collectedCredit),
                      },
                    ].map(({ label, value }) => (
                      <TableRow key={label}>
                        <TableCell className='font-medium'>{label}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueCredit;
