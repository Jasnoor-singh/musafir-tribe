import test from 'node:test';
import assert from 'node:assert/strict';
import { priceOrder } from '../services/orderValidation.js';
const products = [{ _id: 'trip1', name: 'Mountain trip', price: 2500, image: [] }];
test('prices come from the catalogue, never the client', () => {
  const result = priceOrder([{ _id: 'trip1', quantity: 2, price: 1, name: 'forged' }], products);
  assert.equal(result.amount, 5010);
  assert.equal(result.items[0].price, 2500);
  assert.equal(result.items[0].name, 'Mountain trip');
});
test('rejects empty, unavailable and duplicate journeys', () => {
  for (const items of [[], [{ _id: 'missing', quantity: 1 }], [{ _id: 'trip1', quantity: 1 }, { _id: 'trip1', quantity: 1 }]]) assert.throws(() => priceOrder(items, products));
});
test('rejects zero, negative, fractional, string and excessive quantities', () => {
  for (const quantity of [0, -1, 1.5, '2', 100, null]) assert.throws(() => priceOrder([{ _id: 'trip1', quantity }], products));
});
