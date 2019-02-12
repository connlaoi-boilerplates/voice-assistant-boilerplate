import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

const win = window

const configureStore = () => {
  const initialState = {
    app: {
      accessToken: localStorage.getItem('accessToken')
    }
  }

  const middlewares = [thunkMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant').default()) // eslint-disable-line
    middlewares.push(require('redux-logger').default) // eslint-disable-line
  }

  const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    win && win.devToolsExtension ? win.devToolsExtension() : (f) => f
  )

  const store = createStore(reducer, initialState, storeEnhancers)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default // eslint-disable-line
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

export default configureStore()
