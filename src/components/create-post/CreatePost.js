import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase.utils";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Button from "../button/Button";

const CreatePost = () => {
  const [values, setValues] = useState({
    title: "",
    body: "",
    id: "",
  });

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit1}>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <Button type="button" buttonType="google" onClick={handleSubmit1}>
            sendd
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
