import Link from '../../atoms/Link';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string
}

const NavigationBar = ({ className }: Props) => {

  return (
    <div className={twMerge('mt-0 gap-2.5 flex justify-between items-center lg:gap-10', className)}>
      < Link href='#' className='mr-auto' >
        <div className="">Home</div>
      </Link >
      <Link href='#about'>
        <div className="">About me</div>
      </Link>
      <Link href='#skills'>
        <div className="">Skills</div>
      </Link>
      <Link href='#blogs'>
        <div className="">Blog</div>
      </Link>
    </div >
  );
};

export default NavigationBar;
