'use client';

import { useFinanceStore } from '@/hooks/use-finance-store';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, User, Mail, DollarSign, Save } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { profile, updateProfile, isLoading } = useFinanceStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: profile.username,
    email: profile.email,
    currency: profile.currency,
  });

  if (isLoading) return null;

  const handleSave = () => {
    updateProfile(formData);
    toast({
      title: 'Profile Updated',
      description: 'Your settings have been saved successfully.',
    });
  };

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full bg-[#fafafa] dark:bg-background'>
        <SidebarNav />
        <SidebarInset className='flex-1 overflow-auto'>
          <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6'>
            <SidebarTrigger />
            <div className='flex items-center gap-2 font-semibold'>
              <UserCircle className='h-4 w-4 text-primary' />
              <span>User Profile</span>
            </div>
          </header>

          <main className='p-6 max-w-2xl mx-auto space-y-6'>
            <div className='flex flex-col items-center gap-4 text-center mb-8'>
              <div className='h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-4xl font-bold border-4 border-background shadow-xl'>
                {profile.username.charAt(0)}
              </div>
              <div>
                <h1 className='text-2xl font-bold'>{profile.username}</h1>
                <p className='text-muted-foreground'>{profile.email}</p>
              </div>
            </div>

            <Card className='border-none shadow-sm'>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Update your personal information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='username' className='flex items-center gap-2'>
                    <User className='h-4 w-4 text-primary' /> Username
                  </Label>
                  <Input
                    id='username'
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-primary' /> Email Address
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='currency' className='flex items-center gap-2'>
                    <DollarSign className='h-4 w-4 text-primary' /> Preferred
                    Currency
                  </Label>
                  <Input
                    id='currency'
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className='pt-4 flex justify-end'>
                <Button
                  onClick={handleSave}
                  className='bg-primary hover:bg-primary/90'
                >
                  <Save className='h-4 w-4 mr-2' /> Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card className='border-none shadow-sm bg-destructive/5'>
              <CardHeader>
                <CardTitle className='text-destructive'>Danger Zone</CardTitle>
                <CardDescription>
                  Delete your account and all associated data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground mb-4'>
                  This action is permanent and cannot be undone. All your
                  financial history will be deleted.
                </p>
                <Button variant='destructive'>Delete Account</Button>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
