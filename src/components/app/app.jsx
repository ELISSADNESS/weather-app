import { useState, useEffect } from 'react';

import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';


const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-06&end_date=2023-12-08"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const sliderStyle = {
  initialSlide: 1,
  slideSize: '70%',
  slideGap: 'md',
  withIndicators: false,
  includeGapInSize: false,
  styles: {
    slide: {
      // backgroundColor: '#ccecff',
      // backgroundColor: 'white',
      border: '3px solid #fff',
      color: '#fff',
      height: '50vh',
      borderRadius: '20px',
      padding: '2rem',
    },
  }
}

function App() {


  const [weather, setWeather] = useState({});

  const getData = () => {

    setWeather({ ...weather, isLoading: true });

    return fetch(`${API}`)
      .then(checkReponse)
      .then(response => setWeather({ ...weather, data: response, isLoading: false, hasError: false }))
      .catch(e => setWeather({ ...weather, loading: false, hasError: true }));
  }

  useEffect(() => {
    getData();
  }, []);

  if (weather.data) {
    console.log(weather.data);
  }

  return (
    <>
      <h1 style={{padding: '15px', color: 'white'}}>Weather App</h1>

      {
        weather.data &&
        <Carousel {...sliderStyle}>
          {
            weather.data.daily.time.map((item, index) => (
              <Carousel.Slide key={index}>
                <p style={{backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '110px', color: '#1d92db'}}>{item}</p>
                
                <p>{weather.data.current.temperature_2m}</p>
                <p>максимальная температура: {weather.data.daily.temperature_2m_max[index]}</p>
                <p>минимальная температура: {weather.data.daily.temperature_2m_min[index]}</p>
              </Carousel.Slide>
            ))
          }
        </Carousel>
      }

    </>
  );
}

export default App;
