import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import reducers from 'scripts/ducks/reducers'
import httpRequestMiddleware from 'scripts/middleware/httpRequestMiddleware'

export const history = createBrowserHistory()

export default function configureStore() {
  // prod環境か否かを返却
  const isProdEnv = () => process.env.NODE_ENV === 'production'
  // chromeのreduxdevtoolをprod環境以外に適用
  const addReduxDevTool = () => {
    return !isProdEnv()
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : undefined
  }
  const composeEnhancer = addReduxDevTool() || compose
  const middleware = [thunk, httpRequestMiddleware, routerMiddleware(history)]

  const rootReducer = combineReducers({
    ...reducers,
  })

  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(applyMiddleware(...middleware))
  )

  return store
}
