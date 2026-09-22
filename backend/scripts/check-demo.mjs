import 'dotenv/config';
const origin = 'http://localhost:4000';
const health = await fetch(`${origin}/api/health`).then(r => r.json());
console.log('API readiness:', health.status, health.database);
const login = await fetch(`${origin}/api/user/admin`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD})}).then(r=>r.json());
if (!login.success) throw new Error('Admin login failed');
console.log('Admin login: passed');
const stats=await fetch(`${origin}/api/admin/stats`,{headers:{token:login.token}}).then(r=>r.json());
console.log('Admin stats:',stats.success ? 'passed' : 'failed');
const catalogue=await fetch(`${origin}/api/product/list`).then(r=>r.json());
console.log('Catalogue:',catalogue.products.length,'journey(s)');
const product=catalogue.products.find(p=>p.name==='Badrinath' && p.category==='Men' && p.description==='We will be going here');
if (process.argv.includes('--fix-legacy-category') && product) {
  const data=new FormData();
  data.set('id',product._id); data.set('category','Mountains'); data.set('subCategory','Trip');
  data.set('description','Plan your visit to Badrinath. Share your preferred dates and group size, and our team will contact you with the itinerary, availability and final booking details.');
  const updated=await fetch(`${origin}/api/product/update`,{method:'POST',headers:{token:login.token},body:data}).then(r=>r.json());
  if(!updated.success) throw new Error(updated.message);
  console.log('Corrected legacy Badrinath clothing category and placeholder description.');
}
