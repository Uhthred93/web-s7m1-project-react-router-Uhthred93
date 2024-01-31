import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={() => addToSavedList(movie)}>Save</div>
    </div>
  );
}