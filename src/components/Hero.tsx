import Image from "next/image";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Hero() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div id="hero" className="hero relative h-[75vh]">
      <Image
        src="https://image.tmdb.org/t/p/original/it7yPSgca2VEJyXAqgjfaccgvJm.jpg"
        alt="mockup"
        sizes="100vw"
        fill
        className="object-cover"
      />
      <div className="absolute max-w-[600px] left-20 top-1/3 flex flex-col gap-6">
        <span
          id="hero-title"
          className="block text-black dark:text-white text-6xl font-bold"
        >
          Elemental
        </span>
        <span
          id="hero-description"
          className="text-black dark:text-white block"
        >
          In a city where fire, water, land and air residents live together, a
          fiery young woman and a go-with-the-flow guy will discover something
          elemental: how much they have in common.
        </span>
        <button className="flex w-56 items-center justify-between gap-2 text-white text-2xl rounded-xl p-2 px-4 bg-gray-400 bg-opacity-70 hover:bg-opacity-40">
          <IoMdInformationCircleOutline />
          Selengkapnya
        </button>
      </div>
    </div>
  );
}
