"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Loading from '@/components/Loading';
import { IMovieTopRatedResult, ISearchKeyword } from "@/interfaces/index";
import { GET } from "@/services/api/api";
import { DEFAULT_API_CONFIG } from "@/services/api/url-api";
import { mapYear } from '@/utils/index';
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<IMovieTopRatedResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [keywordList, setKeywordList] = useState<ISearchKeyword[]>([])

  const getMovieTopRated = async () => {
    setIsLoading(true);
    await GET(DEFAULT_API_CONFIG.getMovieTopRated)
      .then((res) => {
        setMovies(res.res.results);
        setIsLoading(false)
      })
      .catch((err) => setIsLoading(false));
  };

  const getSearchKeyword = async () => {
    await GET(DEFAULT_API_CONFIG.getSearchKeyword, {query: search})
      .then((res) => {
        setKeywordList(res.res.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovieTopRated();
  }, []);

  useEffect(() => {
    const getSearchMovie =  async () => {
      setIsLoading(true);
      await GET(DEFAULT_API_CONFIG.getSearchMovie, {query: search}).then((res) => {
        setMovies(res.res.results);
        setIsLoading(false)
      })
      .catch((err) => setIsLoading(false));
    }
    if(search) {
      getSearchKeyword()
      getSearchMovie()
    } else {
      setKeywordList([])
      getMovieTopRated()
    }
  }, [search])

  const year = mapYear(movies);

  return (
    <div className="bg-gray-900 pb-32 overflow-y-hidden relative">
      <Header setSearch={(payload: string) => setSearch(payload)} yearList={year} setSelectedYear={(payload) => setSelectedYear(payload)} searchList={keywordList} />
      <Hero movie={movies[0]} />
      {isLoading && movies.length === 0 ? (
        <div className="mt-48">
          <Loading />
        </div>
      ) : (
        <div className="content grid grid-cols-1 gap-20 px-10 py-2.5 mt-48 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:mt-10">
          {movies.filter((e) => e.release_date.toString().includes(selectedYear)).map((e) => {
            return <Card
              key={e.id}
              id={e.id}
              image={{ src: e.poster_path, alt: e.title }}
              title={e.title}
              rating={e.vote_average}
              release={e.release_date}
            />
          })}
        </div>
      )}
    </div>
  );
}
