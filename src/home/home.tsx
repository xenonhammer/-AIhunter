import React, { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from '../components/card';
import { IWeather, IWeatherList } from '../interfaces/IWeather';
import { weatherThunks } from '../redux/actions/weatherActions';
import { RootState } from '../redux/store';
import { saveToLocaleStorege } from '../utils/localeStorege';


export const Home:React.FC<{lang: "ru"|"en"}> = ({lang}) => {
  const dispatch = useDispatch()
  const {weather} = useSelector((state:RootState) => state)
  const [city, setCity] = useState<DaDataSuggestion<DaDataAddress>>();
  const [formatWeatherList, setFormatWeatherList] = useState<IWeatherList[]|undefined>()


 

  useLayoutEffect(()=>{
    if(!!city){
      dispatch(weatherThunks.get(city,lang))
    }
  }, [city])

  useEffect(()=> {
    setFormatWeatherList(weather.weatherItem?.list?.filter(elem =>{
      const date = new Date()
      if(elem.dt > date.setDate(date.getDate()+4)) return false
      else return true
    }))
    if(city) saveToLocaleStorege(city,weather.weatherItem?.list[0].main)
  }, [weather])
  
  function getText(lang: "ru"|"en"){
    const textRu = {
      city: "Город",
      history: "История",
      notData: "Начните поиск"
    }
    const textEn = {
      city: "City",
      history: "History",
      notData: "Go search"
    }
    if(lang==='ru') return textRu
    return textEn
  }

  return <>

  <AddressSuggestions 
    token="9a4536d96b15c822959dbdad2e3d5b11186d569b" 
    value={city} 
    onChange={setCity} 
    minChars={3}
    filterFromBound='city'
    filterToBound='city'
    filterLanguage={lang}
  />

  <Link to="/history"><h3>{`${getText(lang).history}`}</h3></Link>
  <p>{`${getText(lang).city} ${weather.weatherItem?.city?.name ?? ''}`}</p>
  <br />
  {formatWeatherList
    ? formatWeatherList.map(elem => <Card key={elem.dt} weather={elem} lang={lang} />)
    : getText(lang).notData
  }

  </>
}
