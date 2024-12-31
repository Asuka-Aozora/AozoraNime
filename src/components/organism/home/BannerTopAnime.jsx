import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useGetopAnime } from '@/hooks/useGetopAnime';
import React, { useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

const BannerTopAnime = () => {
  const [animeData,setAnimeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [videoUrl, setVideoUrl] = useState(""); 

  // Fungsi membuka modal
  const openVideo = (url) => {
    setVideoUrl(url); // Set URL video
    setIsOpen(true); // Tampilkan modal
  };

  // Fungsi menutup modal
  const closeModal = () => {
    setIsOpen(false);
    setVideoUrl("");
  };

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await useGetopAnime();
            setAnimeData(data); 
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };
    fetchData(); 
}, []);

  console.log(animeData);
  if(loading) return <h1>Loading...</h1>;
  return (
    <section className="py-8 ">
      <div className="relative max-w-6xl mx-auto">
        <Carousel className="w-full cursor-pointer">
          <CarouselContent>
            {animeData.map((item) => {
              const animeImage = item?.trailer?.images?.maximum_image_url;
              const animeTitle = item?.title;
              const animeUrl = item?.trailer.embed_url;
              const animeGenre = item?.genres.map((genre) => genre.name).join(", ");

              // Debugging URL gambar
              console.log("Anime Image URL:", animeImage);
              
              // Memastikan animeImage ada
              if (!animeImage) {
                return <div key={item?.mal_id}>Gambar tidak ditemukan</div>;
              }

              return (
                <CarouselItem key={item?.mal_id}>
                  <div
                    className="relative w-full bg-cover bg-center h-[75vh] rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform "
                    style={{ backgroundImage: `url(${animeImage})` }}
                  >
                    <div className="absolute bottom-8 left-8 text-white">
                      <h2 className="text-5xl font-extrabold leading-tight mb-4 transition-all duration-300 transform hover:scale-105">
                        <Link to={`/anime/${item?.mal_id}`}>
                        {animeTitle}
                        </Link>
                      </h2>
                      <p className="mt-2 text-lg">{animeGenre}</p>
                        <Button
                          onClick={() => openVideo(animeUrl)}
                          variant="primary"
                          className="mt-4 px-6 py-3 text-lg rounded-lg hover:bg-yellow-600 transition-all duration-300"
                          >
                          Putar Trailer
                        </Button>
                        <Button
                          variant="secondary"
                          className="mt-4 ml-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </Button>
                    </div>
                  </div>
                </CarouselItem>
                
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
        </Carousel>
        {/* Modal Video */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white text-3xl font-bold"
              >
                &times;
              </button>
              {/* Video Player */}
              <iframe
                src={videoUrl}
                title="Trailer"
                className="w-full h-[500px] rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerTopAnime;
