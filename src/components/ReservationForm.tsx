import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ReservationFormProps {
  onReserve: (data: {
    fullName: string;
    email: string;
    phone: string;
  }) => Promise<{ error?: string } | void>;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onReserve }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Full name required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Valid email required';
    }
    if (phone.trim()) {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      if (cleanPhone.length < 7) {
        newErrors.phone = 'Valid phone required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await onReserve({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      });

      if (result && result.error) {
        setErrors({ email: result.error });
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setFullName('');
      setEmail('');
      setPhone('');
    } catch (err: any) {
      setErrors({
        general: err?.message || 'Unable to complete reservation. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Container with ultra-thin champagne gold stroke border, NO shadow box */}
      <div className="bg-[#FFFDF9]/95 backdrop-blur-md border border-[#DFD1B8] rounded-sm p-6 sm:p-7 transition-colors">
        {/* Modern Serif Header "Register" */}
        <div className="pb-4 mb-5 border-b border-[#EBE2D0]">
          <h2 className="font-klarissa text-3xl sm:text-4xl tracking-wide text-[#1F1A14]">
            Register
          </h2>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-[11px] font-century-bold text-[#7A6438] mb-1.5">
              FULL NAME
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              placeholder="e.g. Sterling Hayes"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2]/90 border border-[#DFD1B8] rounded-sm text-[#1F1A14] placeholder-thin placeholder:font-extralight placeholder:text-[#B5A895] placeholder:tracking-wide focus:outline-none focus:border-[#B68D40] transition-colors"
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-600 font-century mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field with label EMAIL and gmail placeholder */}
          <div>
            <label className="block text-[11px] font-century-bold text-[#7A6438] mb-1.5">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="e.g. sterlinghayes@gmail.com"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2]/90 border border-[#DFD1B8] rounded-sm text-[#1F1A14] placeholder-thin placeholder:font-extralight placeholder:text-[#B5A895] placeholder:tracking-wide focus:outline-none focus:border-[#B68D40] transition-colors"
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 font-century mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field (Optional) */}
          <div>
            <label className="block text-[11px] font-century-bold text-[#7A6438] mb-1.5">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder="+1 (612) 000-0000 (optional)"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2]/90 border border-[#DFD1B8] rounded-sm text-[#1F1A14] placeholder-thin placeholder:font-extralight placeholder:text-[#B5A895] placeholder:tracking-wide focus:outline-none focus:border-[#B68D40] transition-colors"
            />
            {errors.phone && (
              <p className="text-[11px] text-rose-600 font-century mt-1">{errors.phone}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-[11px] text-rose-600 font-century">{errors.general}</p>
          )}

          {/* Submit Action: Single-word label 'Reserve' in warm metallic gold */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-century-bold tracking-widest text-[#FFFDF9] bg-[#B68D40] hover:bg-[#9E782F] rounded-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving</span>
                </>
              ) : (
                <>
                  <span>Reserve</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Domain & Event Path Attribution */}
          <div className="pt-2 text-center">
            <span className="text-xs font-century text-[#9C8B70] tracking-wide">
              goldenleadershipdevelopment.com/minnesota-event
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
