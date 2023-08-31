import Card from '@/components/Card';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8,9,10, 11 ,12]
  const cardData = {
    image: {
      src: 'https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
      alt: 'img-1'
    },
    title: 'Elemental',
    rating: '7.8',
    release: '2023-06-14'
  }
  return (
    <div className='bg-gray-900 pb-32 overflow-y-hidden'>
      <Header />
      <Hero />
      <div className="content grid grid-cols-5 gap-20 px-10 py-2.5 mt-10">
        {data.map(() => (
          <Card key={1} image={cardData.image} title={cardData.title} rating={cardData.rating} release={cardData.release} />
        ))}
      </div>
    </div>
  );
}
