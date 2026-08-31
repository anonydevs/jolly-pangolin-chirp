"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"tenant" | "landlord" | "agent">("tenant");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "tenant",
    agreeTerms: false,
    marketingOptIn: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const userTypes = [
    { value: "tenant", label: "I'm looking to rent", icon: User, description: "Find your perfect home" },
    { value: "landlord", label: "I want to list property", icon: Building2, description: "Rent out your property" },
    { value: "agent", label: "I'm a property agent", icon: User, description: "Manage client properties" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.currentTarget.checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^(\+254|0)[17]\d{8}$/.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Enter a valid Kenyan phone number";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Password must contain at least one uppercase letter";
    else if (!/[a-z]/.test(formData.password)) newErrors.password = "Password must contain at least one lowercase letter";
    else if (!/[0-9]/.test(formData.password)) newErrors.password = "Password must contain at least one number";
    if (formData.password !== formData.confirmPassword...newErrors.password = "Passwords do not match";
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Account created successfully! Welcome to PataNyumba.");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2" aria-label="PataNyumba Home">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600">
              <User className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-gray-900">PataNyumba</span>
          </Link>
        </div>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription className="text-gray-600">
              Sign up to discover your next home
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {userTypes.map((type) => (
                <label key={type.value} className="flex flex-col items-center gap-2 cursor-pointer select-none">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-colors border-gray-300">
                    <type.icon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  </div>
                  <p className="font-medium text-gray-700">{type.label}</p>
                  <input
                    type="radio"
                    name="userType"
                    value={type.value}
                    checked={formData.userType === type.value}
                    onChange={(e) => setFormData((prev) => ({ ...prev, userType: e.target.value }))}
                    className="hidden"
                  />
                </label>
              ))}
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={cn("pl-10", errors.firstName && "border-red-500 focus-visible:ring-red-500")}
                  disabled={isLoading}
                  autoComplete="given-name"
                  aria-invalid={errors.firstName ? "true" : "false"}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={cn("pl-10", errors.lastName && "border-red-500 focus-visible:ring-red-500")}
                  disabled={isLoading}
                  autoComplete="family-name"
                  aria-invalid={errors.lastName ? "true" : "false"}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn("pl-10", errors.email && "border-red-500 focus-visible:ring-red-500")}
                    disabled={isLoading}
                    autoComplete="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn("pl-10", errors.phone && "border-red-500 focus-visible:ring-red-500")}
                    disabled={isLoading}
                    autoComplete="tel"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/login" className="text-sm text-emerald-600 hover:text-emerald-700">
                    Already have an account?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={cn("pl-10 pr-10", errors.password && "border-red-500 focus-visible:ring-red-500")}
                    disabled={isLoading}
                    autoComplete="new-password"
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={cn("pl-10 pr-10", errors.confirmPassword && "border-red-500 focus-visible:ring-red-500")}
                    disabled={isLoading}
                    autoCompare="new-password"
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="text-sm text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">I agree to the <a href="/terms" className="text-emerald-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</a></Label>
                <Checkbox
                  checked={formData.agreeTerms}
                  onCheckedChange={() => setFormData((prev) => ({ ...prev, agreeTerms: !prev.agreeTerms }))}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>

              <Button type="submit" className="w-full py-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <Separator className="my-4" />

              <p className="text-center text-sm text-gray-600">
                Or continue with{" "}
                <Button variant="outline" onClick={() => handleSocialLogin("Google")} className="gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.30 4.53 6.16 4.53z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.30 4.53 6.16 4.53z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin("Apple")} className="gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.05 20.653c-.993.94-2.22 1.453-3.55.91-2.008-.807-3.247-2.477-3.247-4.425 0-2.43 1.787-3.9 3.807-4.228.277-.04.62-.06.88-.06.533 0 .947.074 1.227.21.31.15.567.37.75.65.18.28.27.61.27.97 0 .86-.227 1.48-.72 1.925l-1.37.9c-.24-.28-.57-.48-.97-.61-.58-.18-1.27-.27-2.07-.27-1.753 0-3.07 1.247-3.07 3.14 0 1.853 1.317 3.107 3.07 3.107.8 0 1.48-.093 2.07-.27.4-.13.73-.33.97-.61l1.42.9c.47.42.707 1.04.707 1.753 0 1.573-1.027 2.893-2.733 3.363-.773.213-1.6.32-2.507.32-1.28 0-2.427-.48-3.16-1.173" />
                  </svg>
                  Apple
                </Button>
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
```

Now I need to continue with the dashboard pages and other core components for the PataNyumba platform. Let me create the dashboard pages for different user types (tenant, landlord, agent).

Let me start with the main dashboard page:Now let me create the dashboard pages for different user types:

<dyad-write path="src/pages/Dashboard.tsx" description="Creating the main dashboard page with user type selection">
"use client";

import { useState } from "react";
import Link from "react-router-dom";
import { User, Building2, MapPin, Heart, Shield, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [userType, setUserType] = useState<"tenant" | "landlord" | "agent">("tenant");

  const navigateTo = (type: "tenant" | "landlord" | "agent") => {
    setUserType(type);
    // Navigate based on user type
    const routes = {
      tenant: "/tenant-dashboard",
      landlord: "/landlord-dashboard",
      agent: "/agent-dashboard",
    };
    // In a real app, this would navigate to the appropriate dashboard
    window.location.href = routes[type];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to PataNyumba</CardTitle>
            <CardDescription className="text-gray-600">
              Choose your role to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {userTypes.map((type) => (
              <div key={type} className="flex flex-col items-center gap-4 p-6 border rounded-xl hover:border-emerald-200 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                  {type === "tenant" ? <User /> : type === "landlord" ? <Building2 /> : <MapPin />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{type.charAt(0).toUpperCase() + type.slice(1)} Dashboard</h3>
                <p className="text-gray-600 text-center">
                  {type === "tenant" ? "Find your perfect rental property" : type === "landlord" ? "List and manage your properties" : "Manage client properties and tenants"}
                </p>
                <Button
                  onClick={() => navigateTo(type)}
                  className="w-full py-3 text-lg font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  Get Started
                </Button>
              </div>
            ))}

            <Separator className="my-4" />

            <p className="text-center text-sm text-gray-500">
              {"Don't have an account? <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-700">Sign up</Link>"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;