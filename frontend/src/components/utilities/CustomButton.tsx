import { Link } from 'react-router-dom';

interface CustomButtonProps {
  to: string;
  text: string;
  type?: 'primary' | 'secondary';
  color?: string;
  extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({ to, text, type, extraProps = {} }) => {
  const primaryClasses = 'px-3 py-1 font-semibold rounded-3xl w-full border bg-[#D58418] text-center';
  const secondaryClasses = 'px-3 py-1 font-semibold rounded-3xl w-full border-[2px] border-[#D58418] bg-white text-center';
  const buttonClasses = type === 'primary' ? primaryClasses : secondaryClasses;


  return (
    <Link to={to} className={buttonClasses} {...extraProps}>
      {text}
    </Link>
  );
};

export default CustomButton;
