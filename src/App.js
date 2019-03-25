import React, {Component} from 'react';
import Post from './components/Post.js';
import Button from './components/Button.js';
import './style/combined.scss';

const LATEST = 1;
const VIDEO = 2;
const ARTICLE = 3;

class App extends Component {
  state = {
    allPosts: [],
    videos: [],
    articles: [],
    show: 1,
    // latest should be true on default
  };
  componentDidMount = () => {
    fetch('/content?startIndex=0&count=30')
      .then(res => res.json())
      .then(json => {
        const videos = json.data.filter(post => post.contentType === 'video');
        const articles = json.data.filter(
          post => post.contentType === 'article',
        );
        this.setState({
          allPosts: json.data,
          videos,
          articles,
        });
      });
  };
  onShowVideoClick = e => {
    this.setState({
      show: VIDEO,
    });
  };
  onShowLatestClick = e => {
    this.setState({
      show: LATEST,
    });
  };
  onShowArticleClick = e => {
    this.setState({
      show: ARTICLE,
    });
  };
  render() {
      const { show } = this.state;
    return (
      <div className="wrapper">
        <h1 className="heading">Latest News</h1>
        <div className="wrapper--content">
          <div className="options">
            <Button
              onClick={this.onShowLatestClick}
              text={'Latest'}
              icon={'far fa-check-circle'}
              active={show === 1 ? true : false}
            />
            <Button
              onClick={this.onShowVideoClick}
              text={'Videos'}
              icon={'fas fa-play'}
              active = {show === 2 ? true : false}
            />
            <Button
              onClick={this.onShowArticleClick}
              text={'Article'}
              icon={'far fa-file-alt'}
              active = {show === 3 ? true : false}
            />
          </div>
          <div className="posts">
            {this.state.show === 1 &&
              this.state.allPosts.map(post => {
                return (
                  <Post
                    key={post.contentId}
                    headline={post.metadata.headline}
                    title={post.metadata.title}
                    thumbnail={post.thumbnails[1].url}
                    publishDate={post.metadata.publishDate}
                    id={post.contentId}
                    show={true}
                  />
                );
              })}
            {this.state.show === 2 &&
              this.state.videos.map(video => {
                return (
                  <Post
                    key={video.contentId}
                    title={video.metadata.title}
                    headline={video.metadata.headline}
                    thumbnail={video.thumbnails[1].url}
                    publishDate={video.metadata.publishDate}
                    id={video.contentId}
                    show={true}
                    duration={video.metadata.duration}
                  />
                );
              })}
            {this.state.show === 3 &&
              this.state.articles.map(article => (
                <Post
                  key={article.contentId}
                  title={article.metadata.title}
                  headline={article.metadata.headline}
                  thumbnail={article.thumbnails[1].url}
                  publishDate={article.metadata.publishDate}
                  id={article.contentID}
                  show={true}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
