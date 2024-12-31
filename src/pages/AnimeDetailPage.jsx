import { GetAnimeById } from '@/hooks/useGetopAnime';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AnimeDetailPage() {
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await GetAnimeById(id);
        setAnimeData(data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-white">Loading...</h1>;
  }

  if (!animeData) {
    return <h1 className="text-center text-white">No data available</h1>;
  }

  const {
    images,
    title,
    synopsis,
    score,
    rating,
    episodes,
    trailer,
  } = animeData;

  const genreList = animeData.genres?.map((g) => g.name).join(", ") || "Unknown";
  const imageUrl = images?.webp?.large_image_url || "";
  const trailerUrl = trailer?.url || "#";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mb-10">
        <div
          className="relative w-full h-[60vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl font-extrabold">{title || "Unknown Title"}</h1>
            <p className="mt-2 text-lg opacity-80">{rating || "N/A"}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img
                src={imageUrl}
                alt={title || "Unknown Title"}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Synopsis</h2>
                <p className="text-gray-300">{synopsis || "No synopsis available."}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold">Score</h3>
                  <p className="text-xl text-yellow-400">{score || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Rating</h3>
                  <p className="text-gray-300">{rating || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Episodes</h3>
                  <p className="text-gray-300">{episodes || "Unknown"}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Genre</h3>
                  <p className="text-gray-300">{genreList}</p>
                </div>
              </div>

              <div>
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-all"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetailPage;

