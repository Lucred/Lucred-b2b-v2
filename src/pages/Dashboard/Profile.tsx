

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails, updateLogo } from "../../redux/actions";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../utils";

const Profile = () => {
  const [imgFile, setImgFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<any>();
  const company = useSelector((state: any) => state.companyProfile);

  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgFile(reader.result as string);
        dispatch(updateLogo(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCompanyField = (label: string, value: string | number | Date) => (
    <div className='space-y-2'>
      <Label>{label}</Label>
      <Input
        type='text'
        value={value instanceof Date ? value.toLocaleDateString() : value || ""}
        readOnly
      />
    </div>
  );

  return (
    <div
      className={cn(
        "mx-auto px-4 py-6 ",
        "ml-[calc(4rem+1px)]" // Adjust for sidebar width
      )}
    >
      <Card className=' '>
        <CardHeader className='bg-[#533ae9] text-white flex flex-row justify-between items-center mb-4'>
          <div>
            <p className='text-sm text-muted-foreground'>Dashboard/Profile</p>
            <CardTitle>Profile</CardTitle>
          </div>
          <Button className='bg-white text-[#533ae9]' asChild variant='outline'>
            <Link to='/dashboard/settings'>Edit</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col  gap-6 mb-6'>
            <div className='flex flex-col items-center md:items-start'>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileUpload}
                className='hidden'
                accept='image/*'
              />
              <Avatar className='w-32 h-32 mb-4'>
                <AvatarImage
                  src={imgFile || localStorage.getItem("logo") || undefined}
                  alt='Company Logo'
                />
                <AvatarFallback>{company?.name?.[0] || "CO"}</AvatarFallback>
              </Avatar>
              <Button
                variant='link'
                size='sm'
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Logo
              </Button>
            </div>

            <div className='grid md:grid-cols-2 gap-4 flex-grow'>
              {renderCompanyField("Company Name", company?.name || "")}
              {renderCompanyField("Email Address", company?.emailAddress || "")}
              {renderCompanyField("CAC Number", company?.cacNumber || "")}
              {renderCompanyField("Pay Day", company?.payDay || "")}
              {renderCompanyField(
                "Total Employees",
                company?.totalEmployees || 0
              )}
              {renderCompanyField("Total HR", company?.totalHR || 0)}
              {renderCompanyField("Contact Number", company?.phoneNumber || "")}
              {renderCompanyField("Country", company?.country || "")}
              {renderCompanyField("City", company?.city || "")}
              {renderCompanyField("Address", company?.address || "")}
              {renderCompanyField("Company ID", company?.companyId || "")}
              {renderCompanyField("Last Updated", new Date(company?.updatedAt))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
