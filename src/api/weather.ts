import { IWeather } from './../interfaces/IWeather';
export const WeatherAPI = {
  get: async (coord: number[],lang: string): Promise<Promise<IWeather> | string> => {
    
    try {
      const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast`
      +`?lat=${coord[0]}`
      +`&lon=${coord[1]}`
      +`&lang=${lang}`
      +`&units=metric`
      +`&appid=ce1fe59a97e1d3ca691fd2a7a7a2db8a`
      );
      return await res.json();
    } catch (error) {
      return error;
    }
  },
  getHistory: async (start:number, end:number, coord: number[]): Promise<Promise<IWeather> | string> => {
    try {
      const res = await fetch(
      "http://history.openweathermap.org/data/2.5/history/city"
      +`?lat=${coord[0]}`
      +`&lon=${coord[1]}`
      +`&type=hour`
      +`&start=${start}`
      +`&end=${end}`
      +`&cnt={cnt}`
      +`&appid=ce1fe59a97e1d3ca691fd2a7a7a2db8a`
      );
      return await res.json();
    } catch (error) {
      return error;
    }
  }

}