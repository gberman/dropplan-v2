import {PeopleActions} from '../actions/index'

const INITIAL_STATE = [];
const people = (state = INITIAL_STATE, action) =>
{
    switch (action.type){ 
        case PeopleActions.ADD_PERSON:
            return [...state,
                action.person
            ];
        default:
            return state;
    }
};

export default people;