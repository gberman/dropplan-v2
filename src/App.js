import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DragAndDropContext from './drag-n-drop/DragAndDropContext'
import People from './People'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          
          <DragAndDropContext>
            <People person={'Diana'} startDate={new Date(2018, 2, 1)} endDate={new Date(2018,2,3)}/>
            <People person={'Greg'} startDate={new Date(2018, 2, 1)} endDate={new Date(2018,2,3)}/>
          </DragAndDropContext>
        
        <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
