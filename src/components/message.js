import React, { Component } from 'react';
import {BrowserRouter as Router,
Route,
Link
} from 'react-router-dom'

export default class MessageList extends Component{
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.body= ''
  }
  async onClick(e){
    let method = 'PATCH'
    let body={}
    let message={...this.props.content};
    if(e.target.type==='checkbox'){
      message.selected= this.props.content.selected ? false:true;
    }else if (e.target.type==='body') {
      console.log('read');
      body.messageIds = [this.props.content.id]
      body.command= 'read'
      body.read= this.props.content.read ? false:true;
      if(this.props.expanded===this.props.content.id){
        this.props.closeAll(0)
      }else {
      message.read = this.props.content.read ? false:true;
      this.props.componentMount(body,method)
      this.props.closeAll(this.props.content.id)
      this.body= await this.props.getMessageId(this.props.content.id)
      console.log(this.body);
    }
    }else {
      console.log(this.props.content.id);
      body.messageIds = [this.props.content.id]
      body.command= 'star'
      body.star= this.props.content.starred ? false:true;
      message.starred = this.props.content.starred ? false:true;
      this.props.componentMount(body,method)
    }
    console.log(body,method);
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
      <Router>
      <div>
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
          <Link to={`/messages/${this.props.content.id}`} onClick={this.onClick} type='body'>
            {this.props.content.subject}
          </Link>
        </div>
      </div>
      <Route path={`/messages/${this.props.content.id}`} render={()=>(
      this.props.expanded===this.props.content.id?<div className="row message-body"><div className="col-xs-11 col-xs-offset-1">{this.body}</div></div>:null
      )}/>
      </div>
      </Router>

    )
  }
}
