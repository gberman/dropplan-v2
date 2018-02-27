import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux'
import Droppable from './Droppable'
import { moveWorkItem } from '../actions'

class DropZone extends Component {
    render(){
        const { connectDropTarget, isOver, canDrop, date, person } = this.props;
        return connectDropTarget(
        <div style={{ ...this.props.style, backgroundColor: isOver && canDrop ? 'pink' : 'white' }}>
            {this.props.workItemIds.map(wiid=> <Droppable key={wiid} id={wiid} date={date} person={person} />)}
        </div>)
    }
}

const dropZoneTarget = {
    drop(props, monitor, component) {
        var {id, date} = monitor.getItem();
        component.store.dispatch(moveWorkItem(id, date, props.date, props.person));
    },
    canDrop(props, monitor){
        let {person: pPerson, date: pDate} = props;
        let {person: iPerson, date: iDate} = monitor.getItem();
        return !(pPerson === iPerson && pDate.getTime() === iDate.getTime());
    }
};

function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    };
}

const mapStateToProps = (state, ownProps) => {
    const startDate = ownProps.date;
    const endDate   = new Date(startDate.getTime() + 86399999); // 86400000 = 1 day - 1 milli second
    let workItemIds = state.workItems.filter(item => 
        ownProps.person === item.assignedTo &&

        0 < item.workingDays.filter(wd => 
            startDate <= wd.day && endDate >= wd.day).length).map(wi => wi.id);
    return {
        ...ownProps,
        workItemIds
    };
}
   
const mapDispatchToProps = (dispatch, ownProps) => {
    return ownProps;
}

const redux = connect(mapStateToProps, mapDispatchToProps)(DropZone)
const dnd   = DropTarget(ItemTypes.WorkItem, dropZoneTarget, collect)(redux)
export default dnd;