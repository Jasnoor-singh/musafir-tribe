import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import axios, { backendUrl } from '../lib/api';

const initialForm = { name: '', phone: '', email: '', travellers: '1', travelDate: '', message: '' };
export default function BookNowForm({ isOpen, onClose, productId, packageName, price, currency = '₹ ' }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const requestId = useRef(crypto.randomUUID());
  const dialog = useRef(null);
  const firstInput = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstInput.current?.focus();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, [isOpen]);
  if (!isOpen) return null;
  const close = () => {
    if (submitting) return;
    setError('');
    if (reference) { setReference(''); setForm(initialForm); requestId.current = crypto.randomUUID(); }
    onClose();
  };
  const change = e => {
    const { name, value } = e.target;
    setForm(previous => ({ ...previous, [name]: value }));
    requestId.current = crypto.randomUUID();
    setError('');
  };
  const submit = async e => {
    e.preventDefault();
    if (submitting) return;
    const values = Object.fromEntries(new FormData(e.currentTarget));
    setForm(values);
    setSubmitting(true); setError('');
    try {
      const { data } = await axios.post(`${backendUrl}/api/booking/confirm`, {
        ...values, productId, requestId: requestId.current, travellers: Number(values.travellers),
      });
      if (!data.success) throw new Error(data.message || 'Could not send your booking request.');
      setReference(data.reference);
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  };
  const onKeyDown = e => {
    if (e.key === 'Escape') close();
    if (e.key !== 'Tab') return;
    const controls = [...dialog.current.querySelectorAll('button:not([disabled]), input, select, textarea, a[href]')];
    const first = controls[0], last = controls.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  };
  const field = 'mt-2 w-full rounded-lg border border-[#221A10]/20 bg-white p-3 text-sm';
  return <div className="fixed inset-0 z-[80] bg-[#221A10]/60 backdrop-blur-sm flex items-center justify-center p-3" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
    <section ref={dialog} role="dialog" aria-modal="true" aria-labelledby="booking-title" onKeyDown={onKeyDown} className="relative bg-[#FBF7EE] rounded-2xl w-full max-w-lg max-h-[92dvh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
      <button disabled={submitting} onClick={close} aria-label="Close booking form" className="absolute right-4 top-3 p-2 text-2xl">×</button>
      <p className="eyebrow text-[10px] text-[#8a6526] mb-3">Your next adventure</p>
      <h2 id="booking-title" className="teko text-3xl pr-5">{reference ? 'Request sent.' : 'Confirm your booking request'}</h2>
      {reference ? <div role="status" className="py-6">
        <p className="leading-relaxed">Your trip details and contact number have been sent to our team. We’ll contact you to confirm availability and the final arrangements.</p>
        <p className="my-5 p-4 bg-[#F1E8D6] rounded-lg text-sm">Booking reference: <strong>{reference}</strong></p>
        <p className="text-sm mb-6">No payment has been collected.</p>
        <button onClick={close} className="w-full bg-[#221A10] text-white rounded-lg py-3">Done</button>
      </div> : <>
        <p className="mt-3 mb-6 text-sm text-[#4A3B28]">{packageName} · {currency}{Number(price).toLocaleString('en-IN')} per person</p>
        <form onSubmit={submit} className="space-y-4">
          <fieldset disabled={submitting} className="space-y-4">
            <label className="block text-sm">Full name <span aria-hidden="true">*</span><input ref={firstInput} name="name" autoComplete="name" minLength={2} maxLength={100} required value={form.name} onChange={change} className={field} /></label>
            <label className="block text-sm">Contact number <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" minLength={7} maxLength={25} pattern="[+0-9 ()\-]{7,25}" required value={form.phone} onChange={change} className={field} /></label>
            <label className="block text-sm">Email <span className="text-[#4A3B28]">(optional)</span><input name="email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={change} className={field} /></label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-sm">Travellers <input name="travellers" type="number" min="1" max="50" required value={form.travellers} onChange={change} className={field} /></label>
              <label className="block text-sm">Travel date <input name="travelDate" type="date" min={new Date().toLocaleDateString('en-CA', {timeZone:'Asia/Kolkata'})} required value={form.travelDate} onChange={change} className={`${field} min-w-0`} /></label>
            </div>
            <label className="block text-sm">Anything we should know? <textarea name="message" rows={2} maxLength={2000} value={form.message} onChange={change} className={field} /></label>
          </fieldset>
          <div className="flex justify-between text-sm bg-[#F1E8D6] p-4 rounded-lg"><span>Estimated trip total</span><strong>{currency}{(price * (Number(form.travellers) || 0)).toLocaleString('en-IN')}</strong></div>
          <p className="text-xs text-[#4A3B28] leading-relaxed">Confirming sends your details to our team by email. Availability and final arrangements will be confirmed by phone. No online payment required.</p>
          {error && <p role="alert" className="p-3 border border-red-200 bg-red-50 text-red-800 text-sm rounded-lg">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full rounded-lg bg-[#221A10] hover:bg-[#4A3B28] text-white py-3.5 text-sm">{submitting ? 'Sending your request…' : 'Confirm booking request'}</button>
        </form>
      </>}
    </section>
  </div>;
}
BookNowForm.propTypes = { isOpen: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired, productId: PropTypes.string.isRequired, packageName: PropTypes.string.isRequired, price: PropTypes.number.isRequired, currency: PropTypes.string };
