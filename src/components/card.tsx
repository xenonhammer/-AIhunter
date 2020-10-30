import React from "react"
import { IWeatherList } from "../interfaces/IWeather"

export const Card:React.FC<{weather: IWeatherList, lang: "ru"|"en"}> = ({weather, lang}) => {
  

  function getText(lang: "ru"|"en"){
    const textRu = {
      date: "Дата:",
      t: "Температура:"
    }
    const textEn = {
      date: "Date:",
      t: "Temperature:"
    }
    if(lang==='ru') return textRu
    return textEn
  }

  return <>
    <p>{`${getText(lang).date} ${weather.dt_txt}`}
    <br />
    {`${getText(lang).t} ${weather.main.temp}`}</p>
    <hr />  
  </>
}