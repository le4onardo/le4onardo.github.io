import Link from '../../atoms/Link';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string
}

const NavigationBar = ({ className }: Props) => {

  return (
    <div className={twMerge('tw:mt-0 tw:gap-2.5 tw:flex tw:justify-between tw:items-center tw:lg:gap-10', className)}>
      < Link href='#' className='tw:mr-auto' >
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
