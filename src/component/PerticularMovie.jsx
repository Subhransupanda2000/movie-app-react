import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";

const ParticularMovie = () => {
  const location = useLocation();
  const specificMovie = location.state?.cards; // Optional chaining to handle undefined location.state
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    if (specificMovie?.id) {
      getTrailer(specificMovie.id);
    }
  }, [specificMovie]);

  // Fetch movie trailer using async/await
  const getTrailer = async (id) => {
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c202f0c11aa8b52272804f5b020a8667`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setTrailer(data.results[0]?.key);
      } else {
        setError("No trailer available.");
      }
    } catch (error) {
      setError("Failed to fetch trailer.");
      console.error("Error fetching trailer:", error);
    } finally {
      setLoading(false); // Set loading state to false after the fetch is done
    }
  };

  // If specificMovie is undefined or missing, show a fallback
  if (!specificMovie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div>
      <section id="particular">
        {specificMovie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${specificMovie.backdrop_path}`}
            alt="Movie backdrop"
            style={{ width: "60%", height: "400px" }}
            id="img"
          />
        ) : (
          <p>No image available</p>
        )}
        <h3 id="h3">{specificMovie.title || "Title not available"}</h3>
        <p id="p">{specificMovie.overview || "No overview available"}</p>
        <b id="b">Rating: {specificMovie.vote_average || "N/A"}</b>
        <br />
        <button onClick={() => getTrailer(specificMovie.id)} id="button">
          Watch Trailer
        </button>

        {/* Display loading state or error */}
        {loading && <p>Loading trailer...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Render the trailer if available */}
        <div id="div">
          {trailer ? (
            <YouTube videoId={trailer} />
          ) : (
            <p>No trailer available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ParticularMovie;
