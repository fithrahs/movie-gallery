"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Loading from '@/components/Loading';
import { IMovieTopRatedResult } from '@/interfaces/index';
import { GET } from "@/services/api/api";
import { DEFAULT_API_CONFIG } from "@/services/api/url-api";

import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<IMovieTopRatedResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMovieTopRated = async () => {
      setIsLoading(true);
      await GET(DEFAULT_API_CONFIG.getMovieTopRated)
        .then((res) => {
          setMovies(res.res.results);
          setIsLoading(false)
        })
        .catch((err) => setIsLoading(false));
    };
    getMovieTopRated();
  }, []);

  return (
    <div className="bg-gray-900 pb-32 overflow-y-hidden relative">
      <Header />
      <Hero />
      {isLoading ? (
        <div className="mt-48">
          <Loading />
        </div>
      ) : (
        <div className="content grid grid-cols-1 gap-20 px-10 py-2.5 mt-48 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:mt-10">
          {movies.map((e) => (
            <Card
              key={e.id}
              image={{ src: e.poster_path, alt: e.title }}
              title={e.title}
              rating={e.vote_average}
              release={e.release_date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
