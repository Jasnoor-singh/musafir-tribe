import { spawn } from 'node:child_process';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const children = [];
const services = [['backend', 4000, 'server'], ['frontend', 5173, 'dev'], ['admin', 5174, 'dev']];
const available = port => new Promise(resolve => {
  const server = net.createServer();
  server.once('error', () => resolve(false));
  server.listen(port, () => server.close(() => resolve(true)));
});
for (const [name, port] of services) {
  if (!await available(port)) {
    console.error(`Port ${port} is already in use. Stop the existing ${name} process before running npm run dev.`);
    process.exit(1);
  }
}
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) { try { process.kill(-child.pid, 'SIGTERM'); } catch {} }
  process.exitCode = code;
}
for (const [name, , command] of services) {
  const child = spawn('npm', ['run', command], { cwd: `${root}${name}`, stdio: 'inherit', detached: true, env: { ...process.env, ...(name === 'backend' ? { PORT: '4000' } : {}) } });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code || 0); });
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
console.log('Storefront: http://localhost:5173 | Admin: http://localhost:5174 | API: http://localhost:4000');
