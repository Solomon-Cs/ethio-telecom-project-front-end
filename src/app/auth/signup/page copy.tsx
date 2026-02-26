'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome, UserPlus, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import { useUsers } from '@/hooks/use-user';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { registerUser } = useUsers();

  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await registerUser
      .mutateAsync(formData)
      .then(() => {
        toast({
          title: 'Account Created',
          description: 'Welcome to FinTrack! You can now log in.',
        });
        setIsLoading(false);
        router.push('/auth/login');
      })
      .catch((error) => {
        toast({
          title: 'Failed to create account',
          description: error.response?.data?.error || 'Please try again.',
        });
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950 p-4 py-12'>
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none'>
        <div className='absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[150px]'></div>
        <div className='absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]'></div>
      </div>

      <div className='w-full max-w-[550px] space-y-8 relative z-10'>
        <div className='text-center space-y-2'>
          <Link
            href='/auth/login'
            className='inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4 font-bold uppercase tracking-widest'
          >
            <ArrowLeft className='mr-2 h-3 w-3' /> Back to Login
          </Link>
          <h1 className='text-3xl font-black tracking-tight'>
            Start Your Journey
          </h1>
          <p className='text-muted-foreground font-medium'>
            Join thousands of smart spenders today
          </p>
        </div>

        <Card className='border-none shadow-2xl rounded-3xl overflow-hidden glass-morphism'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-xl font-bold'>
              Register Account
            </CardTitle>
            <CardDescription>
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <form onSubmit={handleSignup} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    id='firstName'
                    placeholder='John'
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className='rounded-xl border-border/50 focus-visible:ring-primary/20'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input
                    id='lastName'
                    placeholder='Doe'
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className='rounded-xl border-border/50 focus-visible:ring-primary/20'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='middleName'>Middle Name (Optional)</Label>
                  <Input
                    id='middleName'
                    placeholder='Quincy'
                    value={formData.middleName}
                    onChange={(e) =>
                      setFormData({ ...formData, middleName: e.target.value })
                    }
                    className='rounded-xl border-border/50 focus-visible:ring-primary/20'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='username'>Username</Label>
                  <Input
                    id='username'
                    placeholder='johndoe123'
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className='rounded-xl border-border/50 focus-visible:ring-primary/20'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='name@example.com'
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='rounded-xl border-border/50 focus-visible:ring-primary/20'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Min. 4 characters'
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='rounded-xl border-border/50 focus-visible:ring-primary/20'
                />
              </div>

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
          <CardFooter className='flex justify-center border-t border-border/50 pt-6'>
            <div className='text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link
                href='/auth/login'
                className='text-primary font-black hover:underline'
              >
                Log in instead
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
