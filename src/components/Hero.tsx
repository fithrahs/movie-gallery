import Loading from '@/components/Loading';
import { IMovieTopRatedResult } from '@/interfaces/index';
import Image from "next/image";
import Link from 'next/link';
import { IoMdInformationCircleOutline } from "react-icons/io";

interface IHeroProps {
  movie: IMovieTopRatedResult
}

export default function Hero({movie}: IHeroProps) {
  if(!movie) return <Loading/>
  return (
    <div id="hero" className="hero relative h-[75vh] hidden md:block mt-14">
      <Image
        src={'https://image.tmdb.org/t/p/original/'+movie.backdrop_path}
        alt={movie.title}
        sizes="100vw"
        fill
        className="object-cover"
      />
      <div className="absolute max-w-[600px] left-20 top-1/3 flex flex-col gap-6">
        <span
          id="hero-title"
          className="block text-black dark:text-white text-6xl font-bold"
        >
          {movie.title}
        </span>
        <span
          id="hero-description"
          className="text-black dark:text-white block"
        >
          {movie.overview}
        </span>
        <Link href={`/${movie.id}`} className="flex w-56 items-center justify-between gap-2 text-white text-2xl rounded-xl p-2 px-4 bg-gray-400 bg-opacity-70 hover:bg-opacity-40">
          <IoMdInformationCircleOutline />
          Selengkapnya
        </Link>
      </div>
    </div>
  );
}
