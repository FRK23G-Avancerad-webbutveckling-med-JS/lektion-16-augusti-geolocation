import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [position, setPosition] = useState<GeolocationCoordinates>();

  useEffect(() => {
    if (position?.latitude) getTemperatures();
  }, [position]);

  function getPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setPosition(position.coords);
      });
    }
  }

  async function getTemperatures() {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${position?.latitude}&longitude=${position?.longitude}&hourly=temperature_2m&forecast_days=7`,
      {}
    );
    const data = await response.json();

    console.log(data);
  }

  return (
    <main>
      <button onClick={getPosition}>Hämta position</button>
      <p>Latitude: {position?.latitude}</p>
      <p>Longitude: {position?.longitude}</p>
    </main>
  );
}

export default App;
