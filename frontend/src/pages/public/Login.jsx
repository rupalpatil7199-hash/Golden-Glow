import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthBridge } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

const Login = ({ isSignUpInit = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  
  const { login, register } = useAuthBridge();
  const { showSuccess, showError } = useNotification();
  
  const [isSignUp, setIsSignUp] = useState(isSignUpInit);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Inputs Validation
    if (!email || !password) {
      setFormError('Email and Password are required.');
      return;
    }
    
    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (isSignUp) {
      if (!fullName) {
        setFormError('Full Name is required for registration.');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await register(fullName, email, password);
        showSuccess('Account created successfully!');
        navigate(redirect);
      } else {
        const data = await login(email, password);
        showSuccess(`Welcome back, ${data.user.fullName || 'User'}!`);
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(redirect);
        }
      }
    } catch (err) {
      const errMsg = err.message || 'Authentication failed. Please try again.';
      setFormError(errMsg);
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    setFormError('');
    try {
      await login(role);
      showSuccess(`Authenticated successfully as Demo ${role === 'admin' ? 'Admin' : 'Customer'}!`);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      const errMsg = err.message || 'Demo login failed';
      setFormError(errMsg);
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090b] flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden font-sans text-platinum">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-primary-glow/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-normal uppercase tracking-[0.2em] text-white">
            Golden Glow
          </h2>
          <p className="text-[9px] tracking-[0.5em] text-champagne uppercase mt-2">
            Fine Boutique Jewelry
          </p>
        </div>

        {/* Card container with glassmorphism */}
        <div className="bg-[#14171d]/60 backdrop-blur-xl border border-white/5 shadow-luxury rounded-2xl p-8 md:p-10 relative">
          <h3 className="font-serif text-xl tracking-wider text-white mb-6 uppercase text-center">
            {isSignUp ? 'Create Collection Account' : 'Sign In'}
          </h3>

          {formError && (
            <div className="mb-6 p-3 bg-red-950/30 border border-red-500/20 text-red-400 text-xs rounded-lg text-center leading-relaxed">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-titanium uppercase font-semibold">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-titanium/50" />
                  <input
                    type="text"
                    required
                    placeholder="Eleanor Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0d0f12] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-champagne/60 focus:ring-1 focus:ring-champagne/20 text-white placeholder:text-titanium/30 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] tracking-widest text-titanium uppercase font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-titanium/50" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d0f12] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-champagne/60 focus:ring-1 focus:ring-champagne/20 text-white placeholder:text-titanium/30 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] tracking-widest text-titanium uppercase font-semibold">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-[9px] tracking-wider text-champagne/80 hover:text-champagne transition-colors">
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-titanium/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0d0f12] border border-white/10 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-champagne/60 focus:ring-1 focus:ring-champagne/20 text-white placeholder:text-titanium/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-titanium/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] tracking-widest text-titanium uppercase font-semibold">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-titanium/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#0d0f12] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-champagne/60 focus:ring-1 focus:ring-champagne/20 text-white placeholder:text-titanium/30 transition-all"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-champagne hover:bg-champagne/90 text-obsidian font-sans font-bold text-xs tracking-[0.2em] py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-55 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isSignUp ? 'REGISTER ACCOUNT' : 'SECURE SIGN IN'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle View Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-titanium">
              {isSignUp ? 'Already have an account?' : 'New to Golden Glow?'}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormError('');
                }}
                className="ml-1.5 text-champagne hover:underline focus:outline-none font-semibold"
              >
                {isSignUp ? 'Sign In' : 'Register Here'}
              </button>
            </p>
          </div>

          {/* Developer Quick-Login Tray */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-[9px] tracking-widest text-titanium/60 uppercase font-semibold text-center mb-3">
              Developer Demo Shortcuts
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleDemoLogin('customer')}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 px-3 text-[10px] tracking-widest font-semibold font-sans text-white hover:border-white/20 transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-primary" />
                DEMO CUSTOMER
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleDemoLogin('admin')}
                className="flex items-center justify-center gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg py-2.5 px-3 text-[10px] tracking-widest font-semibold font-sans text-champagne hover:border-primary/40 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-primary-glow" />
                DEMO ADMIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
