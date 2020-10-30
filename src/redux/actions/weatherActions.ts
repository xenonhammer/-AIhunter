import { DaDataSuggestion, DaDataAddress } from 'react-dadata';
import { BaseTThunk, TObj } from '../store';
import { WeatherAPI } from './../../api/weather';
import { IWeather } from './../../interfaces/IWeather';

export type TWeatherActions = typeof weatherActions 
type TThunk = BaseTThunk<TObj<TWeatherActions>>


export const weatherActions = {
  get: (weather: IWeather)=> ({
    type: "GET_INFO_BY_CITY",
    payload: weather
  }as const),
  
}

export const weatherThunks = {
  get: (city: DaDataSuggestion<DaDataAddress>,lang: string):TThunk  => async (dispatch)=> {
    const lat = +city.data?.geo_lat!
    const lon = +city.data?.geo_lon!
    const coords = [lat,lon]
    const res = await WeatherAPI.get(coords,lang)
    if(typeof res !== 'string'){
      dispatch(weatherActions.get(res))
    }
  }
}