import PropTypes from 'prop-types';


/**
 * Section "house mark" — spaced-caps serif in two tones with a
 * hairline gold rule. Same {text1, text2} API as before so every
 * page upgrades automatically.
 */
const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex flex-col mb-4'>
      <span className='eyebrow text-[10px] sm:text-[11px] text-[#C2913B] mb-2'>
        Musafir Tribe
      </span>
      <div className='flex items-center gap-4'>
        <p className='teko text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] leading-none text-[#221A10]'>
          {text1} <span className='text-[#C2913B] italic font-light'>{text2}</span>
        </p>
        <span className='hidden sm:block w-16 h-px bg-[#C2913B]/60' />
      </div>
    </div>
  )
}

export default Title

Title.propTypes = {text1: PropTypes.string, text2: PropTypes.string};
