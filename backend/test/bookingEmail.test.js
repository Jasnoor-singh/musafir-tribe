import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBookingEmail, sendBookingEmail, validateBooking } from '../services/bookingEmail.js';
const valid = { productId: '6a2960e36381946afe50c454', requestId: '7e576b1c-bdbf-4347-bcda-f489fa8f47ec', name: 'Demo Traveller', phone: '+91 98765 43210', email: 'traveller@example.com', travelDate: '2099-10-01', travellers: 2, message: 'Vegetarian meals' };
const trip = { name:'Badrinath', price:2500 };
test('booking validates required contact details, date and traveller count', () => {
  assert.equal(validateBooking(valid).phone, valid.phone);
  for (const change of [{phone:''},{phone:'not a number'},{name:''},{travelDate:'2000-01-01'},{travelDate:'2099-02-31'},{travellers:0},{travellers:1.5},{email:'invalid'},{productId:'bad'},{requestId:'bad'}]) assert.throws(() => validateBooking({...valid,...change}));
});
test('booking email always goes to the selected owner and includes phone and trip', () => {
  const email = buildBookingEmail({...valid,to:'attacker@example.com'}, trip, 'onboarding@resend.dev');
  assert.deepEqual(email.to, ['singhjasnoor1421@gmail.com']);
  assert.equal(email.replyTo, valid.email);
  for (const text of [valid.phone, valid.name, trip.name, 'INR 5000', valid.travelDate]) assert.ok(email.text.includes(text));
});
test('provider acceptance returns a reference and retries reuse the idempotency key', async () => {
  const calls=[];
  const client={emails:{send:async (...args)=>{ calls.push(args); return {data:{id:'email-test'},error:null}; }}};
  const options={apiKey:'test-only',client};
  assert.equal((await sendBookingEmail(valid,trip,options)).reference,'7E576B1C');
  await sendBookingEmail(valid,trip,options);
  assert.equal(calls[0][1].idempotencyKey,calls[1][1].idempotencyKey);
});
test('missing credentials or provider rejection cannot report success', async () => {
  await assert.rejects(sendBookingEmail(valid,trip,{apiKey:''}));
  await assert.rejects(sendBookingEmail(valid,trip,{apiKey:'test-only',client:{emails:{send:async()=>({data:null,error:{message:'rejected'}})}}}));
});
