import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      // eg post: 
      // {
      //   "id": 1691, 
      //   "text": "Oh, hello!",
      //   "date": "14 Aug 2018"
      // }
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts') // this is a promise, now use .then
    .then(response => {
      console.log('response of axios.get:', response.data);
      this.setState({ posts: response.data });
    });
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then(response => {
      this.setState({ posts: response.data });
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then(response => {
      this.setState({ posts: response.data });
    });
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, { text }).then(response => {
      this.setState({ posts: response.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

          {/* { ALT
            posts.map( post => {
              return <Post key={ post.id } /> 
            })  
          } */}
            {
              posts.map( post => (
              <Post 
                key={ post.id } 
                text={ post.text }
                date={ post.date }
                updatePost={ this.updatePost }
                deletePostFn={ this.deletePost }
                createPostFn={ this.createPost }
              /> 
              ))
            } 
          
        </section>
      </div>
    );
  }
}

export default App;
