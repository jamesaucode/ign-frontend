import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {toTimeStamp, toPostTimeString} from '../helper/time.js';
export default class Post extends Component {
  state = {
    count: null,
  };
  componentDidMount = () => {
    fetch('/comments?ids=' + this.props.id)
      .then(res => res.json())
      .then(json => {
        // Don't show the comment count if count is 0
        const count = json.content[0].count;
        if (count > 0) {
          this.setState({
            count,
          });
        }
      });
  };
  render() {
    const {thumbnail, headline, title, publishDate, duration} = this.props;
    const milisecondsPublishDate = new Date(publishDate);
    return (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionName="appear"
        transitionEnter={false}
        transitionLeave={false}
        >
        <div className="post">
          <div className="wrapper--img">
            <img alt="Thumbnail" src={thumbnail} />
            {duration && (
              <div className="duration">
                <i className="fas fa-play-circle" />
                {toTimeStamp(duration)}
              </div>
            )}
          </div>
          <div className="post-detail">
            <h3 className="post-time">
              {toPostTimeString(milisecondsPublishDate.getTime())}
               ago - <i className="far fa-comment" />
              {this.state.count}
            </h3>
            {headline && <h2 className="post-heading">{headline}</h2>}
            {title && <h2 className="post-heading">{title}</h2>}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
