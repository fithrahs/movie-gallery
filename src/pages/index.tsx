import Loading from '@/components/Loading';
import { IMovieTopRated, IMovieTopRatedResult } from '@/interfaces/index';
import { GET } from '@/services/api/api';
import { DEFAULT_API_CONFIG } from '@/services/api/url-api';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

interface IHomeProps {
  movies: IMovieTopRatedResult[]
}

// lazyLoad component
const LazyLoadHomeComponent = dynamic(() => import('@/components/HomeServerComponent'), {
  ssr: false,
  loading: () => <div className="bg-gray-900 pb-32 overflow-y-hidden relative min-h-[100vh]">
    <div className="flex items-center justify-center min-h-[100vh]">
      <Loading />
    </div>
  </div>,
})

export default function Home({movies}: IHomeProps) {
  return (
    <>
      <Head>
        <title>Browser - Movie Gallery</title>
        <meta name="description" content="This website is for experimental purposes only."></meta>
      </Head>
      <LazyLoadHomeComponent defaultMovies={movies} />
    </>
  );
}

// implement SSR for SEO Frendly
export const getServerSideProps: GetServerSideProps<{
  movies: IMovieTopRated[]
}> = async () => {
  const movies = await GET(DEFAULT_API_CONFIG.getMovieTopRated)
      .then((res) => {
        return res.res.results
      })
      .catch((err) => console.log(err));
  return { props: { movies } }
}
