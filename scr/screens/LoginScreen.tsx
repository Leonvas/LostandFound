import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  School,
  Building2, 
  MapPin, 
  KeyRound,
  Mail,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { ScreenType } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onNavigateRegister: () => void;
}

type AuthStateVariant = 'standard' | 'invalid_email' | 'bad_password' | 'unverified' | 'forgot_password';

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateRegister
}) => {
  const [activeVariant, setActiveVariant] = useState<AuthStateVariant>('standard');
  const [email, setEmail] = useState('alex.turner@nyu.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Sync inputs when changing demo variant
  const handleSelectVariant = (variant: AuthStateVariant) => {
    setActiveVariant(variant);
    setErrorMessage(null);
    setInfoMessage(null);

    if (variant === 'standard') {
      setEmail('alex.turner@nyu.edu');
      setPassword('CorrectPass123!');
    } else if (variant === 'invalid_email') {
      setEmail('student123@gmail.com');
      setPassword('password123');
      setErrorMessage('Restricted Access: CampusFind requires an institutional university email (e.g., .edu domain).');
    } else if (variant === 'bad_password') {
      setEmail('alex.turner@nyu.edu');
      setPassword('wrongpassword');
      setErrorMessage('Authentication Failed: The password entered does not match our campus directory record.');
    } else if (variant === 'unverified') {
      setEmail('newstudent@nyu.edu');
      setPassword('StudentPass2024');
      setErrorMessage('Email Verification Pending: A confirmation badge link was sent to your university inbox. Please verify before sign-in.');
    } else if (variant === 'forgot_password') {
      setEmail('alex.turner@nyu.edu');
      setPassword('');
      setInfoMessage('Enter your institutional email to receive a secure FERPA password reset token.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);

      if (activeVariant === 'forgot_password') {
        setInfoMessage('Password reset token dispatched to ' + email + '. Check your university inbox.');
        return;
      }

      if (!email.toLowerCase().endsWith('.edu')) {
        setErrorMessage('Restricted Access: CampusFind requires an institutional university email (e.g., .edu domain).');
        return;
      }

      if (activeVariant === 'bad_password') {
        setErrorMessage('Authentication Failed: The password entered does not match our campus directory record.');
        return;
      }

      if (activeVariant === 'unverified') {
        setErrorMessage('Email Verification Pending: A confirmation badge link was sent to your university inbox.');
        return;
      }

      // Successful login
      onLoginSuccess(email);
    }, 700);
  };

  const handleQuickSso = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('alex.turner@nyu.edu');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 bg-[#050505] text-[#a0a0a0]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Interactive State Demo Bar */}
        <div className="mb-6 p-2 bg-[#0a0a0a] rounded-2xl border border-[#1a1a1a] shadow-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-xs text-[#777] font-semibold px-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Interactive SSO Scenarios:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => handleSelectVariant('standard')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeVariant === 'standard' 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-[#111] text-[#777] hover:text-white border border-[#1a1a1a]'
              }`}
            >
              Standard (Alex Turner)
            </button>
            <button
              onClick={() => handleSelectVariant('invalid_email')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeVariant === 'invalid_email' 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'bg-[#111] text-[#777] hover:text-white border border-[#1a1a1a]'
              }`}
            >
              Non-.EDU Email Alert
            </button>
            <button
              onClick={() => handleSelectVariant('bad_password')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeVariant === 'bad_password' 
                  ? 'bg-red-600 text-white shadow-xs' 
                  : 'bg-[#111] text-[#777] hover:text-white border border-[#1a1a1a]'
              }`}
            >
              Password Mismatch
            </button>
            <button
              onClick={() => handleSelectVariant('unverified')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeVariant === 'unverified' 
                  ? 'bg-purple-600 text-white shadow-xs' 
                  : 'bg-[#111] text-[#777] hover:text-white border border-[#1a1a1a]'
              }`}
            >
              Unverified Email
            </button>
            <button
              onClick={() => handleSelectVariant('forgot_password')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeVariant === 'forgot_password' 
                  ? 'bg-blue-700 text-white shadow-xs' 
                  : 'bg-[#111] text-[#777] hover:text-white border border-[#1a1a1a]'
              }`}
            >
              Forgot Password
            </button>
          </div>
        </div>

        {/* Main 2-Column Auth Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Campus Spatial Enclave & Value Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111] border border-[#1a1a1a] text-blue-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>CAMPUSFIND V3.4 PRODUCTION</span>
                <span className="text-[#333]">•</span>
                <span className="text-[#777] font-medium">Lost today. Found tomorrow.</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Find what you lost. <br className="hidden sm:block" />
                <span className="text-blue-500">Help someone find theirs.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#777] max-w-xl leading-relaxed">
                An AI-powered lost & found network engineered exclusively for university grounds, lecture halls, and dorm enclaves.
              </p>
            </div>

            {/* Live Neural Match Diagram Card */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1a1a1a] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-[#1a1a1a] pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a0a0a0]">Active Spatial Enclave</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono font-bold text-[#777]">
                  <span className="text-blue-400">&lt; 14ms Matching Engine</span>
                  <span>•</span>
                  <span className="text-emerald-400">87% Recovered Photo-Free</span>
                </div>
              </div>

              {/* Neural connection visual */}
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-center">
                {/* Left Node: Lost */}
                <div className="sm:col-span-3 p-3.5 rounded-xl bg-[#111] border border-[#1a1a1a] space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#555]">
                    <span>REPORTED LOST</span>
                    <span className="text-red-400 font-mono">10:14 AM</span>
                  </div>
                  <div className="text-sm font-extrabold text-white truncate">Bifold Leather Wallet</div>
                  <div className="text-xs text-[#777] flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#555]" />
                    <span>Bobst Library Floor 5</span>
                  </div>
                </div>

                {/* Center Connector */}
                <div className="sm:col-span-1 flex flex-col items-center justify-center py-1 sm:py-0">
                  <div className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-black tracking-tight whitespace-nowrap shadow-2xs">
                    89% Match
                  </div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-500/40 via-blue-500 to-emerald-500/40 my-1 hidden sm:block"></div>
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                </div>

                {/* Right Node: Found */}
                <div className="sm:col-span-3 p-3.5 rounded-xl bg-[#111] border border-emerald-500/30 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400">
                    <span>SECURED IN BIN</span>
                    <span className="text-emerald-400 font-mono">10:45 AM</span>
                  </div>
                  <div className="text-sm font-extrabold text-white truncate">Secured Student ID N1489****</div>
                  <div className="text-xs text-emerald-400/80 flex items-center space-x-1">
                    <Building2 className="w-3 h-3 text-emerald-400" />
                    <span>Safety Desk Locker #04</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a]">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Campus Community</h4>
                  <p className="text-[11px] text-[#777] mt-0.5 leading-snug">Verified .edu SSO and institutional NetIDs only.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a]">
                <Lock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Privacy Protected</h4>
                  <p className="text-[11px] text-[#777] mt-0.5 leading-snug">Zero-knowledge blind claims mask private attributes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a]">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">AI-Powered Match</h4>
                  <p className="text-[11px] text-[#777] mt-0.5 leading-snug">Spatial multi-vector sync recovers photo-free.</p>
                </div>
              </div>
            </div>

            {/* Quote Badge */}
            <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] text-xs text-[#777] italic">
              “CampusFind reunited over 480 student belongings across 18 campus buildings this semester alone.”
              <div className="mt-1 text-[11px] font-bold text-[#a0a0a0] not-italic">
                — Bobst Library Safety Command & Student Operations
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0a0a] rounded-2xl p-7 sm:p-9 shadow-2xl border border-[#1a1a1a] relative">
              
              {/* Header */}
              <div className="mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-md shadow-blue-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {activeVariant === 'forgot_password' ? 'Reset Password' : 'Sign in to CampusFind'}
                </h2>
                <p className="text-xs text-[#777] mt-1">
                  {activeVariant === 'forgot_password'
                    ? 'Enter your institutional credentials to request a recovery link'
                    : 'Access your university lost & found network with campus SSO'}
                </p>
              </div>

              {/* Alert Banners */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-start space-x-2.5 animate-in fade-in duration-200">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{errorMessage}</span>
                </div>
              )}

              {infoMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-blue-300 flex items-start space-x-2.5 animate-in fade-in duration-200">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{infoMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-1.5">
                    Official College Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#555]">
                      <School className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="netid@nyu.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border font-medium outline-none transition-all bg-[#111] text-white placeholder-[#555] ${
                        email.toLowerCase().endsWith('.edu')
                          ? 'border-emerald-500/50 focus:border-emerald-500'
                          : 'border-[#1a1a1a] focus:border-blue-500'
                      }`}
                    />
                    {email.toLowerCase().endsWith('.edu') && (
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-400 pointer-events-none">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#555] mt-1">
                    <span>e.g., alex.turner@nyu.edu</span>
                    {email.toLowerCase().endsWith('.edu') && (
                      <span className="text-emerald-400 font-bold">Valid .edu detected</span>
                    )}
                  </div>
                </div>

                {activeVariant !== 'forgot_password' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => handleSelectVariant('forgot_password')}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#555]">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-[#1a1a1a] focus:border-blue-500 bg-[#111] text-white placeholder-[#555] font-medium outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#555] hover:text-white cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {activeVariant !== 'forgot_password' && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-2 text-xs text-[#777] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-[#111] border-[#1a1a1a] text-blue-600 focus:ring-0"
                      />
                      <span>Keep me signed in on this computer</span>
                    </label>
                  </div>
                )}

                {/* Primary CTA button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating University NetID...</span>
                    </>
                  ) : (
                    <>
                      <span>{activeVariant === 'forgot_password' ? 'Send Reset Instructions' : 'Sign In to CampusFind'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {activeVariant === 'forgot_password' && (
                  <button
                    type="button"
                    onClick={() => handleSelectVariant('standard')}
                    className="w-full py-2 text-xs font-bold text-[#777] hover:text-white cursor-pointer"
                  >
                    ← Back to Standard Sign In
                  </button>
                )}
              </form>

              {/* SSO Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1a1a1a]"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0a0a0a] px-3 text-[#555] font-bold tracking-wider">or sign in with</span>
                </div>
              </div>

              {/* SSO Button */}
              <button
                type="button"
                onClick={handleQuickSso}
                className="w-full py-2.5 px-4 rounded-xl border border-[#1a1a1a] bg-[#111] hover:bg-[#161616] text-[#a0a0a0] hover:text-white font-bold text-xs flex items-center justify-center space-x-3 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google / University SSO</span>
              </button>

              {/* Registration Link */}
              <div className="mt-6 text-center text-xs text-[#777]">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  className="font-bold text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-400 cursor-pointer"
                >
                  Create an account
                </button>
              </div>

              {/* Security note */}
              <div className="mt-5 pt-4 border-t border-[#1a1a1a] flex items-center justify-center space-x-1.5 text-[11px] text-[#555]">
                <Lock className="w-3.5 h-3.5 text-[#555]" />
                <span>Your personal information is encrypted & never displayed publicly.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
