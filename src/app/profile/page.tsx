'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFinanceStore } from '@/hooks/use-finance-store';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  User,
  Edit2,
  X,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { profile, updateProfile, isLoading } = useFinanceStore();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(
      formData.username !== profile.username ||
      formData.email !== profile.email ||
      formData.currency !== profile.currency
    );
  }, [formData, profile]);

  if (isLoading) return null;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your settings were saved successfully.',
    });
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex justify-center p-6">

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl space-y-6"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              Profile Settings
            </h2>
            <p className="text-muted-foreground">
              Manage your personal account information
            </p>
          </div>

          <Badge
            variant={isEditing ? 'default' : 'secondary'}
            className="px-3 py-1 text-xs shadow"
          >
            {isEditing ? 'Editing' : 'Viewing'}
          </Badge>
        </div>

        {/* AVATAR SECTION */}
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border shadow-xl">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white dark:ring-gray-800 transition-transform group-hover:scale-105">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-purple-400/40" />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-semibold">{profile.username}</h1>
              <p className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
                <Mail className="h-4 w-4" />
                {profile.email}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* INFO ALERT */}
        {!isEditing && (
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/40">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription>
              You're currently in view mode. Click edit to modify details.
            </AlertDescription>
          </Alert>
        )}

        {/* MAIN CARD */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border shadow-lg transition-all">

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account Details
            </CardTitle>
            <CardDescription>
              {isEditing
                ? 'Update your personal information.'
                : 'Your account information overview.'}
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-6 pt-6">

            {/* USERNAME */}
            <div className="space-y-2">
              <Label>Username</Label>
              {isEditing ? (
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              ) : (
                <div className="p-3 rounded-md bg-muted/50 border text-sm">
                  {profile.username}
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              ) : (
                <div className="p-3 rounded-md bg-muted/50 border text-sm">
                  {profile.email}
                </div>
              )}
            </div>

            {/* CURRENCY */}
            {isEditing && (
              <div className="space-y-2">
                <Label>Preferred Currency</Label>
                <Input
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                />
              </div>
            )}
          </CardContent>

          {/* FOOTER */}
          <CardFooter className="flex justify-end gap-3 pt-6">

            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>

                <Button
                  disabled={!hasChanged}
                  onClick={handleSave}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}

          </CardFooter>
        </Card>
      </motion.main>
    </div>
  );
}