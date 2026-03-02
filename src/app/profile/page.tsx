'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, Save, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUsers } from '@/hooks/use-user';

const profileFormSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

interface ProfileCardProps {
  onUpdate?: (data: ProfileFormData) => Promise<void>;
}

const ProfileCard = ({ onUpdate }: ProfileCardProps) => {
  const { data: session } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    user,
    isLoading: usersLoading,
    updateUser,
    error,
  } = useUsers(session?.user?.id as string);

  const profile = user;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      username: '',
      email: '',
    },
  });

  // Reset form when session loads
  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName || '',
        middleName: profile.middleName || '',
        lastName: profile.lastName || '',
        username: profile.username || '',
        email: profile.email || '',
      });
    }
  }, [profile, user, isEditing, form]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await updateUser.mutateAsync({ id: profile?.id as string, data });
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const initials = `${user?.firstName?.[0] ?? ''}${
    user?.middleName?.[0] ?? ''
  }`.toUpperCase();

  return (
    <div className='w-full'>
      <Card className='w-full shadow-xl border-0 rounded-2xl overflow-hidden'>
        {/* Header Section */}
        <div className='w-full bg-gradient-to-r from-primary/90 to-primary-500 p-8 text-white'>
          <div className='flex flex-col md:flex-row md:items-center gap-6'>
            <Avatar className='h-24 w-24 border-4 border-white shadow-lg'>
              <AvatarImage
                src={' '}
                alt={`${user?.firstName} ${user?.middleName}`}
              />
              <AvatarFallback className='text-2xl font-bold bg-primary'>
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 space-y-1'>
              <h1 className='text-3xl font-bold'>
                {user?.firstName} {user?.lastName}
              </h1>
              <p className='opacity-90'> User Name: {user?.username}</p>
              <p className='opacity-80 text-sm'>Email: {user?.email}</p>
            </div>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                type='button'
                variant='outline'
                className='gap-2 bg-primary'
              >
                <Pencil className='h-4 w-4' />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Body */}
        <CardContent className='p-8 pb-40 '>
          <AnimatePresence mode='wait'>
            {isEditing ? (
              <motion.div
                key='edit'
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='middleName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <FormField
                        control={form.control}
                        name='lastName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type='email'
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-3 pt-6 border-t'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        <X className='h-4 w-4 mr-2' />
                        Cancel
                      </Button>

                      <Button
                        type='submit'
                        disabled={isLoading}
                        className='min-w-[130px]'
                      >
                        <Save className='h-4 w-4 mr-2' />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key='view'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className='grid grid-cols-1 md:grid-cols-2 gap-8'
              >
                <div>
                  <Label className='text-xs uppercase text-muted-foreground'>
                    First Name
                  </Label>
                  <p className='mt-2 text-lg font-medium'>{user?.firstName}</p>
                </div>

                <div>
                  <Label className='text-xs uppercase text-muted-foreground'>
                    Middle Name
                  </Label>
                  <p className='mt-2 text-lg font-medium'>{user?.middleName}</p>
                </div>

                <div>
                  <Label className='text-xs uppercase text-muted-foreground'>
                    Last Name
                  </Label>
                  <p className='mt-2 text-lg font-medium'>{user?.lastName}</p>
                </div>

                <div>
                  <Label className='text-xs uppercase text-muted-foreground'>
                    Email
                  </Label>
                  <p className='mt-2 text-lg font-medium'>{user?.email}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
