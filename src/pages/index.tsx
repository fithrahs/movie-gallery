import Loading from '@/components/Loading';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// lazyLoad component
const LazyLoadHomeComponent = dynamic(() => import('@/components/HomeServerComponent'), {
  ssr: false,
  loading: () => <div className="bg-gray-900 pb-32 overflow-y-hidden relative min-h-[100vh]">
    <div className="flex items-center justify-center min-h-[100vh]">
      <Loading />
    </div>
  </div>,
})

export const metadata: Metadata = {
  title: 'Browser - Movie Gallery',
}

export default function Home() {
  return (
    <LazyLoadHomeComponent />
  );
}
