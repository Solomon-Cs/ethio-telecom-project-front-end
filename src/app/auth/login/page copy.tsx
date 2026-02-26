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
import { Github, Chrome, LogIn, ArrowRight, Wallet, Lock, User } from 'lucide-react';
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
        {/* Centered Card */}
        <Card className="relative z-10 w-full  max-w-md rounded-3xl border border-border/40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl">

          {/* Header */}
          <CardHeader className="space-y-4 text-center pb-2">
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10">
              <Wallet className="h-7 w-7 text-primary" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Welcome Back
              </h1>
              <CardDescription className="text-sm">
                Sign in to your Personal Finance Tracker
              </CardDescription>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="pt-6">
            <form onSubmit={handleCredentialsLogin} className="space-y-5">

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all duration-300"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-4 pt-6 border-t border-border/40">
            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?
              <Link
                href="/auth/signup"
                className="ml-1 text-primary font-semibold hover:underline inline-flex items-center"
              >
                Create one
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
