"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginUser, loginWithGoogle, registerUser, getCurrentUser, logoutUser } from "@/lib/auth";
import { useEffect } from "react";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

// Minimal SVG for Google Icon
function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be 8 characters"),
});

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    // If the user lands on the login page but is already logged in,
    // safely redirect them to the dashboard immediately.
    getCurrentUser().then((user) => {
      if (user) {
        toast.info("Welcome back!");
        router.push("/dashboard");
      }
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (e: any) {
      toast.error("Failed to initialize Google login", { description: e.message });
    }
  };

  const onSubmitLogin = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      await loginUser(values.email, values.password);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (e: any) {
      toast.error("Login Failed", { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitSignup = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true);
    try {
      await registerUser(values.email, values.password, values.name);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (e: any) {
      toast.error("Sign Up Failed", { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Medicure Portal</h1>
        <p className="text-muted-foreground mt-2">
          {isLogin ? "Sign in to your account" : "Create a new patient account"}
        </p>
      </div>

      <div className="bg-card border rounded-lg shadow-sm p-6">
        {/* Priority OAuth Button */}
        <Button 
          variant="outline" 
          className="w-full h-12 flex items-center justify-center gap-3 mb-6" 
          onClick={handleGoogleLogin}
          type="button"
        >
          <GoogleIcon className="w-5 h-5" />
          <span className="font-medium">Continue with Google</span>
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {isLogin ? (
          <Form {...loginForm}>
            <form key="login-form" onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-11 mt-4" disabled={loading}>
                {loading ? "Signing in..." : <><LogIn className="mr-2 h-4 w-4"/> Sign In</>}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...signupForm}>
            <form key="signup-form" onSubmit={signupForm.handleSubmit(onSubmitSignup)} className="space-y-4">
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-11 mt-4" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              className="text-primary hover:underline font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
