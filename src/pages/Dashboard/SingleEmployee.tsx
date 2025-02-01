import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { getSingleEmployee } from "../../redux/actions";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import { cn } from "../../utils";
import { MoveLeft } from "lucide-react";

const SingleEmployee = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const singleEmployee = useSelector((state: any) => state.singleEmployee);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (employeeId) {
      setIsLoading(true);
      dispatch(getSingleEmployee(employeeId)).finally(() =>
        setIsLoading(false)
      );
    }
  }, [employeeId, dispatch]);

  const employeeFields = [
    { label: "First Name", value: singleEmployee?.firstName },
    { label: "Last Name", value: singleEmployee?.lastName },
    { label: "Job Title", value: singleEmployee?.jobTitle },
    { label: "Phone Number", value: singleEmployee?.phoneNumber },
    { label: "Company", value: singleEmployee?.company },
    { label: "Received Credit", value: singleEmployee?.collectedCredit },
    { label: "Credit Date", value: singleEmployee?.creditDate },
  ];

  const LoadingHeader = () => (
    <div>
      <p className='text-sm text-muted-foreground'>Dashboard/Employee</p>
      <Skeleton className='bg-gray-100 animate-pulse h-8 w-48 mt-1' />
    </div>
  );

  const LoadingField = () => (
    <div>
      <Skeleton className='bg-gray-100 animate-pulse h-4 w-24 mb-2' />
      <Skeleton className='bg-gray-100 animate-pulse h-10 w-full' />
    </div>
  );

  return (
    <div className={cn("mx-auto px-4 py-6", "ml-[calc(4rem+1px)]")}>
      <div className='space-y-4'>
        <MoveLeft
          size={32}
          onClick={() => navigate(-1)}
          className='cursor-pointer'
        />
        {isLoading ? (
          <LoadingHeader />
        ) : (
          <div>
            <p className='text-sm text-muted-foreground'>Dashboard/Employee</p>
            <h1 className='text-2xl font-semibold'>
              {singleEmployee?.firstName} {singleEmployee?.lastName}
            </h1>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-6'>
              {isLoading
                ? Array(7)
                    .fill(0)
                    .map((_, index) => <LoadingField key={index} />)
                : employeeFields.map(({ label, value }) => (
                    <div key={label}>
                      <Label>{label}</Label>
                      <Input
                        type='text'
                        value={value || ""}
                        readOnly
                        className='mt-2'
                      />
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SingleEmployee;
