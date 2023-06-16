import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const [listOfPost, setListOfPosts] = useState([]);
  const [likedPost, setLikedPost] = useState([]);
  const { authState } = useContext(AuthContext); // <- getting the access of the authState

  // --- getting the id from the element
  const history = useNavigate();
  const handleSubmit = (id) => {
    history(`/post/${id}`); // redirecting the user to the right post, and filtering it with the proper id of the post
  };
  // --- getting the id from the element

  useEffect(() => {
    // this will check if there is a token in the local storage
    // restricting the non user to access the home page and force them to register an acoount
    if (!localStorage.getItem("accessToken")) {
      // if the token is empty, this will redirect the user to the login page
      history("/login");
    } else {
      axios
        .get("http://localhost:3002/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPost);
          setLikedPost(
            response.data.likedPost.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeApost = (postId) => {
    axios
      .post(
        "http://localhost:3002/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        // alert(response.data);
        setListOfPosts(
          // ------------------------------- This function will render live if you clicked like
          listOfPost.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] }; // this will trigger and add an element which is 0, if trure this 0 element will increment
              } else {
                const likesArray = post.Likes;
                likesArray.pop(); // pop function will remove the last element element
                return { ...post, Likes: likesArray }; // this will not allow to duplicate like and will stop the incerement value when this function will be triggered
              }
            } else {
              return post;
            }
          })
        );
        // redering of liked post "making this like button semi real time"
        if (likedPost.includes(postId)) {
          setLikedPost(
            likedPost.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPost([...likedPost, postId]);
        }
      });
  };

  return (
    <div>
      {listOfPost.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div className="body" onClick={() => handleSubmit(value.id)}>
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <a href={`/profile/${value.UserId}`}> {value.username}</a>
              </div>
              <div className="buttons">
                {/* <ThumbUpIcon
                  className="likeBttn"
                  onClick={() => {
                    likeApost(value.id);
                  }}
                /> */}
                <ThumbUpIcon
                  className={
                    likedPost.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                  onClick={() => {
                    likeApost(value.id);
                  }}
                />
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
