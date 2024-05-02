import Image from "next/image";
const Loader = () => (
  <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
    <Image
      src="https://i.giphy.com/PkoBC2GlkLJ5yFIWtf.webp"
      alt='loader'
      width={100}
      height={100}
      className='object-contain'
    />
    <p className='text-sm font-bold text-primary-grey-300'>Please Wait...</p>
  </div>
);

export default Loader;
