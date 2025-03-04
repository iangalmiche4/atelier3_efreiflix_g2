import React, { useEffect, useState, Suspense } from "react";
import { Play, Check, Download, X, MessageCircle } from "lucide-react";
import axios from "axios";
import './styles.css';

const Comments = React.lazy(() => import('comments/Comments'));

const MovieCard = ({ id }) => {
  const [movie, setMovie] = useState(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('id', id);
        const response = await axios.get(`http://localhost:3001/movies/?id=${id}`);
        const apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';
        const movieData = response.data[0];

        const posterResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieData.title}`);
        const posterPath = posterResponse.data.results[0]?.poster_path;
        setMovie({
          ...movieData,
          posterUrl: `http://image.tmdb.org/t/p/w500/${posterPath}`,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des films :", error);
      }
    };

    fetchMovies();
  }, [id]);

  if (!movie) return <div className="p-4 text-white text-center">Chargement...</div>;

  return (
    <>
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-black text-white rounded-lg overflow-hidden shadow-2xl">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 flex flex-col justify-end">
          <p className="text-sm text-gray-300">{movie.year} • 55 sur 60 min</p>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 text-sm mt-2">{movie.description}</p>
          <div className="flex gap-2 mt-3">
            {movie.genres.map((genre, index) => (
              <span key={index} className="bg-gray-800 px-2 py-1 text-xs rounded">
                {genre}
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-xs text-gray-400">À énigmes</span>
            <span className="text-xs text-gray-400">Cérébral</span>
            <span className="text-xs text-gray-400">Onirique</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Distribution: {movie.actors?.join(", ") || "Inconnu"}
          </p>
          <div className="mt-4 flex gap-4">
            <button className="flex items-center bg-white text-black px-6 py-2 font-bold rounded text-lg">
              <Play className="w-5 h-5 mr-2" /> Reprendre
            </button>
            <button className="flex items-center bg-gray-700 px-4 py-2 rounded-full">
              <Check className="w-5 h-5" />
            </button>
            <button className="flex items-center bg-gray-700 px-4 py-2 rounded-full">
              <Download className="w-5 h-5" />
            </button>
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            >
              <MessageCircle className="w-5 h-5 mr-2" /> Commentaires
            </button>
          </div>
        </div>
      </div>
      {isCommentsOpen && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Commentaires</h3>
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              onClick={() => setIsCommentsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-[400px] overflow-y-auto p-2 bg-gray-800 rounded-lg">
            <Suspense fallback={<div className="text-white text-center p-4">Chargement des commentaires...</div>}>
              <Comments id={id} />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
