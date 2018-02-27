import { combineReducers } from 'redux'
import workItems from './workItemReducer'
import people from './peopleReducer'
 
const dropPlanApp = combineReducers({
  workItems,
  people
})
 
export default dropPlanApp