import PropTypes from 'prop-types';


const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`relative overflow-hidden rounded-sm ${className}`}
      {...props}
    >
      <div className="px-8 py-3 bg-[#C2913B] text-[#221A10] eyebrow text-xs sm:text-[13px]
                      border border-[#C2913B] rounded-sm
                      hover:bg-[#221A10] hover:text-[#E3B95C] hover:border-[#221A10]
                      transition-colors duration-300 ease-in-out">
        {children}
      </div>
    </button>
  );
};

export default Button;

Button.propTypes = {children: PropTypes.node, className: PropTypes.string};
