import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
interface Modules {
    [key: string]: any;
};
// const modulesFiles = require.context('./reducers', false, /\.js$/)
// const modules:Modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//     const value = modulesFiles(modulePath);
//     (<Modules>modules)[moduleName] = value.default;
//     return modules;
// }, {});
import list from './reducers/list'
export default createStore(combineReducers({list}), applyMiddleware(thunk))
