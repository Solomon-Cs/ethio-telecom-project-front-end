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
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, ArrowRight, User, Lock, Wallet } from 'lucide-react';
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

      if (!result || result.error || !result.ok) {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid username or password.',
        });
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
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
    <div className="relative flex w-full h-full items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900">

      {/* Background Blur Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      {/* Centered Card */}
      <Card className="relative z-10 w-full max-w-md rounded-3xl border border-border/40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl">

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
              log in to your Personal Finance Tracker
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
              {isLoading ? 'Login in...' : 'Login'}
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
  );
}