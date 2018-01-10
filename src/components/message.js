import React, { Component } from 'react';

export default class MessageList extends Component{
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    let message={...this.props.content};
    console.log(e.target);
    if(e.target.type==='checkbox'){
      message.selected= this.props.content.selected ? false:true;
    }else if (e.target.type==='body') {
      message.read= this.props.content.read ? false:true;
    }else {
      message.starred= this.props.content.starred ? false:true;
    }
    this.props.updateState(message)
  }
  render(){
    var read='unread';
    var starred='';
    var selected;
    var checked='';
    if(this.props.content.read){read='read'}
    if(!this.props.content.starred){starred='-o'}
    if(this.props.content.selected){selected='selected'}
    if(this.props.content.selected){checked='checked'}
    return (
      <div className={`row message ${read} ${selected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={`${checked}`} onClick={this.onClick}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa fa-star${starred}`}onClick={this.onClick}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.content.labels.map((label)=>{
            return <span className="label label-warning">{label}</span>
          })}
          <a onClick={this.onClick} type='body'>
            {this.props.content.subject}
          </a>
        </div>
      </div>
    )
  }
}
