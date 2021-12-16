import { fork } from 'redux-saga/effects'


import * as example from './example.js'



export default function* () {
  yield fork(example.getData)
}

