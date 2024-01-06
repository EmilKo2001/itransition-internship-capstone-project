import { Link } from "react-router-dom";
import { useRef, useContext } from "react";

import axios from "axios";

import { Context } from "../../context/Context";
import Container from "../../components/Container";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <Container className="max-w-80">
      <h1 className="mb-5	text-center text-xl lg:mb-7 lg:text-4xl">Login</h1>
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        {" "}
        <div className="flex w-full flex-col gap-2">
          <label>Username</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="Enter your username"
            ref={userRef}
            required
          />{" "}
        </div>{" "}
        <div className="flex w-full flex-col gap-2">
          <label>Password</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="password"
            placeholder="Enter your password..."
            ref={passwordRef}
            required
          />{" "}
        </div>
        <button className="btn" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
    </Container>
  );
}
