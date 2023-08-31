"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Loading from '@/components/Loading';
import { IMovieTopRatedResult, ISearchKeyword } from "@/interfaces/index";
import { GET } from "@/services/api/api";
import { DEFAULT_API_CONFIG } from "@/services/api/url-api";
import { mapYear } from '@/utils/index';
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

interface IHomeProps {
  defaultMovies: IMovieTopRatedResult[]
}

// lazyLoad component
const Card = dynamic(() => import('@/components/Card'), { ssr: false, loading: () => <p>Loading...</p>, })

export default function Home({defaultMovies}: IHomeProps) {
  const [movies, setMovies] = useState<IMovieTopRatedResult[]>(defaultMovies);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [keywordList, setKeywordList] = useState<ISearchKeyword[]>([])
  const [page, setPage] = useState<number>(1)

  // this function for hit movie top rated api and set to variable movies
  const getMovieTopRated = async () => {
    if (page > 1) {
      setIsLoading(true);
      await GET(DEFAULT_API_CONFIG.getMovieTopRated, {page: page.toString()})
        .then((res) => {
          // make sure that the page is 1 and set the data the page is more than 1, I copy the data and add other data to it so that the first data is not lost
          setMovies(movies => page === 1 ? res.res.results : [...movies, ...res.res.results] );
          setIsLoading(false)
        })
        .catch((err) => setIsLoading(false));
    }
  };

  // this function for hit search keyword api for the value of autocomplete.
  const getSearchKeyword = async () => {
    await GET(DEFAULT_API_CONFIG.getSearchKeyword, {query: search})
      .then((res) => {
        setKeywordList(res.res.results);
      })
      .catch((err) => console.log(err));
  };

  // this function for handle if user try to search
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
  
  useEffect(() => {
    getMovieTopRated()
  }, [page])

  // infinite scroll
  const handleScroll = () => {
    // Check if the user is already at the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
      setIsLoading(true)
      // if user already at the bottom of the page i set the page for hit the top rated api
      setPage(page => page + 1);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mapping all the years in the movies for data dropdown (filter by year)
  const year = mapYear(movies);

  return (
    <div className="bg-gray-900 pb-32 overflow-y-hidden relative min-h-[100vh]">
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
      {isLoading && movies.length > 0 && (
        <div className="mt-48">
          <Loading />
        </div>
      )}
      {search && !isLoading && movies.length === 0 && (
        <div className="px-10">
          <span className='text-white font-bold text-4xl'>{search} not found</span>
        </div>
      )}
    </div>
  );
}
