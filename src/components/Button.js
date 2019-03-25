import React, {Component} from 'react';
export default class Button extends Component {
  render() {
    const {onClick, text, icon, active} = this.props;
    return (
      <div
        className={active ? 'btn btn-option active' : 'btn btn-option'}
        onClick={onClick}>
        <i className={icon} />
        <span className={active ? 'btn-text active-text' : 'btn-text'}>{text}</span>
      </div>
    );
  }
}
