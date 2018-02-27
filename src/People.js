import React, { Component } from 'react';
import PersonWorkDayTasks from './drag-n-drop/DropZone'

const WorkItemStyling = {
    width: 'calc((400px / 3) - 2px)',
    minHeight: '150px',
    height: '100%',
    border: '1px black solid',
    textAlign: 'left',
    display: 'inline-block',
    verticalAlign: 'top'
}

class People extends Component {
    constructor(props){
        super(props);
        this.state = {showDetails: true}
        this.toggleDetails = this.toggleDetails.bind(this);
    }
    toggleDetails(){
        console.log(this.state)
        this.setState({showDetails: !this.state.showDetails})
    }
    getDateRange(startDate, endDate){
        let dates = [], targetDate = startDate.getTime(), _endDate = endDate.getTime();
        while(targetDate <= _endDate)
            targetDate = dates.push(new Date(targetDate)) && targetDate + 24*3600*1000;
        return dates;
    }

    render(){
        let dates = this.getDateRange(this.props.startDate, this.props.endDate);

        return (
        <div style={{width:'400px'}}>
            <div style={{width:"100%"}} onClick={this.toggleDetails}>{this.props.person}</div>
            <div style={{width:"100%", display: this.state.showDetails ? 'block' : 'none'}}>
                { dates.map(date => { 
                    return (
                    <PersonWorkDayTasks key={date} date={date} person={this.props.person} style={WorkItemStyling}>
                        {date.toString()}
                    </PersonWorkDayTasks>
                );}) 
                }
            </div>
        </div>);
    }
}

export default People
