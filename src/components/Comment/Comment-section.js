import React from "react";
import './comment.css'
import Popup from "../Alert/Popup";
import axios from "axios";
function getDataFromLocalStorage(userdata) {
  return JSON.parse(localStorage.getItem(userdata));
}
class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true,
      login_check: false,
      comments: []
    }
  }



  // handleCommentButton() {
  //   this.setState({ showComments: !this.state.showComments });
  // }

  handleSubmitComment(event) {
    const profile = getDataFromLocalStorage("userLoginData");
    event.preventDefault();
    const newComment = {
      id: Date.now(),
      text: this.state.newCommentText
    };
    this.setState({
      // comments: [...this.state.comments, newComment],
      // newCommentText: ''
    });
      
    if (profile) {
      this.setState({
        comments: [...this.state.comments, newComment],
        newCommentText: ''
      });
      let formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('sug_id', this.props.id);
      formData.append('comment', this.state.newCommentText);
      axios({
        method: 'post',
        url: 'https://presi.collegesuvidha.in/manifest/comments.php',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(function (response) {
         

        })
        .catch(function (response) {
          
        })

    } else {
      this.state.login_check = true;
    }

  }

  render() {
    return (
      <>
        {
          this.state.login_check ? (<Popup children={null} id={this.props.id} />) : null
        }
        <div className="task">
          {/* task content */}
          {/* <button className="comment-button" onClick={() => this.handleCommentButton()}>Comment</button> */}
          <div className={`comment-section ${this.state.showComments ? 'open' : ''}`}>

            <div className="comment-list">
              {this.state.comments.map(comment => (
                <div className="comment" key={comment.id}>
                  <div className="comment-text">
                    {comment.text}
                  </div>
                </div>
              ))}
            </div>
            <form className="comment-form" onSubmit={(event) => this.handleSubmitComment(event)}>
              <textarea required className="comment-input" value={this.state.newCommentText} onChange={(event) => this.setState({ newCommentText: event.target.value })} />
              <button className="submit-comment">Post</button>
            </form>
          </div>
        </div></>
    );
  }
}
export default CommentSection;
