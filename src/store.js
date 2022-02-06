import Reducer from './reducers';
import {createStore} from 'redux';

let store = createStore(Reducer);
// console.log(store.dispatch({type:'snMoverR'}));

export {store};