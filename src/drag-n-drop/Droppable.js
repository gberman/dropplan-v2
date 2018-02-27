import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux'
import {splitWorkItem} from '../actions'

class Draggable extends Component {
    handleMouseHover(elem){
        this.setState({showHoverOptions: true});
    }
    handleMouseOut(elem){
        this.setState({showHoverOptions: false});
    }

    constructor(props) {
        super(props);
        this.state = { showHoverOptions: false };
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    render(){
        const { connectDragSource, isDragging, id, title, time } = this.props;

        return connectDragSource(
            <span style={{backgroundColor: isDragging ? 'yellow' : 'white', width: '131px',display:'block'}}
                  onMouseOver={this.handleMouseHover}
                  onMouseOut={this.handleMouseOut}>
                <div>{title} - {id} - {time.remainingTime}</div>
                <div style={{display: this.state.showHoverOptions ? 'block' : 'none'}}>
                    <div onClick={this.props.splitTask(id, this.props.date)}>Split Task</div>
                </div>
            </span>
        );
    }
}

const DraggableSource = {
    beginDrag(props, monitor, component) {
      return props;
    }
};

function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

const mapStateToProps = (state, ownProps) => {
    let workItems = state.workItems.filter(item => item.id === ownProps.id);
    let remainingTime = workItems[0].workingDays.filter(wd => wd.day.getTime() === ownProps.date.getTime())
    return {
        ...ownProps,
        ...workItems[0],
        time: remainingTime[0]
    };
}
   
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        splitTask: (id, date) => () => dispatch(splitWorkItem(id, date))
    };
}

const redux = connect(mapStateToProps, mapDispatchToProps)(Draggable)
const dnd = DragSource(ItemTypes.WorkItem, DraggableSource, collect)(redux);

export default dnd;