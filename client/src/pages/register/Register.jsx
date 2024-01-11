import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Container from "../../components/Container";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        fullname: fullname,
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <Container className="max-w-80">
      <h1 className="mb-5	text-center text-xl lg:mb-7 lg:text-4xl">Register</h1>
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-2">
          {" "}
          <div className="flex w-full flex-col gap-2">
            <label>Full Name</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setFullname(e.target.value)}
              required
            />{" "}
          </div>{" "}
          <label>Username</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full  flex-col gap-2">
          <label>Email</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="email"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />{" "}
        </div>
        <div className="flex w-full  flex-col gap-2">
          <label>Password</label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
        </div>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      {error && <span className="text-red mt-3">Something went Wrong 😕</span>}
    </Container>
  );
}
