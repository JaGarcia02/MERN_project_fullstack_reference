import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const CreatePost = () => {
  const { authState } = useContext(AuthContext); // <- getting the access of the authState
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    // this useState if the token matches this user will have the ability to create a post
    if (!localStorage.getItem("accessToken")) {
      // if the token is empty, this will redirect the user to the login page
      history("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title...!"),
    postText: Yup.string().required(),
  });

  const history = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3002/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history("/");
      });
  };

  return (
    <div className="createPostPage ">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Post title..."
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Whats on your mind??"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
