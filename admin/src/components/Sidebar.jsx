
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard, MdOutlineAddLocationAlt, MdOutlineListAlt, MdOutlineShoppingBag } from "react-icons/md";

const items = [
  { to: "/", label: "Dashboard", Icon: MdOutlineDashboard, end: true },
  { to: "/add", label: "Add Trip", Icon: MdOutlineAddLocationAlt },
  { to: "/list", label: "All Trips", Icon: MdOutlineListAlt },
  { to: "/orders", label: "Orders", Icon: MdOutlineShoppingBag },
]

const Sidebar = () => {
  return (
    <aside className='w-[64px] md:w-[220px] min-h-[calc(100vh-66px)] bg-[#221A10] shrink-0'>
      <nav className='flex flex-col gap-1 pt-6 px-2 md:px-3'>
        {items.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-sm transition-colors duration-200 ${
                isActive
                  ? 'bg-[#C2913B]/15 text-[#E3B95C] border-l-2 border-[#C2913B]'
                  : 'text-[#FBF7EE]/55 hover:text-[#E3B95C] border-l-2 border-transparent'
              }`
            }
          >
            <Icon className='w-5 h-5 shrink-0' />
            <span className='hidden md:block eyebrow text-[10px]'>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
