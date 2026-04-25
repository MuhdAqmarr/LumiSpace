"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, ArrowRight, Info } from "lucide-react";
import { login, getDemoCredentials } from "@/lib/services/auth-service";
import { adminLoginSchema, AdminLoginFormValues } from "@/lib/schemas/admin-login-schema";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const demoAccounts = getDemoCredentials();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate network
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = login(data.email, data.password);
      
      if (result.success) {
        router.push("/admin");
      } else {
        setError(result.error || "Login failed");
        setIsSubmitting(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  const useDemoAccount = (email: string) => {
    setValue("email", email);
    setValue("password", "password123");
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <Link href="/" className="flex items-center gap-2 text-text-primary no-underline mb-16 w-fit">
          <Sparkles className="h-6 w-6 text-gold" />
          <span className="font-display text-xl font-medium tracking-wide">
            LumiSpace
          </span>
        </Link>

        <div className="max-w-md w-full">
          <h1 className="font-display text-4xl text-text-primary mb-2">Provider Login</h1>
          <p className="text-text-secondary mb-8">Manage your cinematic venues and bookings.</p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
              <input 
                type="email"
                {...register("email")}
                className={`w-full bg-bg-surface border ${errors.email ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
              />
              {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
              <input 
                type="password"
                {...register("password")}
                className={`w-full bg-bg-surface border ${errors.password ? 'border-danger' : 'border-border'} rounded-xl px-4 py-3 text-text-primary outline-none focus:border-gold transition-colors`}
              />
              {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gold text-bg px-6 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 rounded-full border-2 border-bg border-t-transparent animate-spin" />
              ) : (
                <>Login to Dashboard <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-12 p-6 rounded-2xl bg-bg-surface border border-border-gold/30">
            <h3 className="text-sm font-medium text-gold flex items-center gap-2 mb-4">
              <Info className="w-4 h-4" /> Demo Accounts Available
            </h3>
            <div className="space-y-3">
              {demoAccounts.map(acc => (
                <button 
                  key={acc.email}
                  type="button"
                  onClick={() => useDemoAccount(acc.email)}
                  className="w-full text-left text-xs p-3 rounded-lg border border-border hover:border-gold/50 bg-bg transition-colors flex justify-between items-center group"
                >
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                    {acc.providerName}
                  </span>
                  <span className="font-mono text-gold opacity-50 group-hover:opacity-100 transition-opacity">
                    {acc.email}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-bg-surface border-l border-border">
        <div className="absolute inset-0 bg-gradient-to-tr from-bg/80 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <div className="glass-strong p-8 rounded-3xl border border-border-gold max-w-lg">
            <h2 className="font-display text-3xl text-text-primary mb-4">"LumiSpace transformed how we manage our premium venues."</h2>
            <p className="text-sm text-text-secondary uppercase tracking-wider">— Lumiere Estates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
