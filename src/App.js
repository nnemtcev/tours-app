import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  const removeTour = id => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsLoading(false);
      setTours(data);
    } catch (err) {
      setError(err);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetchTours();

    setIsLoading(false);
  }, []);

  if (isLoading) return <main><Loading /></main>;

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours available.</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh Tours
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

export default App
