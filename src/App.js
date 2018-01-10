import React, { Component } from 'react';
import './App.css';
import seeds from './seeds.js'
import Toolbar from './components/toolbar.js'
import AddMessageForm from './components/addmessage.js'
import MessageList from './components/messages.js'
export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      messages: seeds,
      compose: false
    }
    this.updateState = this.updateState.bind(this)
    this.updateCompose = this.updateCompose.bind(this)
  }
  // onAddMessage(message){
  //   console.log('message:',message);
  //   this.setState({
  //     messages: this.state.cards.concat(message),
  //     toolbar:{
  //       selected: this.state.toolbar.selected
  //     }
  //   })
  // }
 updateState(message){
    console.log(message.length)
    let newState=this.state.messages.map((mess)=>{return {...mess}})
    let newCompose=this.state.compose
    //console.log('b4',newState);
    if (message.length!==undefined){
      newState=message
    }else {
      for (var i = 0; i < newState.length; i++) {
        if(newState[i].id===message.id){
          newState[i]=message
        }
      }
    }
    this.setState({
      messages:newState,
      compose: newCompose
    })
  }
  updateCompose(compose){
    console.log(compose);
    let newState=[...this.state.messages]
    let newCompose=compose
    this.setState({
      messages:newState,
      compose: newCompose
    })
  }
  render() {
    return (
      <main>
        <Toolbar messages={this.state.messages} compose={this.state.compose} updateState={this.updateState} updateCompose={this.updateCompose}/>
        {this.state.compose?<AddMessageForm/>:null}
        <MessageList messages={this.state.messages} updateState={this.updateState}/>
     </main>
    );
  }
}
