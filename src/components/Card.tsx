"use client";
import { imgBaseUrl } from '@/config/index';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';

interface ICard{
  image: {
    src: string,
    alt: string,
  }
  id: number,
  title: string,
  rating: number,
  release: string,
  className?: string,
}

export default function Card({image, id, title, rating, release, className}: ICard) {
  return (
    <Link className={`relative w-[256px] h-96 m-auto group hover:scale-105 hover:z-10 hover:cursor-pointer transition-all duration-500 ${className}`} href={`/${id}`}>
      <Image src={imgBaseUrl+image.src} alt={title} sizes="100vw" fill className='object-contain' />
      <div className="content-desc relative top-full bg-gray-800 p-4 rounded-b-lg invisible group-hover:visible">
        <span id='content-title' className='text-white font-bold'>{title}</span>
        <div className='content-rating text-white flex items-center gap-2'><AiFillStar/>{rating}</div>
        <span className='text-white'>Release date: {release}</span>
      </div>
    </Link>
  );
}
