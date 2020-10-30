import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getFromLocalStorege, TSaveData } from "../utils/localeStorege";

export const History:React.FC<{lang: "ru"| "en"}> = ({lang}) => {
  const [data, setData] = useState<TSaveData[]>();
  const [isSort, setIsSort] = useState(false)
  useEffect(()=>{
    setData(getFromLocalStorege())
  },[])
  
  function getText(lang: "ru"|"en"){
    const textRu = {
      city: "Город",
      date: "История",
      notData: "Нет истории",
      t: "Температура",
      back: "Назад",
      getSort: "Сорировать"
    }
    const textEn = {
      city: "City",
      date: "History",
      notData: "Has not history",
      t: "Temperature",
      back: "Back",
      getSort: "Get Sort"
    }
    if(lang==='ru') return textRu
    return textEn
  }

  useEffect(()=>{
    const localeStorege = getFromLocalStorege()
    if(localeStorege) {
      if(isSort) setData(prev => {
        prev = localeStorege.sort((a, b)=> a.dt - b.dt)
        return prev
      })
      else setData(prev =>{
        prev = localeStorege.sort((a, b)=> b.dt - a.dt)
        return prev
      })
    }
  },[isSort])

  function getFormatDate(time:number) {
    const d = new Date(time)
    return `${d.getFullYear()}.${d.getMonth()+1}.${d.getHours()} - ${d.getHours()}:${d.getMinutes()}`
  }

  return <>
    <p>
      <Link to="/">{getText(lang).back}</Link>
      <button onClick={()=>setIsSort(prev => !prev)}>{getText(lang).getSort}</button>
    </p>

    {data 
      ? data.map(elem => <React.Fragment key={elem.dt}>
        <p>
          {`${getText(lang).city}: ${elem.city}`}
          <br />
          {`${getText(lang).date}: ${getFormatDate(elem.dt)}`}
          <br />
          {`${getText(lang).t}: ${elem.main.temp}`}
        </p>
          <hr />
      </React.Fragment>)
      : getText(lang).notData
    }
  </>
}