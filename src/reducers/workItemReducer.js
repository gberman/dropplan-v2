import { WorkItemActions } from '../actions/index';

const workItems = (state = [], action) =>
{
    switch (action.type){ 
        case WorkItemActions.SPLIT_WORK_ITEM:
            let wi = state.filter(wi => wi.id === action.id)

            if (wi.length === 0) return state;

            let wd = wi[0].workingDays.filter(wd => wd.day.getTime() === action.date.getTime());

            if (wd.length === 0) return state;

            wd[0].remainingTime = wd[0].remainingTime / 2;

            let tomorrow = action.date.getTime() + 1000 * 60 * 60 * 24;
            let uwd = wi[0].workingDays.filter(wd => wd.day.getTime() === tomorrow);

            if (uwd.length === 0)
                wi[0].workingDays = [...wi[0].workingDays, {day: new Date(tomorrow), remainingTime: wd[0].remainingTime}]
            else
                uwd[0].remainingTime = uwd[0].remainingTime + wd[0].remainingTime;
            
            return [...state];
        case WorkItemActions.ADD_WORK_ITEM:
            return [...state,
                action.work_item
            ];
        case WorkItemActions.MOVE_WORK_ITEM:
            let wis = state.filter(wi => wi.id === action.payload.id);
            if (wis.length === 0)
                return state;

            let {newDate,oldDate} = action.payload;

            if (newDate.getTime() === oldDate.getTime() &&
            action.payload.person === wis[0].assignedTo)
                return state;

            let workItem = wis[0];


            if (action.payload.person !== workItem.assignedTo)
                workItem.assignedTo = action.payload.person;

            if (newDate.getTime() === oldDate.getTime())
                return [...state];
            
            let newWorkingDay = workItem.workingDays.filter(wd => wd.day.getTime() === newDate.getTime())
            let oldWorkingDay = workItem.workingDays.filter(wd => wd.day.getTime() === oldDate.getTime())                        

            if (newWorkingDay.length === 0){
                oldWorkingDay[0].day = newDate;
            }
            else
            {
                newWorkingDay[0].remainingTime = newWorkingDay[0].remainingTime + oldWorkingDay[0].remainingTime;
                workItem.workingDays = workItem.workingDays.filter(wd => wd.day.getTime() !== oldWorkingDay[0].day.getTime());
            }

            return [...state];
        default:
            return state;
    }
};

export default workItems;
