import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Sparkles, Eye, EyeOff, Lock, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('alex.morgan@saascorp.com');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      await login(email.trim());
      showToast('Welcome back!', 'Logged in successfully.', 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      showToast('Authentication Error', 'Invalid credentials provided.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans">
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 border-r border-slate-800/80 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 z-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Apex CRM</h1>
            <p className="text-xs text-brand-400 font-medium">Enterprise Customer Operations</p>
          </div>
        </div>

        <div className="max-w-md z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Production CRM Management</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Streamline customer relations with real-time insight.
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Manage customer directories, track real-time activity metrics, and maintain full control with our modern SaaS portal.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Real-time LocalStorage sync & API integration',
              'Responsive mobile drawer & customer profile inspector',
              'Dark and Light high-contrast SaaS UI design system',
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="z-10 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Apex CRM Platform. Built with React & TypeScript.
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-900 lg:bg-slate-950">
        <div className="w-full max-w-md space-y-8 bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center space-x-3 lg:hidden justify-center mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white">Apex CRM</span>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-400">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="name@company.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800/80 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-700 focus:ring-brand-500'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-800/80 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-700 focus:ring-brand-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In to Dashboard
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
