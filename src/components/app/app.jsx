import { useState, useEffect } from 'react';

import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';


const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-17&end_date=2023-12-19"

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const sliderStyle = {
  initialSlide: 1,
  slideSize: '70%',
  slideGap: 'md',
  withIndicators: true,
  includeGapInSize: false,
  controlSize: 40,
  styles: {
    slide: {
      border: '3px solid #fff',
      color: '#fff',
      // height: '50vh',
      borderRadius: '20px',
      padding: '2rem',
      paddingLeft: '6rem',
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
      <h1 style={{ padding: '15px', color: 'white' }}>Weather App</h1>

      {
        weather.data &&
        <Carousel {...sliderStyle}>
          {
            weather.data.daily.time.map((item, index) => (
              <Carousel.Slide key={index}>
                <div style={{display: 'flex', gap: '15px'}}>
                  {index === 0 && (<p style={{fontSize: '25px', fontWeight: 600}}>Вчера</p>)}
                  {index === 1 && (<p style={{fontSize: '25px', fontWeight: 600}}>Сегодня</p>)}
                  {index === 2 && (<p style={{fontSize: '25px', fontWeight: 600}}>Завтра</p>)}
                </div>

                {index === 1 && (<p style={{ fontSize: '50px', fontWeight: '600' }}>{weather.data.current.temperature_2m}°C</p>)}

                <p>максимальная температура: {weather.data.daily.temperature_2m_max[index]}°C</p>
                <p>минимальная температура: {weather.data.daily.temperature_2m_min[index]}°C</p>
              </Carousel.Slide>
            ))
          }
        </Carousel>
      }

    </>
  );
}

export default App;