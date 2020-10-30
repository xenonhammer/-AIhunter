import { weatherReducer } from './reducers/weathreReducer';
import {createStore, combineReducers, applyMiddleware, Action} from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'

const initialStore = {}
const middlewares = [thunk]

export type RootState = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
  weather: weatherReducer
})

const store = createStore(rootReducer, initialStore, composeWithDevTools(applyMiddleware(...middlewares)))

export type TObj<
  T extends {[key:string]:(...arg: any)=>any
}> = T extends {[key:string]: infer U} ? U extends (...arg: any)=> infer R ? R : any : any
export type BaseTThunk<A extends Action, R= Promise<any>> = ThunkAction<R, RootState, unknown, A>
export default store