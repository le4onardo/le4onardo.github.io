import './NavigationBar.css';
import Link from '../../atoms/Link';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string
}

const NavigationBar = ({ className }: Props) => {
  return (
    <div className={twMerge('flex justify-between items-center gap-10 backdrop-blur-sm', className)}>
      <Link href='#' className='mr-auto'>
        <div className="">Home</div>
      </Link>
      <Link href='#AboutMe'>
        <div className="">Skills</div>
      </Link>
      <Link href='#Skills'>
        <div className="">About me</div>
      </Link>
      <Link href='#Blogs'>
        <div className="">Blog</div>
      </Link>
    </div>
  );
};

export default NavigationBar;
