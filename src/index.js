import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import dropPlanApp from './reducers'
import { addWorkItem } from './actions/index'

let store = createStore(dropPlanApp)

store.dispatch(addWorkItem('0', 'Diana', 'Task 1', 1.0, [{day: new Date(2018,2,1), remainingTime: 2}]));
store.dispatch(addWorkItem('1', 'Diana', 'Task 2', 1.0, [{day: new Date(2018,2,2), remainingTime: 2}, {day: new Date(2018,2,3), remainingTime: 2}]));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
