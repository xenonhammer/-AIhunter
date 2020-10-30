import { TWeatherActions } from '../actions/weatherActions';
import { TObj } from '../store';
import { IWeather } from './../../interfaces/IWeather';
type TState = {
  weatherItem?:IWeather
  
}
const initialState: TState = {}

export const weatherReducer = (state=initialState, action: TObj<TWeatherActions>) => {
  switch (action.type) {
    case 'GET_INFO_BY_CITY':
      return {
        ...state, 
        weatherItem: action.payload
      }
    
    default:
      return state
  }
}