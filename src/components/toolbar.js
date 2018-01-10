import React, { Component } from 'react';

export default class Toolbar extends Component{
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    let sumUnread=0;
    let sumUnselected=0;
    let messages = this.props.messages.map(message=>{
      return {...message}
    })
    if(e.target.name==='markRead'){
      messages.map((message)=>{
        if (message.selected) {
          message.read=true
        }
        return message;
      })
    }else if (e.target.name==='markUnread') {
      messages.map((message)=>{
        if (message.selected) {
          message.read=false
        }
        return message;
      })
    }else if (e.target.name==='label') {

      for (let i = 0; i < messages.length; i++) {
        if(messages[i].selected){
          let exists=false
          for (let j = 0; j < messages[i].labels.length; j++) {
            if(messages[i].labels[j]===e.target.value){
              exists=true
            }
          }
          if (!exists) {
            messages[i].labels.push(e.target.value)
          }
        }
      }
    }else if(e.target.name==='unlabel'){
      for (let i = 0; i < messages.length; i++) {
        if(messages[i].selected){
          for (let j = 0; j < messages[i].labels.length; j++) {
            if(messages[i].labels[j]===e.target.value){
              messages[i].labels.splice(j,1)
            }
          }
        }
      }
    }else if (e.target.title==='delete') {
      let result=[]
      for (let i = 0; i < messages.length; i++) {
        if(!messages[i].selected){
          result.push(messages[i])
        }
      }
      messages=result
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
