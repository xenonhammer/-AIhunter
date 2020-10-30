export interface IWeather {
  cnt: number
  cod: string
  city: IWeatherCity
  list: IWeatherList[]
  message: number
}

export interface IWeatherCity {
  coord: {lat: number, lon: number}
  country: string
  id: number
  name: string
  population: number
  sunrise: number
  sunset: number
  timezone: number
}
export interface IMain { 
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
  temp: number
  temp_kf: number
  temp_max: number
  temp_min: number
}
export interface IWeatherList {
  clouds: {all: number}
  dt: number
  dt_txt: string
  main: IMain
  pop: number
  sys: {pod: string}
  visibility: number
  weather: {id: number, main: string, description: string, icon: string}[]
  wind: {speed: number, deg: number}
}