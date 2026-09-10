import { useState } from 'react';
import { submitLead } from '../api';
import SectionHeader from './SectionHeader';

const initial = { name: '', business_name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      await submitLead(form);
      setStatus({ state: 'ok', message: "Thanks. We'll follow up shortly." });
      setForm(initial);
    } catch (err) {
      setStatus({ state: 'err', message: err.message || 'Could not submit. Please try again.' });
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <SectionHeader
              kicker="GET IN TOUCH"
              title="See what last month cost you"
              description="We'll pull a free missed call report for your business before you commit to anything. Prefer to reach us directly instead of the form?"
              className="mb-6"
            />
            <div className="font-mono text-[14px] leading-loose text-ink">
              <div>Email: <a href="mailto:shelbysarteves@gmail.com" className="text-inherit hover:text-primary transition-colors">shelbysarteves@gmail.com</a></div>
              <div>Instagram: <a href="https://instagram.com/shelbysarteves" target="_blank" rel="noopener noreferrer" className="text-inherit hover:text-primary transition-colors">@shelbysarteves</a></div>
            </div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="font-body text-[13px] font-semibold text-[#111827] mb-2">Your name</label>
              <input 
                id="name" name="name" value={form.name} onChange={onChange} required 
                className="w-full h-12 font-body text-[15px] px-4 py-3 border border-[#D1D5DB] rounded-lg bg-white text-[#111827] transition-all duration-200 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#818CF8] focus:ring-1 focus:ring-[#818CF8] shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="business_name" className="font-body text-[13px] font-semibold text-[#111827] mb-2">Business name</label>
              <input 
                id="business_name" name="business_name" value={form.business_name} onChange={onChange} required 
                className="w-full h-12 font-body text-[15px] px-4 py-3 border border-[#D1D5DB] rounded-lg bg-white text-[#111827] transition-all duration-200 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#818CF8] focus:ring-1 focus:ring-[#818CF8] shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-body text-[13px] font-semibold text-[#111827] mb-2">Email</label>
              <input 
                id="email" name="email" type="email" value={form.email} onChange={onChange} required 
                className="w-full h-12 font-body text-[15px] px-4 py-3 border border-[#D1D5DB] rounded-lg bg-white text-[#111827] transition-all duration-200 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#818CF8] focus:ring-1 focus:ring-[#818CF8] shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-body text-[13px] font-semibold text-[#111827] mb-2">Phone</label>
              <input 
                id="phone" name="phone" value={form.phone} onChange={onChange} 
                className="w-full h-12 font-body text-[15px] px-4 py-3 border border-[#D1D5DB] rounded-lg bg-white text-[#111827] transition-all duration-200 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#818CF8] focus:ring-1 focus:ring-[#818CF8] shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="font-body text-[13px] font-semibold text-[#111827] mb-2">What's slipping through right now</label>
              <textarea 
                id="message" name="message" rows="4" value={form.message} onChange={onChange} 
                className="w-full h-[120px] resize-y font-body text-[15px] px-4 py-3 border border-[#D1D5DB] rounded-lg bg-white text-[#111827] transition-all duration-200 placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#818CF8] focus:ring-1 focus:ring-[#818CF8] shadow-sm"
              />
            </div>
            <button 
              type="submit" 
              className="w-full h-[52px] bg-primary text-white font-body font-semibold text-base border-none rounded-lg cursor-pointer mt-2 transition-all duration-150 hover:bg-[#B30500] active:scale-[0.98] disabled:bg-[#FCA5A5] disabled:cursor-not-allowed disabled:transform-none shadow-sm"
              disabled={status.state === 'loading'}
            >
              {status.state === 'loading' ? 'Sending' : 'Request my report'}
            </button>
            {status.state === 'ok' && <div className="font-mono text-[13px] mt-1 text-[#1E8E6C]">{status.message}</div>}
            {status.state === 'err' && (
              <div className="font-mono text-[13px] mt-1 text-[#C7402F]">
                {status.message}{' '}
                <button type="button" className="bg-transparent border-none p-0 text-inherit underline font-mono text-[13px] cursor-pointer" onClick={onSubmit}>
                  Try again
                </button>
                , or email us directly at{' '}
                <a href="mailto:shelbysarteves@gmail.com" className="text-inherit hover:text-primary">shelbysarteves@gmail.com</a>.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
