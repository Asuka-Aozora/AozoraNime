import { useGetRecommendations } from '@/hooks/useGetopAnime';
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Link } from 'react-router-dom';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
  
const RecomendationsAnime = () => {
    const [animeData,setAnimeData] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const data = await useGetRecommendations();
              setAnimeData(data); // Menyimpan data yang diterima ke state
          } catch (error) {
              console.error(error); // Menangani error jika terjadi
          } finally {
              setLoading(false); // Memastikan loading selesai
          }
      };
      fetchData(); // Menjalankan fungsi fetchData
  }, []); // Empty dependency array berarti hanya dijalankan sekali setelah komponen pertama kali dimuat

    console.log(animeData);
    if(loading) return <h1>Loading...</h1>;

  const kartu = animeData.map((item) => {
    const imageUrl = item?.entry[0].images?.webp?.large_image_url;
    const title = item.entry[0].title;

    return (
      <CarouselItem key={item.entry.mal_id} className="basis-1/5 h-[400px]">
        <Card className="bg-gray-800 text-white shadow-md transition-all hover:scale-105 hover:grayscale h-full relative overflow-hidden">
          <Link to={`/anime/${item.entry[0].mal_id}`}>
          <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          <CardHeader className="absolute inset-0 h-full w-full bg-gradient-to-t from-black via-transparent">
            <CardDescription 
              className="absolute bottom-4 left-4 text-lg text-white bg-opacity-70 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '4px 8px', borderRadius: '8px' }}
              >
              {title}
            </CardDescription>
          </CardHeader>
          </Link>
        </Card>
      </CarouselItem>
    );
  });

  return (
    <div>
      <header>
        <h1 className='text-2xl text-white'>Recomendation anime</h1>
      </header>
      <Carousel onClick={() => { console.log("clicked") }} className="cursor-pointer">
        <CarouselContent className="mt-10" >
          {kartu}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
      </Carousel>
    </div>
  );
}

export default RecomendationsAnime
