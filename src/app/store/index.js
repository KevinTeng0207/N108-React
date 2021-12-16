import {
    createStore,
    applyMiddleware
} from 'redux'
import logger from "redux-logger"
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'

const sagaMiddleware = createSagaMiddleware()
export default function configureStore(initialState) {
    let middlewarelist = process.env.NODE_ENV === 'production' ? [
        sagaMiddleware,
    ] : [logger,
        sagaMiddleware,
    ]

    return {
        ...createStore(
            rootReducer,
            initialState,
            applyMiddleware(
                ...middlewarelist
            ),
        ),
        runSaga: sagaMiddleware.run,
    }

}