import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, MoveLeft } from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

import { approveEmployees, getEmployees } from "../../redux/actions";
import { cn } from "../../utils";

const PendingApproval: React.FC = () => {
  const dispatch = useDispatch() as unknown as any;
  const navigate = useNavigate();
  const [currentEmployee, setCurrentEmployee] = useState<any>(null);

  const employees = useSelector((state: any) => state.pendingemployees);

  useEffect(() => {
    dispatch(getEmployees({ approvalStatus: "pending" }));
  }, [dispatch]);

  useEffect(() => {
    setCurrentEmployee(employees?.[0]);
  }, [employees]);

  const handleViewEmployeeData = (item: any) => {
    setCurrentEmployee(item);
  };

  const handleEmployeeAction = async (action: "approve" | "reject") => {
    if (!currentEmployee) return;

    const formData = {
      workProfileId: currentEmployee.workData?._id,
      employeeId: currentEmployee.id,
    };

    await dispatch(approveEmployees(formData));
    navigate(-1);
  };

  return (
    <div
      className={cn(
        "mx-auto px-4 py-6",
        "ml-[calc(4rem+1px)]" // Adjust for sidebar width
      )}
    >
      <div className='space-y-4'>
        <div>
          <MoveLeft
            size={32}
            onClick={() => navigate(-1)}
            className='cursor-pointer'
          />
          <p className='text-sm text-muted-foreground'>
            Dashboard / Pending Approval
          </p>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Pending Approval
          </h2>
        </div>

        <div className='flex flex-col lg:flex-row gap-6 justify-between'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees?.map((emp: any) => (
                  <TableRow
                    key={emp.id}
                    onClick={() => handleViewEmployeeData(emp)}
                  >
                    <TableCell>
                      <Avatar className='rounded-full bg-green-700 text-white'>
                        <AvatarImage src={emp.coverImage} alt={emp.name} />
                        <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.workData?.jobTitle}</TableCell>
                    <TableCell>₦{emp.workData?.workSalary}</TableCell>
                    <TableCell>{emp.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge variant='outline'>
                        {emp.workData?.employmentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Eye
                        className='h-4 w-4'
                        onClick={() => handleViewEmployeeData(emp)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {currentEmployee && (
            <Card className='w-full lg:w-[40%]'>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <p className='text-sm text-muted-foreground'>Full Name</p>
                  <p className='text-primary'>{currentEmployee.name}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Job Title</p>
                  <p className='text-primary'>
                    {currentEmployee.workData?.jobTitle}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Personal Email
                  </p>
                  <p className='text-primary'>{currentEmployee.email}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Official Email
                  </p>
                  <p className='text-primary'>
                    {currentEmployee.workData?.employeeEmailAddress}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Phone Number</p>
                  <p className='text-primary'>{currentEmployee.phoneNumber}</p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Income</p>
                  <p className='text-primary'>
                    ₦{currentEmployee.workData?.workSalary}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>Status</p>
                  <p className='text-primary'>
                    {currentEmployee.workData?.employmentStatus}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Proof of Employment
                  </p>
                  <a
                    href={currentEmployee.workData?.proofOfWork}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    View Document
                  </a>
                </div>
                <div className='flex space-x-4'>
                  <Button
                    className='bg-red-500'
                    variant='ghost'
                    onClick={() => handleEmployeeAction("reject")}
                  >
                    Reject
                  </Button>
                  <Button
                    className='bg-[#533ae9]'
                    variant={"ghost"}
                    onClick={() => handleEmployeeAction("approve")}
                  >
                    Accept
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
