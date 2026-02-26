'use client';

import { useToast } from '@/hooks/use-toast';
import { useUsers } from '@/hooks/use-user';
import { Wallet, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from '@/components/ui/card';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface SignupFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { registerUser } = useUsers();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({ mode: 'onChange' });

  const onSubmit = async (data: SignupFormData) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Confirm Password does not match Password.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await registerUser.mutateAsync(data);
      toast({
        title: 'Account Created',
        description: 'Welcome to FinTrack! You can now log in.',
      });
      router.push('/auth/login');
    } catch (error: any) {
      toast({
        title: 'Failed to create account',
        description: error.response?.data?.error || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative flex w-full   items-center justify-center  bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900'>
      {/* Background Blurs */}
      <div className='absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-30 pointer-events-none'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl opacity-30 pointer-events-none'></div>

      {/* Centered Card */}
      <div className='relative z-10 w-full max-w-[550px] space-y-8'>
        <Card className='border-none shadow-2xl mt-14 rounded-3xl overflow-hidden glass-morphism bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl'>
          {/* Header */}
          <CardHeader className='space-y-4 text-center pb-3'>
            <div className='mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10'>
              <Wallet className='h-7 w-7 text-primary' />
            </div>

            <div className='space-y-1'>
              <h1 className='text-2xl font-bold tracking-tight'>
                Welcome Back
              </h1>
              <CardDescription className='text-sm'>
                Sign in to Personal Finance Tracker
              </CardDescription>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className='space-y-6'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {/* First & Middle Name */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    id='firstName'
                    placeholder='first name'
                    {...register('firstName', {
                      required: 'First Name is required',
                    })}
                    className='rounded-xl border-primary/50 focus-visible:ring-primary/20'
                  />
                  {errors.firstName && (
                    <p className='text-xs text-red-500'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='middleName'>Middle Name</Label>
                  <Input
                    id='middleName'
                    placeholder="father's name"
                    {...register('middleName')}
                    className='rounded-xl  border-primary/50 focus-visible:ring-primary/20'
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  id='lastName'
                  placeholder="Grandfathers's Name "
                  {...register('lastName', {
                    required: 'Last Name is required',
                  })}
                  className='rounded-xl    border-primary/50 focus-visible:ring-primary/20'
                />
                {errors.lastName && (
                  <p className='text-xs text-red-500'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Username & Email */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='username'>Username</Label>
                  <Input
                    id='username'
                    placeholder='username'
                    {...register('username', {
                      required: 'Username is required',
                    })}
                    className='rounded-xl  border-primary/50 focus-visible:ring-primary/20'
                  />
                  {errors.username && (
                    <p className='text-xs text-red-500'>
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='example@example.com'
                    {...register('email', { required: 'Email is required' })}
                    className='rounded-xl border-primary/50 focus-visible:ring-primary/20'
                  />
                  {errors.email && (
                    <p className='text-xs text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Min. 4 characters'
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 4,
                        message: 'Password must be at least 4 characters',
                      },
                    })}
                    className='rounded-xl  border-primary/50 focus-visible:ring-primary/20'
                  />
                  {errors.password && (
                    <p className='text-xs text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    placeholder='Confirm your password'
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: (value) => {
                        console.log('🚀 ~ SignupPage ~ value:', value);
                        return (
                          value === watch('password') ||
                          'Passwords do not match'
                        );
                      },
                    })}
                    className='rounded-xl border-primary/50 focus-visible:ring-primary/20'
                  />
                  {errors.confirmPassword && (
                    <p className='text-xs text-red-500'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <Button
                type='submit'
                className='w-full rounded-xl h-11 font-bold shadow-lg shadow-primary/20 mt-4'
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
                <UserPlus className='ml-2 h-4 w-4' />
              </Button>
            </form>
          </CardContent>

          {/* Footer */}
          <CardFooter className='flex justify-center border-t border-border/50 pt-1'>
            <div className='text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link
                href='/auth/login'
                className='text-primary font-black hover:underline'
              >
                Log in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
