"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { imgBaseUrl } from "@/config/index";
import {
  IDetailMovie,
  IMovieTopRatedResult,
  IProvider,
} from "@/interfaces/index";
import { GET } from "@/services/api/api";
import { DEFAULT_API_CONFIG } from "@/services/api/url-api";
import { mapYear } from "@/utils/index";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IPageProps {
  movie: IDetailMovie;
}

export default function Page({ movie: movieData }: IPageProps) {
  const router = useRouter();
  const [movie, setMovie] = useState<IDetailMovie>(movieData);
  const [providers, setProviders] = useState<IProvider>();
  const [recommendations, setRecommendation] = useState<IMovieTopRatedResult[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>("");

  const { id } = router.query;

  const getDetailMovie = async () => {
    setIsLoading(true);
    await GET(`${DEFAULT_API_CONFIG.getDetailMovie}/${id}`)
      .then((res) => {
        setMovie(res.res);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  const getWatchProvider = async () => {
    setIsLoading(true);
    await GET(`${DEFAULT_API_CONFIG.getDetailMovie}/${id}/watch/providers`)
      .then((res) => {
        setProviders(res.res.results);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  const getRecommendationMovie = async () => {
    setIsLoading(true);
    await GET(`${DEFAULT_API_CONFIG.getDetailMovie}/${id}/recommendations`)
      .then((res) => {
        setRecommendation(res.res.results);
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  useEffect(() => {
    getDetailMovie();
    getWatchProvider();
    getRecommendationMovie();
  }, [id]);

  useEffect(() => {
    const getSearchMovie = async () => {
      setIsLoading(true);
      await GET(DEFAULT_API_CONFIG.getSearchMovie, { query: search })
        .then((res) => {
          setRecommendation(res.res.results);
          setIsLoading(false);
        })
        .catch((err) => setIsLoading(false));
    };

    if (search) {
      getSearchMovie();
    } else {
      getRecommendationMovie();
    }
  }, [search]);

  const year = mapYear(recommendations);

  return (
    <>
      <Head>
        <title>{movieData.title} - Movie Gallery</title>
        <meta name="description" content={movieData.overview} />
      </Head>
      <div className="bg-gray-900 pb-32 overflow-y-hidden relative min-h-[100vh]">
        <Header
          setSearch={(payload: string) => setSearch(payload)}
          yearList={year}
          setSelectedYear={(payload) => setSelectedYear(payload)}
        />
        {!search && !isLoading ? (
          <>
            <div className="flex flex-col mt-48 gap-16 px-10 py-32 bg-gray-700 2xl:px-96 xl:px52 lg:px-40 md:flex-row md:mt-0">
              <div className="relative min-w-[300px] min-h-[450px] mx-auto">
                <Image
                  src={imgBaseUrl + movie?.poster_path}
                  alt={movie ? movie.title : "img"}
                  width={300}
                  height={450}
                />
              </div>
              <div className="detail-desc text-white flex flex-col gap-4">
                <span
                  id="detail-title"
                  className="text-white font-bold text-2xl"
                >
                  {movie?.title}
                </span>
                <span>
                  <b>Overview:</b> {movie?.overview}
                </span>
                <span>
                  <b>Gendre:</b> {movie?.genres.map((e) => e.name).join(", ")}
                </span>
                <span>
                  <b>Release:</b> {movie?.release_date}
                </span>
                <span>
                  <b>Rating:</b> {movie?.vote_average}
                </span>
                <span>
                  <b>Subtitle:</b>{" "}
                  {movie?.spoken_languages
                    .map((e) => e.english_name)
                    .join(", ")}
                </span>
                <b>Watch Here: </b>
                <div className="detail-play flex flex-wrap flex-row items-center justify-start gap-5 mt-5">
                  {providers && providers["US"]?.flatrate
                    ? providers["US"].flatrate.map((e, i) => (
                        <div
                          className="relative w-24 h-24 hover:cursor-pointer"
                          key={i}
                          onClick={() =>
                            window.open(providers["US"].link, "_blank")
                          }
                        >
                          <Image
                            src={imgBaseUrl + e.logo_path}
                            alt={movie ? movie.title : "img"}
                            fill
                            sizes="100vw"
                          />
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="detail-recommendation px-10 mt-10">
              <span className="text-white font-bold text-3xl">
                Similar Movies
              </span>
              <div className="grid grid-cols-1 gap-20 py-2.5 mt-48 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:mt-10">
                {recommendations
                  ?.filter((e) =>
                    e.release_date.toString().includes(selectedYear)
                  )
                  .map((e) => {
                    return (
                      <Card
                        key={e.id}
                        id={e.id}
                        image={{ src: e.poster_path, alt: e.title }}
                        title={e.title}
                        rating={e.vote_average}
                        release={e.release_date}
                      />
                    );
                  })}
              </div>
            </div>
          </>
        ) : !isLoading ? (
          <div className="grid grid-cols-1 gap-20 py-2.5 mt-48 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:mt-20">
            {recommendations
              ?.filter((e) => e.release_date.toString().includes(selectedYear))
              .map((e) => {
                return (
                  <Card
                    key={e.id}
                    id={e.id}
                    image={{ src: e.poster_path, alt: e.title }}
                    title={e.title}
                    rating={e.vote_average}
                    release={e.release_date}
                  />
                );
              })}
          </div>
        ) : (
          <div className="mt-48">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}

// implement SSR for SEO Frendly
export const getServerSideProps: GetServerSideProps<{
  movie: IDetailMovie;
}> = async ({ query }) => {
  const movie = await GET(`${DEFAULT_API_CONFIG.getDetailMovie}/${query.id}`)
    .then((res) => {
      return res.res;
    })
    .catch((err) => console.log(err));
  return { props: { movie } };
};
