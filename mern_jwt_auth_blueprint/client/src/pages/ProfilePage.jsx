import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../features/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateMutation } from "../features/slice/usersApiSlice";

const ProfilePage = () => {
  /* This has the values of the user that will fill all the fields */
  const { userInfo } = useSelector((state) => state.auth);
  const [userAccount, setUserAccout] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateMutation();

  //   console.log(userInfo.data.name);
  //   console.log(userInfo.data.email);

  /* This will fill the values from the useState, the userInfo has the credentials of the user.
     - this use effect will re-render the page without refreshing. 
  */
  useEffect(() => {
    setUserAccout({
      ...userAccount,
      email: userInfo.data.email,
      name: userInfo.data.name,
    });
  }, [userInfo.data.name, userInfo.data.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !userAccount.name &&
      !userAccount.email &&
      !userAccount.password &&
      !userAccount.confirm_password
    ) {
      toast.warning("Input Fields are empty!");
    } else if (!userAccount.name) {
      toast.warning("Please enter your name!");
    } else if (!userAccount.email) {
      toast.warning("Please enter your email!");
    }

    if (userAccount.password != userAccount.confirm_password) {
      toast.error("Password didn't match! Please try again.");
    } else {
      try {
        const res = await updateProfile({
          id: userInfo.data.id,
          name: userAccount.name,
          email: userAccount.email,
          password: userAccount.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      toast.success("Profile updated.");
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={userAccount.name}
            placeholder="Enter name"
            onChange={(e) =>
              setUserAccout({ ...userAccount, name: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={userAccount.email}
            placeholder="Enter email"
            onChange={(e) =>
              setUserAccout({ ...userAccount, email: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setUserAccout({ ...userAccount, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={(e) =>
              setUserAccout({
                ...userAccount,
                confirm_password: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfilePage;
