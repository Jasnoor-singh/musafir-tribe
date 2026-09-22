import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from "react";
import { backendUrl } from '../lib/config';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", { email, password })
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#221A10] p-12">
        <span className="eyebrow text-[11px] text-[#C2913B]">Musafir Tribe</span>
        <div>
          <h1 className="serif text-5xl text-[#FBF7EE] leading-tight">
            The journeys desk.
          </h1>
          <p className="mt-4 text-[#FBF7EE]/55 text-sm max-w-sm font-light leading-relaxed">
            Add trips, manage bookings, and keep the tribe moving — everything
            in one place.
          </p>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-[#C2913B] to-transparent" />
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <p className="eyebrow text-[10px] text-[#C2913B] mb-2">Admin Console</p>
          <h2 className="serif text-3xl text-[#221A10] mb-8">Sign in</h2>
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <label className="eyebrow text-[10px] text-[#221A10]/60 block mb-2">Email address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-3.5 py-3 text-sm"
                type="email"
                placeholder="you@musafirtribe.com"
                required
              />
            </div>
            <div>
              <label className="eyebrow text-[10px] text-[#221A10]/60 block mb-2">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
                className="w-full px-3.5 py-3 text-sm"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 eyebrow text-[11px] rounded-sm transition-colors duration-300 ${
                loading
                  ? 'bg-[#221A10]/40 text-[#FBF7EE]'
                  : 'bg-[#221A10] text-[#E3B95C] hover:bg-[#C2913B] hover:text-[#221A10]'
              }`}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.propTypes = {setToken: PropTypes.func.isRequired};
