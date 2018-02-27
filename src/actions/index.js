export const WorkItemActions = {
    ADD_WORK_ITEM: 'ADD_WORK_ITEM',
    MOVE_WORK_ITEM: 'MOVE_WORK_ITEM',
    SPLIT_WORK_ITEM: 'SPLIT_WORK_ITEM'
}
export const PeopleActions = {
    ADD_PERSON: 'ADD_PERSON'
};

export const addWorkItem = (id = '0', assignedTo = 'person', title = 'title', version = 0, workingDays = []) => {
    return {
        type: WorkItemActions.ADD_WORK_ITEM,
        work_item: {
            id,
            assignedTo,
            title,
            version,
            workingDays
        } 
    }
}

export const moveWorkItem = (id, oldDate, newDate, person) => {
    return {
        type: WorkItemActions.MOVE_WORK_ITEM,
        payload: {
            id,
            oldDate,
            newDate,
            person
        } 
    }
}

export const splitWorkItem = (id, date) => {
    return {
        type: WorkItemActions.SPLIT_WORK_ITEM,
        id,
        date
    }
}

export const addPerson = (name) => {
    return {
        type: PeopleActions.ADD_PERSON,
        person: {
            name
        }
    }
}