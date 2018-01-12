import React, { Component } from 'react';
import { Router } from 'react-router-dom'
import './App.css';
import seeds from './seeds.js'
import Toolbar from './components/toolbar.js'
import AddMessageForm from './components/addmessage.js'
import MessageList from './components/messages.js'
export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      messages: [],
      compose: false,
      expanded: 0,

    }
    this.updateState = this.updateState.bind(this)
    this.updateCompose = this.updateCompose.bind(this)
    this.componentMount = this.componentMount.bind(this)
    this.getMessageId = this.getMessageId.bind(this)
    this.closeAll = this.closeAll.bind(this)
  }
  closeAll(id){
    (this.state.expanded===id)? this.setState({expanded: 0}):this.setState({expanded: id})
  }
  async componentDidMount() {
    let newCompose=this.state.compose
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({
      messages: json._embedded.messages,
      compose: newCompose
    })
  }

  async getMessageId(id){
    const response = await fetch(`http://localhost:8082/api/messages/${id}`)
    const json = await response.json()
    console.log(json,'getmessageId');
    return json.body
  }
 async componentMount(body,method){
   let meassage
   if(body) body=JSON.stringify(body)
   let newState=this.state.messages.map((mess)=>{return {...mess}})
   const response = await fetch('http://localhost:8082/api/messages',{
     method: method,
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     body:body
   })
   if(method==='POST'){
     const json = await response.json()
     console.log(json)
     newState.push(json)
     this.setState({messages:newState})
   }

 }
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
      <Router>
        <main>
          <Toolbar messages={this.state.messages} compose={this.state.compose} updateState={this.updateState} updateCompose={this.updateCompose} componentMount={this.componentMount}/>
          {this.state.compose?<AddMessageForm componentMount={this.componentMount}/>:null}
          <MessageList messages={this.state.messages} updateState={this.updateState} componentMount={this.componentMount} getMessageId={this.getMessageId} closeAll={this.closeAll} expanded={this.state.expanded}/>
        </main>
      </Router>
    );
  }
}
