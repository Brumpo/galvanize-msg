import React, { Component } from 'react';
import Message from './message'
export default class MessageList extends Component{
  constructor(props) {
    super(props)
  }
  renderMessages() {
    let result = []
    for (var i = 0; i < this.props.messages.length; i++) {
      result.push(<Message key={this.props.messages[i].id} content={this.props.messages[i]} updateState={this.props.updateState} componentMount={this.props.componentMount} getMessageId={this.props.getMessageId} closeAll={this.props.closeAll} expanded={this.props.expanded}/>)
    }
    //console.log(result);
    return result;
  }

  render() {
    return (
      <div className='container'>
        {this.renderMessages()}
      </div>
    )
  }
}
