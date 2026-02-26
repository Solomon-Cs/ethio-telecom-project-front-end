'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
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
import { Github, Chrome, LogIn, ArrowRight, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      console.log('🚀 ~ handleCredentialsLogin ~ result:', result);

      if (result?.error || !result?.ok || result === null) {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid username or password. Please try again.',
        });
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950 p-4'>
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none'>
        <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]'></div>
        <div className='absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]'></div>
      </div>

      <div className='w-full max-w-[450px] space-y-8 relative z-10'>
        <Card className='border-none shadow-2xl rounded-3xl overflow-hidden glass-morphism'>
          <CardHeader className='space-y-1'>
            <div className='text-center space-y-2'>
              <h1 className='text-xl font-black tracking-tight'>
                Welcome Back
              </h1>
              <p className='text-muted-foreground font-medium'>
                Personal Finance Tracker
              </p>
            </div>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <form onSubmit={handleCredentialsLogin} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  placeholder='Username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='rounded-xl border-primary/50 focus-visible:ring-primary/20'
                />
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                  <Link
                    href='#'
                    className='text-xs text-primary font-bold hover:underline'
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='rounded-xl border-primary/50 focus-visible:ring-primary/20'
                />
              </div>
              <Button
                type='submit'
                className='w-full rounded-xl h-11 font-bold shadow-lg shadow-primary/20'
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
                <LogIn className='ml-2 h-4 w-4' />
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex flex-col gap-4 border-t border-border/50 pt-6'>
            <div className='text-sm text-center text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <Link
                href='/auth/signup'
                className='text-primary font-black hover:underline inline-flex items-center'
              >
                Create an account <ArrowRight className='ml-1 h-3 w-3' />
              </Link>
            </div>
          </CardFooter>
        </Card>

        <p className='text-center text-xs text-muted-foreground px-8 font-medium'>
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
