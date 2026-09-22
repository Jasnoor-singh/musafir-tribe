
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-[50vh] flex flex-col items-center justify-center text-center py-20'>
      <span className='eyebrow text-[11px] text-[#C2913B] mb-3'>404</span>
      <h1 className='teko-head text-4xl sm:text-5xl text-[#221A10] mb-4'>
        This trail doesn’t exist.
      </h1>
      <p className='text-[#221A10]/55 font-light max-w-md mb-8'>
        The page you’re looking for may have moved, or the link might be off.
        Let’s get you back to exploring journeys.
      </p>
      <Link
        to='/'
        className='px-9 py-3.5 bg-[#C2913B] text-[#221A10] eyebrow text-xs border border-[#C2913B] hover:bg-[#221A10] hover:text-[#E3B95C] transition-colors duration-300'
      >
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
