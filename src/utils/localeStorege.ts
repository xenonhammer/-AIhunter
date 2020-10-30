import { DaDataSuggestion, DaDataAddress } from "react-dadata"
import { IMain } from "../interfaces/IWeather"
export type TSaveData = {
  city: string;
  coords: number[];
  dt: number;
  main: IMain;
}
export function saveToLocaleStorege
<T, U extends DaDataSuggestion<DaDataAddress>>
(
  city:U, weather: T
): void {

  const lat = +city.data?.geo_lat!
  const lon = +city.data?.geo_lon!
  const locale = city.data.city
  const dt = Date.now()
  const main = weather

  const saveData = {
    city: locale,
    coords: [lat, lon],
    dt,
    main
  }
  const rowLocalState = window.localStorage.getItem('city')

  if(!!rowLocalState) {
    let localStorage: TSaveData[] = JSON.parse(rowLocalState)
    
    const newlocalStorage=localStorage.filter(elem => !(elem.coords[0]===lat&&elem.coords[1]=== lon))
    window.localStorage.setItem('city',JSON.stringify([...newlocalStorage, saveData]))
    
  }else {
    window.localStorage.setItem('city',JSON.stringify([saveData]))}

}

export function getFromLocalStorege(): TSaveData[] | undefined {
  const rowLocalState = window.localStorage.getItem('city')
  if(rowLocalState) return JSON.parse(rowLocalState)
  else return undefined
}