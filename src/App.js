import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import SavedList from './Movies/SavedList';

export default function App () {
  const [movies, setMovies] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Server Error', error));
  }, []);

  const addToSavedList = movie => {
    setSaved([...saved, movie]);
  };

  return (
    <div>
      <SavedList list={saved} />
      <Routes>
        <Route path="/" element={<MovieList movies={movies} />} />
        <Route path="/movies/:id" element={<Movie addToSavedList={addToSavedList} />} />
      </Routes>
    </div>
  );
}
