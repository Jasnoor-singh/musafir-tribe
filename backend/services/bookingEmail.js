import { Resend } from 'resend';
import validator from 'validator';

export const BOOKING_RECIPIENT = 'singhjasnoor1421@gmail.com';
export function validateBooking(body) {
  const text = (key, max) => typeof body[key] === 'string' ? body[key].trim().slice(0, max) : '';
  const booking = { productId: text('productId', 24), requestId: text('requestId', 36), name: text('name', 100),
    phone: text('phone', 25), email: text('email', 254), travelDate: text('travelDate', 10),
    travellers: Number(body.travellers), message: text('message', 2000) };
  if (!validator.isMongoId(booking.productId) || !validator.isUUID(booking.requestId, 4)) throw new Error('Choose a valid journey and try again.');
  if (booking.name.length < 2 || !/^\+?[\d\s()-]{7,25}$/.test(booking.phone) || booking.phone.replace(/\D/g, '').length < 7 || booking.phone.replace(/\D/g, '').length > 15) throw new Error('Enter your name and a valid contact number.');
  if (booking.email && !validator.isEmail(booking.email)) throw new Error('Enter a valid email address.');
  if (!Number.isInteger(booking.travellers) || booking.travellers < 1 || booking.travellers > 50) throw new Error('Choose between 1 and 50 travellers.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.travelDate) || !validator.isDate(booking.travelDate, {format:'YYYY-MM-DD', strictMode:true}) || booking.travelDate < new Date().toLocaleDateString('en-CA', {timeZone:'Asia/Kolkata'})) throw new Error('Choose today or a future travel date.');
  return booking;
}

export function buildBookingEmail(booking, trip, from) {
  return {
    from,
    to: [BOOKING_RECIPIENT],
    ...(booking.email ? { replyTo: booking.email } : {}),
    subject: `New booking request — ${trip.name.replace(/[\r\n]/g, ' ')} — ${booking.requestId.slice(0, 8).toUpperCase()}`,
    text: [
      'MUSAFIR TRIBE · BOOKING REQUEST',
      `Reference: ${booking.requestId}`,
      `Journey: ${trip.name}`,
      `Traveller: ${booking.name}`,
      `Contact number: ${booking.phone}`,
      `Email: ${booking.email || 'Not provided'}`,
      `Preferred travel date: ${booking.travelDate}`,
      `Travellers: ${booking.travellers}`,
      `Price per person: INR ${trip.price}`,
      `Estimated trip total: INR ${trip.price * booking.travellers}`,
      `Message: ${booking.message || 'None'}`,
      '',
      'Please contact the traveller to confirm availability and final details.',
      'No online payment has been collected.',
      'Musafir Tribe · Chitkara University',
    ].join('\n'),
  };
}

export async function sendBookingEmail(booking, trip, { apiKey = process.env.RESEND_API_KEY, from = process.env.RESEND_FROM_EMAIL || 'Musafir Tribe <onboarding@resend.dev>', client } = {}) {
  if (!apiKey) throw new Error('Booking email is not configured yet. Please contact us directly.');
  const resend = client || new Resend(apiKey);
  const { data, error } = await resend.emails.send(buildBookingEmail(booking, trip, from), { idempotencyKey: `booking/${booking.requestId}` });
  if (error || !data?.id) throw new Error('Your booking email could not be sent. Please retry or contact us directly.');
  return { reference: booking.requestId.slice(0, 8).toUpperCase(), emailId: data.id };
}
