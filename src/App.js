import React, { Component } from 'react';
import './App.css';
import seeds from './seeds.js'
import Toolbar from './componets/toolbar.js'
import AddMessageForm from './componets/addmessage.js'
import MessageList from './componets/messages.js'
export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      messages: seeds,
      toolbar: {
        selected:'none'
      }
    }
  }
  render() {
    return (
      <main>
        <Toolbar selected={this.state.toolbar.selected}/>
        <AddMessageForm onAddMessage={this.onAddMessage}/>
        <MessageList title="To Do" messages={this.state.messages} />
     </main>
    );
  }
}
