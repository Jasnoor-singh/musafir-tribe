import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from "react";
import axios from 'axios'
import { backendUrl, currency } from '../lib/config'
import { toast } from 'react-toastify'
import { MdOutlineLandscape, MdOutlineShoppingBag, MdOutlinePeopleAlt, MdOutlinePayments } from "react-icons/md";

const StatCard = ({ Icon, label, value, hint }) => (
  <div className='bg-[#FFFDF8] border border-[#221A10]/10 p-5 flex flex-col gap-3 hover:shadow-[0_18px_40px_rgba(34,26,16,0.10)] transition-shadow'>
    <div className='flex items-center justify-between'>
      <span className='eyebrow text-[9px] text-[#221A10]/50'>{label}</span>
      <Icon className='w-5 h-5 text-[#C2913B]' />
    </div>
    <p className='serif text-3xl text-[#221A10] leading-none'>{value}</p>
    {hint && <p className='text-[11px] text-[#221A10]/45'>{hint}</p>}
  </div>
)

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/stats", { headers: { token } })
      if (response.data.success) {
        setStats(response.data.stats)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchStats() }, [fetchStats])

  const fmt = (n) => Number(n || 0).toLocaleString("en-IN")
  const maxCat = stats?.tripsByCategory?.length
    ? Math.max(...stats.tripsByCategory.map((c) => c.count))
    : 1

  return (
    <div>
      <p className='eyebrow text-[10px] text-[#C2913B] mb-1'>Overview</p>
      <h2 className='serif text-3xl text-[#221A10] mb-8'>Dashboard</h2>

      {loading ? (
        <p className='text-sm text-[#221A10]/50'>Loading stats…</p>
      ) : !stats ? (
        <p className='text-sm text-[#221A10]/50'>Stats unavailable. Check that the backend is running.</p>
      ) : (
        <>
          {/* Stat cards */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            <StatCard Icon={MdOutlineLandscape} label="Trips live" value={fmt(stats.totalTrips)} />
            <StatCard Icon={MdOutlineShoppingBag} label="Total orders" value={fmt(stats.totalOrders)} hint={`${fmt(stats.pendingOrders)} pending`} />
            <StatCard Icon={MdOutlinePayments} label="Revenue" value={`${currency}${fmt(stats.totalRevenue)}`} />
            <StatCard Icon={MdOutlinePeopleAlt} label="Travellers" value={fmt(stats.totalUsers)} hint="registered users" />
          </div>

          <div className='grid lg:grid-cols-[1fr_1.4fr] gap-4 mt-4'>
            {/* Trips by category */}
            <div className='bg-[#FFFDF8] border border-[#221A10]/10 p-5'>
              <p className='eyebrow text-[9px] text-[#221A10]/50 mb-5'>Trips by category</p>
              {stats.tripsByCategory.length === 0 ? (
                <p className='text-sm text-[#221A10]/45'>No trips yet — add your first from “Add Trip”.</p>
              ) : (
                <div className='flex flex-col gap-4'>
                  {stats.tripsByCategory.map((c) => (
                    <div key={c.category}>
                      <div className='flex justify-between text-xs mb-1.5'>
                        <span className='text-[#221A10]/75'>{c.category}</span>
                        <span className='text-[#221A10]/45'>{c.count}</span>
                      </div>
                      <div className='h-1.5 bg-[#F1E8D6] overflow-hidden'>
                        <div className='h-full bg-[#C2913B]' style={{ width: `${(c.count / maxCat) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent orders */}
            <div className='bg-[#FFFDF8] border border-[#221A10]/10 p-5'>
              <p className='eyebrow text-[9px] text-[#221A10]/50 mb-5'>Recent orders</p>
              {stats.recentOrders.length === 0 ? (
                <p className='text-sm text-[#221A10]/45'>No orders yet.</p>
              ) : (
                <div className='flex flex-col divide-y divide-[#221A10]/8'>
                  {stats.recentOrders.map((o, i) => (
                    <div key={i} className='py-3 flex items-center justify-between gap-3 text-sm'>
                      <div className='min-w-0'>
                        <p className='text-[#221A10] truncate'>
                          {o.items?.map((it) => it.name).join(", ") || "Order"}
                        </p>
                        <p className='text-[11px] text-[#221A10]/45'>
                          {new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          {" · "}{o.paymentMethod}
                        </p>
                      </div>
                      <div className='text-right shrink-0'>
                        <p className='serif text-[#221A10]'>{currency}{fmt(o.amount)}</p>
                        <p className='eyebrow text-[8px] text-[#C2913B]'>{o.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard

Dashboard.propTypes = {token: PropTypes.string.isRequired};

StatCard.propTypes = { Icon: PropTypes.elementType, label: PropTypes.string, value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), hint: PropTypes.string };
