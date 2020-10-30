import React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './home/home';
import { History } from './history/history';
function App() {

  const [language, setLanguage] = React.useState<"ru"|'en'>('ru')

  React.useEffect(()=> {
    const userLang = navigator.language.substr(0,2)
    if(userLang !== 'ru') setLanguage('en')
  },[])

  return <>
  
  
  <Switch>
    {<Route path="/history">
      <History lang={language}/>
    </Route>}
    <Route path="/">
      <Home lang={language} />
    </Route>
  </Switch>
  </>
}

export default App;
