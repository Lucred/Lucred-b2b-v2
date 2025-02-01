

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { updateProfile } from "../../redux/actions";
import profilePlaceholder from "../../assets/profille.png";
import { cn } from "../../utils";

const Settings = () => {
  const navigate = useNavigate();
  const company = useSelector((state: any) => state.companyProfile);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: company?.name || "",
    emailAddress: company?.emailAddress || "",
    address: company?.address || "",
    cacNumber: company?.cacNumber || "",
    payDay: company?.payDay || "",
    phoneNumber: company?.phoneNumber || "",
    totalEmployees: company?.totalEmployees || "",
    totalHR: company?.totalHR || "",
    country: company?.country || "",
    city: company?.city || "",
  });

  const dispatch = useDispatch<any>();
  const logo = localStorage.getItem("logo");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateProfile({ formData }));
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto px-4 py-6 ",
        "ml-[calc(4rem+1px)]" // Adjust for sidebar width
      )}
    >
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-muted-foreground'>Dashboard/Profile</p>
              <CardTitle>Company Information</CardTitle>
              <p className='text-sm text-muted-foreground mt-2'>
                Here you can edit information about your company
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <p className='text-sm mb-2'>Company Logo</p>
              <Avatar className='w-24 h-24 border-4 border-primary'>
                <AvatarImage
                  src={logo || profilePlaceholder}
                  alt='Company Logo'
                  className='object-cover'
                />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='name'>Company Name</Label>
                <Input
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter company name'
                />
              </div>
              <div>
                <Label htmlFor='emailAddress'>Email Address</Label>
                <Input
                  id='emailAddress'
                  name='emailAddress'
                  type='email'
                  value={formData.emailAddress}
                  onChange={handleChange}
                  placeholder='Enter email address'
                />
              </div>
              <div>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='Enter company address'
                />
              </div>
              <div>
                <Label htmlFor='cacNumber'>CAC Number</Label>
                <Input
                  id='cacNumber'
                  name='cacNumber'
                  value={formData.cacNumber}
                  onChange={handleChange}
                  placeholder='Enter CAC number'
                />
              </div>
              <div>
                <Label htmlFor='payDay'>Pay Day</Label>
                <Input
                  id='payDay'
                  name='payDay'
                  value={formData.payDay}
                  onChange={handleChange}
                  placeholder='Enter pay day'
                />
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='phoneNumber'>Contact Number</Label>
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  type='tel'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder='Enter contact number'
                />
              </div>
              <div>
                <Label htmlFor='totalEmployees'>Total Employees</Label>
                <Input
                  id='totalEmployees'
                  name='totalEmployees'
                  type='number'
                  value={formData.totalEmployees}
                  onChange={handleChange}
                  placeholder='Enter total employees'
                />
              </div>
              <div>
                <Label htmlFor='totalHR'>Total HR</Label>
                <Input
                  id='totalHR'
                  name='totalHR'
                  type='number'
                  value={formData.totalHR}
                  onChange={handleChange}
                  placeholder='Enter total HR'
                />
              </div>
              <div>
                <Label htmlFor='country'>Country</Label>
                <Input
                  id='country'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  placeholder='Enter country'
                />
              </div>
              <div>
                <Label htmlFor='city'>City</Label>
                <Input
                  id='city'
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  placeholder='Enter city'
                />
              </div>
            </div>
            <div className='col-span-full flex justify-end space-x-4 mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
