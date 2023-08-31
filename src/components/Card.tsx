import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

interface ICard{
  image: {
    src: string,
    alt: string,
  }
  title: string,
  rating: string,
  release: string,
  key: number,
  className?: string,
}

export default function Card({image, title, rating, release, key, className}: ICard) {
  return (
    <div className={`relative w-[256px] h-96 group hover:scale-105 hover:z-10 hover:cursor-pointer transition-all duration-500 ${className}`} key={key}>
      <Image src={image.src} alt="mockup" sizes="100vw" fill className='object-contain' />
      <div className="content-desc relative top-full bg-gray-800 p-4 rounded-b-lg invisible group-hover:visible">
        <span id='content-title' className='text-white font-bold'>{title}</span>
        <div className='content-rating text-white flex items-center gap-2'><AiFillStar/>{rating}</div>
        <span className='text-white'>Release date: {release}</span>
      </div>
    </div>
  );
}
