import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import axios from "../../config/axios";

import Container from "../../components/Container";

export default function CollectionCreate() {
  const [formStatus, setFormStatus] = useState("");
  const history = useHistory();

  const nameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      await axios.post(
        "/collections",
        {
          name: nameRef?.current?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setFormStatus("success");
      setTimeout(() => {
        history.push(`/admin`);
      }, 3000);
    } catch (err) {
      setFormStatus(err.message);
    }
  };

  return (
    <div>
      <Container className="max-w-80">
        <h1 className="mb-4 text-xl lg:text-4xl">Add Collection</h1>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col gap-2">
            <label>Name</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Enter name"
              ref={nameRef}
              required
            />
          </div>
          {formStatus === "success" && (
            <p role="alert" className="alert alert-success text-center">
              The collection is created
            </p>
          )}
          {formStatus &&
            formStatus !== "success" &&
            formStatus !== "loading" && (
              <div role="alert" className="alert alert-error text-center">
                {formStatus}
              </div>
            )}
          <button
            className="btn"
            type="submit"
            disabled={formStatus === "loading"}
          >
            Create
          </button>
        </form>
      </Container>
    </div>
  );
}
