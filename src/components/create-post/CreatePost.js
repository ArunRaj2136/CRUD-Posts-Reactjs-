import React, { useState, useContext } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase.utils";
import { FormControl, TextField, TextareaAutosize } from "@mui/material";
import Button from "../button/Button";
import { UserContext } from "../context/User.context";
import "./CreatePost.scss";

const CreatePost = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const initialValues = {
    title: "",
    body: "",
    id: "",
  };
  const [values, setValues] = useState(initialValues);

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
        userId: currentUser?.uid,
        email: currentUser?.email,
      };
    });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        created: Timestamp.now(),
      });
      if (values?.body && values?.id && values?.title) {
        await addDoc(collection(db, "posts"), {
          created: Timestamp.now(),
          ...values,
        });
        setValues({ ...initialValues });
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <div className="create__post">
        <form onSubmit={handleSubmit1} className="create__post--form">
          <FormControl>
            <label htmlFor="title">Title</label>
            <TextField
              id="title"
              variant="outlined"
              name="title"
              value={values?.title}
              onChange={inputHandler}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="id">Id</label>
            <TextField
              id="id"
              variant="outlined"
              name="id"
              value={values?.id}
              onChange={inputHandler}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="body">Description</label>
            <TextareaAutosize
              minRows={3}
              id="body"
              placeholder="body"
              style={{ width: 200 }}
              name="body"
              value={values?.body}
              onChange={inputHandler}
            />
          </FormControl>
          <Button type="button" buttonType="google" onClick={handleSubmit1}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
