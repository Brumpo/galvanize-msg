import React, { Component } from 'react';

export default class Toolbar extends Component{
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    let method='PATCH';
    let sumUnread=0;
    let sumUnselected=0;
    let body={}
    let messages = this.props.messages.map(message=>{
      return {...message}
    })
    if(e.target.name==='markRead'){
      body.messageIds=[]
      body.command='read'
      body.read=true
      messages.map((message,i)=>{
        if (message.selected) {
          message.read=true
          body.messageIds.push(i+1)
        }
        return message;
      })
      this.props.componentMount(body,method);
    }else if (e.target.name==='markUnread') {
      body.messageIds=[]
      body.command='read'
      body.read=false
      messages.map((message,i)=>{
        if (message.selected) {
          message.read=false
          body.messageIds.push(i+1)
        }
        return message;
      })
      this.props.componentMount(body,method);
    }else if (e.target.name==='label') {
      body.messageIds=[]
      body.command='addLabel'
      body.label=e.target.value
      for (let i = 0; i < messages.length; i++) {
        if(messages[i].selected){
          let exists=false
          body.messageIds.push(i+1)
          console.log(messages[i].labels);
          for (let j = 0; j < messages[i].labels.length; j++) {
            if(messages[i].labels[j]===e.target.value){
              exists=true
            }
          }
          if (!exists) {
            messages[i].labels.push(e.target.value)
            console.log(body);
            this.props.componentMount(body,method);
          }
        }
      }
    }else if(e.target.name==='unlabel'){
      body.messageIds=[]
      body.command='removeLabel'
      body.label=e.target.value
      for (let i = 0; i < messages.length; i++) {
        if(messages[i].selected){
          body.messageIds.push(i+1)
          for (let j = 0; j < messages[i].labels.length; j++) {
            if(messages[i].labels[j]===e.target.value){
              messages[i].labels.splice(j,1)
            }
          }
        }
      }
      this.props.componentMount(body,method);
    }else if (e.target.title==='delete') {
      body.messageIds=[]
      body.command='delete'
      let result=[]
      for (let i = 0; i < messages.length; i++) {
        if(!messages[i].selected){
          result.push(messages[i])
        }else{
          body.messageIds.push(i+1)
        }
      }
      messages=result
      this.props.componentMount(body,method);
    }else if (e.target.title==='add') {
      let newCompose=this.props.compose ? false:true
      this.props.updateCompose(newCompose)
      return
    }else{
    console.log(messages);
    for (let i = 0; i < this.props.messages.length; i++) {
      if(!this.props.messages[i].read){
        sumUnread++
      }
      if(!this.props.messages[i].selected){
        sumUnselected++
      }
    }
    if(sumUnselected>0){
      messages=messages.map((message)=>{message.selected=true
      return message})
    }else if(sumUnselected===0){
      messages=messages.map((message)=>{message.selected=false
      return message})
    }
  }
    this.props.updateState(messages)
  }
  render(){
    let sumUnread=0;
    let sumUnselected=0;
    let disabled=''
    let selected='fa-minus-square-o'
    for (var i = 0; i < this.props.messages.length; i++) {
      if(!this.props.messages[i].read){
        sumUnread++
      }
      if(!this.props.messages[i].selected){
        sumUnselected++
      }
    }
    if(sumUnselected===this.props.messages.length){
      disabled='disabled'
      selected='fa-square-o'
    }
    if(sumUnselected===0){
      selected='fa-check-square-o'
    }

      return (
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">{sumUnread}</span>
                unread messages
            </p>

            <a className="btn btn-danger" title='add' onClick={this.onClick}>
              <i title='add' className="fa fa-plus"></i>
            </a>

            <button className="btn btn-default" onClick={this.onClick}>
              <i className={`fa ${selected}`} ></i>
            </button>

            <button className="btn btn-default" name='markRead'onClick={this.onClick} disabled={disabled}>Mark As Read</button>

            <button className="btn btn-default" name='markUnread'onClick={this.onClick} disabled={disabled}>Mark As Unread</button>

            <select className="form-control label-select" name='label' onChange={this.onClick}>
              <option>Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" name='unlabel' onChange={this.onClick}>
              <option>Remove label</option>
              <option value="dev" >dev</option>
              <option value="personal" name='label' >personal</option>
              <option value="gschool" name='label' >gschool</option>
            </select>

            <button className="btn btn-default" disabled={disabled} title='delete' onClick={this.onClick}>
              <i className="fa fa-trash-o" title='delete'></i>
            </button>
          </div>
        </div>
      )
    }
}
