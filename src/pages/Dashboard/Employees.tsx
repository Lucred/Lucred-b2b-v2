// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Search, Eye, Edit, Trash2 } from "lucide-react";

// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "../../components/ui/dialog";
// import {
//   Avatar,
//   AvatarImage,
//   AvatarFallback,
// } from "../../components/ui/avatar";
// import { Badge } from "../../components/ui/badge";

// import { deleteSingleEmployee, getEmployees } from "../../redux/actions";
// import { cn } from "../../utils";

// const Employees: React.FC = () => {
//   const dispatch = useDispatch() as unknown as any;
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [currentId, setCurrentId] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const employees = useSelector((state: any) => state.employees);

//   useEffect(() => {
//     dispatch(getEmployees({ approvalStatus: "approved" }));
//     dispatch(getEmployees({ approvalStatus: "pending" }));
//   }, [dispatch]);

//   const deleteEmployee = (id: string) => {
//     setCurrentId(id);
//     setShowConfirmation(true);
//   };

//   const handleConfirm = async () => {
//     await dispatch(deleteSingleEmployee(currentId));
//     setShowConfirmation(false);
//   };

//   const filteredEmployees = employees?.filter(
//     (emp: any) =>
//       emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className={cn(`${window.innerWidth > 768 ? `ml-16` : `ml-16`} `)}>
//       <div className='space-y-4'>
//         <div className='ml-4'>
//           <p className='text-sm text-muted-foreground '>Dashboard / Employee</p>
//           <h2 className='text-2xl font-semibold tracking-tight'>Employees</h2>
//         </div>

//         <div className='bg-white rounded-lg shadow-sm p-6 space-y-4'>
//           <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0'>
//             <div className='w-full md:w-1/2 relative'>
//               <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
//               <Input
//                 placeholder='Search employees'
//                 className='pl-10'
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className='flex space-x-2'>
//               <Button asChild variant='outline'>
//                 <Link to='/dashboard/pending-approvals'>Pending Approval</Link>
//               </Button>
//             </div>
//           </div>

//           <div className='overflow-x-auto'>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Photo</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Job Title</TableHead>
//                   <TableHead>Income</TableHead>
//                   <TableHead>Phone</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredEmployees?.map((emp: any) => (
//                   <TableRow key={emp.id}>
//                     <TableCell>
//                       <Avatar
//                         className={`${
//                           emp.name[0] === "J" ? "bg-green-600" : "bg-orange-600"
//                         }  text-white`}
//                       >
//                         <AvatarImage src={emp.coverImage} alt={emp.name} />
//                         <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                     </TableCell>
//                     <TableCell>{emp.name}</TableCell>
//                     <TableCell>{emp.email}</TableCell>
//                     <TableCell>{emp.workData?.jobTitle}</TableCell>
//                     <TableCell>₦{emp.workData?.workSalary}</TableCell>
//                     <TableCell>{emp.phoneNumber}</TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           emp.workData?.employmentStatus === "Active"
//                             ? "default"
//                             : "destructive"
//                         }
//                       >
//                         {emp.workData?.employmentStatus}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className='flex space-x-3'>
//                         <Link to={`/dashboard/employees/${emp.id}`}>
//                           <Eye className='h-4 w-4' />
//                         </Link>
//                         <Link to={`/dashboard/issue-credit/${emp.id}`}>
//                           <Edit className='h-4 w-4' />
//                         </Link>

//                         <Trash2
//                           onClick={() => deleteEmployee(emp.id)}
//                           className='h-4 w-4 text-destructive'
//                         />
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </div>

//       <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this employee?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant='outline'
//               onClick={() => setShowConfirmation(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant='destructive' onClick={handleConfirm}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Employees;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, Eye, Edit, Trash2, Loader2 } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

import { deleteSingleEmployee, getEmployees } from "../../redux/actions";
import { cn } from "../../utils";

const Employees: React.FC = () => {
  const dispatch = useDispatch() as unknown as any;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const employees = useSelector((state: any) => state.employees);
  const error = useSelector((state: any) => state.error);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      dispatch(getEmployees({ approvalStatus: "approved" })),
      dispatch(getEmployees({ approvalStatus: "pending" })),
    ]).finally(() => setIsLoading(false));
  }, [dispatch]);

  const deleteEmployee = (id: string) => {
    setCurrentId(id);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deleteSingleEmployee(currentId)).unwrap();
      setShowConfirmation(false);
    } catch (error: any) {
      // Error is already handled by the thunk
      console.error("Delete operation failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  const filteredEmployees = employees?.filter(
    (emp: any) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const LoadingTableRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-10 w-10 rounded-full' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-32' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-40' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-28' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-24' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-28' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-6 w-20 rounded-full' />
      </TableCell>
      <TableCell>
        <div className='flex space-x-3'>
          <Skeleton className='bg-gray-100 animate-pulse h-4 w-4' />
          <Skeleton className='bg-gray-100 animate-pulse h-4 w-4' />
          <Skeleton className='bg-gray-100 animate-pulse h-4 w-4' />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className={cn(`${window.innerWidth > 768 ? `ml-16` : `ml-16`} `)}>
      <div className='space-y-4'>
        <div className='ml-4'>
          <p className='text-sm text-muted-foreground'>Dashboard / Employee</p>
          <h2 className='text-2xl font-semibold tracking-tight'>Employees</h2>
        </div>

        <div className='bg-white rounded-lg shadow-sm p-6 space-y-4'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0'>
            <div className='w-full md:w-1/2 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder='Search employees'
                className='pl-10'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex space-x-2'>
              <Button asChild variant='outline'>
                <Link to='/dashboard/pending-approvals'>Pending Approval</Link>
              </Button>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => <LoadingTableRow key={index} />)
                  : filteredEmployees?.map((emp: any) => (
                      <TableRow key={emp.id}>
                        <TableCell>
                          <Avatar
                            className={`${
                              emp.name[0] === "J"
                                ? "bg-green-600"
                                : "bg-orange-600"
                            } text-white`}
                          >
                            <AvatarImage src={emp.coverImage} alt={emp.name} />
                            <AvatarFallback>
                              {emp.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>{emp.name}</TableCell>
                        <TableCell>{emp.email}</TableCell>
                        <TableCell>{emp.workData?.jobTitle}</TableCell>
                        <TableCell>₦{emp.workData?.workSalary}</TableCell>
                        <TableCell>{emp.phoneNumber}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              emp.workData?.employmentStatus === "Active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {emp.workData?.employmentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className='flex space-x-3'>
                            <Link to={`/dashboard/employees/${emp.id}`}>
                              <Eye className='h-4 w-4' />
                            </Link>
                            <Link to={`/dashboard/issue-credit/${emp.id}`}>
                              <Edit className='h-4 w-4' />
                            </Link>
                            <Trash2
                              onClick={() => deleteEmployee(emp.id)}
                              className='h-4 w-4 text-destructive'
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowConfirmation(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
