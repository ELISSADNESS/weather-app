import { useState, useEffect } from 'react';

import { Carousel } from '@mantine/carousel';

import '@mantine/carousel/styles.css';

import styles from './app.module.css';

const API = "https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&start_date=2023-12-04&end_date=2023-12-06"

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
      
    }
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

    return (
      <>
        <h1>Weather App</h1>

        {/* <Carousel slideSize="70%" height={200} slideGap="xl" controlsOffset="xs" controlSize={40} loop withIndicators >
          <Carousel.Slide className={styles.slide}>
            <p>Максимальная температура вчера: {weather.data.daily.temperature_2m_max[0]}</p>
            <p>Минимальная температура вчера: {weather.data.daily.temperature_2m_min[0]}</p>
          </Carousel.Slide>
          <Carousel.Slide className={styles.slide}>
            <h2>Температура сейчас: {weather.data.current.temperature_2m}</h2>
            <p>Максимальная температура сегодня: {weather.data.daily.temperature_2m_max[1]}</p>
            <p>Минимальная температура сегодня: {weather.data.daily.temperature_2m_min[1]}</p> 
          </Carousel.Slide>
          <Carousel.Slide className={styles.slide}>
            <p>Максимальная температура завтра: {weather.data.daily.temperature_2m_max[2]}</p>
            <p>Минимальная температура завтра: {weather.data.daily.temperature_2m_min[2]}</p>
          </Carousel.Slide>
        </Carousel> */}


        {
          weather.data &&
          <Carousel {...sliderStyle}>
            {
              weather.data.daily.time.map((item, index) => {
                <Carousel.Slide key={index}>
                  <p>{item}</p>
                  <p>{weather.data.daily.temperature_2m_max[index]}</p>
                  <p>{weather.data.daily.temperature_2m_min[index]}</p>
                </Carousel.Slide>
              })
            }
          </Carousel>
        }

      </>
    );
  }

  // return (
  //   <>

  //   </>
  // );
}

export default App;
