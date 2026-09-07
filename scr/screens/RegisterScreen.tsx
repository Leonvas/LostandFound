import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Mail, 
  Building2, 
  School, 
  KeyRound, 
  UserCheck, 
  Eye, 
  EyeOff,
  ExternalLink,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';
import { ScreenType } from '../types';

interface RegisterScreenProps {
  onRegisterSuccess: (userData: any) => void;
  onNavigateLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateLogin
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('Alex Turner');
  const [netId, setNetId] = useState('NYU-99420');
  const [email, setEmail] = useState('alex.turner@nyu.edu');
  const [department, setDepartment] = useState('College of Arts & Science');
  const [classification, setClassification] = useState<'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Grad / Faculty'>('Sophomore');
  const [password, setPassword] = useState('Passw0rdSecure!24');
  const [confirmPassword, setConfirmPassword] = useState('Passw0rdSecure!24');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(58);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.toLowerCase().endsWith('.edu')) {
      setErrorMessage('FERPA Enclave policy requires an active university email ending in .edu.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password mismatch: Passwords entered do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(2);
    }, 800);
  };

  const handleCompleteVerification = () => {
    onRegisterSuccess({
      name: fullName,
      email,
      studentId: 'N-19482014',
      netId,
      department,
      classification
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8 bg-[#050505] text-[#a0a0a0]">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb & Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-500 mb-1">
              <span>CampusFind</span>
              <span className="text-[#333]">/</span>
              <span className="text-[#777]">Student Registration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create Your Campus Account
            </h1>
            <p className="text-xs text-[#777] mt-1">
              Institutional Identity Governance • FERPA Enclave Protection
            </p>
          </div>

          {/* 2-Step Indicator */}
          <div className="flex items-center space-x-3 bg-[#0a0a0a] p-2 rounded-2xl border border-[#1a1a1a] shadow-xs">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold ${
              currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
              <span>Student Credentials</span>
            </div>
            <span className="text-[#333]">→</span>
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold ${
              currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-[#111] text-[#777] border border-[#1a1a1a]'
            }`}>
              <span className="w-5 h-5 rounded-full bg-[#161616] text-[#777] flex items-center justify-center text-[11px]">2</span>
              <span>Institutional Verification</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form / Verification Step */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0a0a] rounded-2xl p-6 sm:p-9 shadow-2xl border border-[#1a1a1a]">
              {currentStep === 1 ? (
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="border-b border-[#1a1a1a] pb-4 mb-4">
                    <h2 className="text-lg font-bold text-white">1. Student Identification</h2>
                    <p className="text-xs text-[#777]">Provide official registrar information for automatic verification.</p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-start space-x-2.5">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="font-semibold">{errorMessage}</span>
                    </div>
                  )}

                  {/* Legal Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[#a0a0a0] uppercase tracking-wider">
                          Full Legal Name
                        </label>
                        <span className="text-[10px] text-[#555]">As on Registrar</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Turner"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#1a1a1a] bg-[#111] text-white placeholder-[#555] focus:border-blue-500 font-medium outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[#a0a0a0] uppercase tracking-wider">
                          Student ID / NetID
                        </label>
                        <span className="text-[10px] text-blue-400 font-semibold bg-[#111] px-1.5 py-0.5 rounded border border-[#1a1a1a]">
                          Hashed & Encrypted
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={netId}
                        onChange={(e) => setNetId(e.target.value)}
                        placeholder="NYU-99420"
                        className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-[#1a1a1a] bg-[#111] text-white placeholder-[#555] focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* University Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-1">
                      Official College Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#555]">
                        <School className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex.turner@nyu.edu"
                        className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-[#1a1a1a] bg-[#111] text-white placeholder-[#555] focus:border-blue-500 font-medium outline-none"
                      />
                      {email.toLowerCase().endsWith('.edu') && (
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-[#555] mt-1 block">
                      Must be a valid .edu domain belonging to a recognized campus.
                    </span>
                  </div>

                  {/* Academic Department */}
                  <div>
                    <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-1">
                      Primary Academic Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#1a1a1a] focus:border-blue-500 font-medium outline-none bg-[#111] text-white"
                    >
                      <option value="College of Arts & Science">College of Arts & Science</option>
                      <option value="Tandon School of Engineering">Tandon School of Engineering</option>
                      <option value="Stern School of Business">Stern School of Business</option>
                      <option value="Tisch School of the Arts">Tisch School of the Arts</option>
                      <option value="Silver School of Social Work">Silver School of Social Work</option>
                      <option value="Courant Institute of Mathematical Sciences">Courant Institute of Mathematical Sciences</option>
                    </select>
                  </div>

                  {/* Classification Pills */}
                  <div>
                    <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-2">
                      Academic Classification
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {(['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad / Faculty'] as const).map(cls => (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setClassification(cls)}
                          className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            classification === cls
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-[#111] text-[#777] border-[#1a1a1a] hover:text-white hover:bg-[#161616]'
                          }`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-1">
                        Create Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl border border-[#1a1a1a] bg-[#111] text-white placeholder-[#555] focus:border-blue-500 font-medium outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#555] hover:text-white cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="mt-1.5 flex items-center space-x-1.5">
                        <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
                        <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
                        <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
                        <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
                        <span className="text-[10px] font-bold text-emerald-400">Strong 4/4</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-1">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#1a1a1a] bg-[#111] text-white placeholder-[#555] focus:border-blue-500 font-medium outline-none"
                      />
                      <div className="mt-1.5 flex items-center space-x-1 text-[11px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Security tokens match</span>
                      </div>
                    </div>
                  </div>

                  {/* Honor Code Agreement */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-2.5 text-xs text-[#777] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded bg-[#111] border-[#1a1a1a] text-blue-600 focus:ring-0"
                      />
                      <span className="leading-relaxed">
                        I pledge adherence to the University Student Honor Code and agree to use zero-knowledge blind claim verifications solely for my own personal belongings.
                      </span>
                    </label>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !agreed}
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Dispatching Institutional Token...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account & Verify College Email</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-xs text-[#777] pt-2">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={onNavigateLogin}
                      className="text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                      Sign in with NetID
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2: Live Institutional Email Verification */
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-4 animate-bounce border border-blue-500/30">
                      <Mail className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-white">Check Your University Inbox</h2>
                    <p className="text-xs text-[#777] max-w-md mx-auto mt-1 leading-relaxed">
                      We dispatched a cryptographic authentication badge to <strong className="text-blue-400">{email}</strong>.
                    </p>
                  </div>

                  <div className="bg-[#111] border border-blue-500/30 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-blue-300 font-bold">
                      <span>Dispatch Node: NYU Office of Student Registrar</span>
                      <span className="flex items-center space-x-1 text-[#777]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Link expires in 15 mins</span>
                      </span>
                    </div>

                    <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#1a1a1a] flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                          NYU
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Confirm your CampusFind Student Pass</div>
                          <div className="text-[11px] text-[#777]">Identity token: 4982-CAS-NYU-2024</div>
                        </div>
                      </div>

                      <button
                        onClick={handleCompleteVerification}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Simulate Click & Sign In</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-[#777] leading-normal">
                      Click the simulated button above to instantly verify and enter your student dashboard, or check your webmail.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setResendTimer(60)}
                      className="text-[#777] hover:text-white font-medium cursor-pointer"
                    >
                      Didn't receive email? Resend in ({resendTimer}s)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                      Edit student credentials
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Institutional Identity Safeguards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* University Boundary Protection Card */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#1a1a1a] shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>University Boundary Protection</span>
              </div>
              <h3 className="text-base font-extrabold text-white">
                FERPA Compliant Institutional Enclave
              </h3>
              <p className="text-xs text-[#777] leading-relaxed">
                CampusFind strictly isolates university databases. Lost report submissions, GPS micro-coordinates, and locker access codes are restricted to verified members of your collegiate domain.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#111] border border-[#1a1a1a]">
                  <div className="w-6 h-6 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero-Knowledge Custody</h4>
                    <p className="text-[11px] text-[#777] mt-0.5 leading-snug">
                      Campus safety officers log found items without revealing serials or identifying stickers publicly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#111] border border-[#1a1a1a]">
                  <div className="w-6 h-6 rounded-md bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Automated Locker PIN Releases</h4>
                    <p className="text-[11px] text-[#777] mt-0.5 leading-snug">
                      Answer 2 blind verification questions to obtain your digital locker pass instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#0a0a0a] p-3.5 rounded-2xl border border-[#1a1a1a]">
                <div className="text-lg font-extrabold text-blue-400">240+</div>
                <div className="text-[10px] text-[#555] font-medium mt-0.5">Colleges Active</div>
              </div>
              <div className="bg-[#0a0a0a] p-3.5 rounded-2xl border border-[#1a1a1a]">
                <div className="text-lg font-extrabold text-emerald-400">15-Min</div>
                <div className="text-[10px] text-[#555] font-medium mt-0.5">Token Expiry</div>
              </div>
              <div className="bg-[#0a0a0a] p-3.5 rounded-2xl border border-[#1a1a1a]">
                <div className="text-lg font-extrabold text-indigo-400">100%</div>
                <div className="text-[10px] text-[#555] font-medium mt-0.5">FERPA Secure</div>
              </div>
            </div>

            {/* Custodian notice */}
            <div className="p-4 rounded-2xl bg-[#0a0a0a] border border-amber-500/30 text-xs text-amber-400">
              <span className="font-bold">Are you a Campus Safety Officer or Facility Custodian?</span>
              <p className="text-[11px] text-[#777] mt-1">
                Access the specialized staff intake portal via SSO with your departmental RSA token.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
