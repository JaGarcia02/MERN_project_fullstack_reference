import React, { useEffect, useState, useContext } from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [postObject, setObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/posts/get-by-id/${id}`)
      .then((response) => {
        setObject(response.data);
      });

    axios.get(`http://localhost:3002/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3002/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // This function will set the data in the frontend by not reloding the page
          const commentToAdd = {
            commentBody: response.data.commentBody,
            username: response.data.username,
            id: response.data.id, // this value is from the routes where we can get the newComment = value is id
          };
          setComments([...comments, commentToAdd]);
          setNewComment(""); // <---- this will clear the inputbox after the function is successfully executed
          // console.log("comment added");

          // window.location.reload(true); // <---- this will reload the page to render the updated data in the frontend
        }
      }, []);
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3002/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        // window.location.reload(false);
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3002/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        // alert("Post Deleted!");
        history("/");
      });
  };

  // Promp Edit Fuction --------------------------------------------------------------------------
  /*
  
  important notes:

  postObject has the current data of title and postText, this can be query to set the current value to the new value.
  this will avoid null values in the prompt and also avoid crashes in this application

  postObject is the reference of what user is logged in and it has all of the current data of that user in the database!
  

  */
  const editPost = (option) => {
    if (option === "title") {
      const newTitle = prompt("Edit Your Title: ", postObject.title);

      axios.put(
        "http://localhost:3002/posts/update-post-title/",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setObject({ ...postObject, title: newTitle });
    } else {
      const newPostText = prompt("Edit Your Post: ", postObject.postText);

      axios.put(
        "http://localhost:3002/posts/update-posts-text/",
        {
          newText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setObject({ ...postObject, postText: newPostText });
    }
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          {/* Prompt Function Edit Title and Body */}
          <div
            className="title"
            onClick={() => {
              // this will authorize only the user can edit its own posts
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              // this will authorize only the user can edit its own posts
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>
          {/* Prompt Function Edit Title and Body */}
          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================================== Comment Section ================================== */}
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="add comment....."
            autoComplete="off"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>

        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <label>username: {comment.username}</label>
                <br />
                <br />
                {comment.commentBody}
                <br />
                <br />

                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {/* ================================== Comment Section ================================== */}
      </div>
    </div>
  );
};

export default Post;
