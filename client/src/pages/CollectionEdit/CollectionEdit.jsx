import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../config/axios";

import Container from "../../components/Container";

export default function CollectionEdit() {
  let { slug } = useParams();
  const [formStatus, setFormStatus] = useState("");

  const nameRef = useRef();

  useEffect(() => {
    const getCollection = async () => {
      try {
        const res = await axios.get(`/collections/${slug}`);

        nameRef.current.value = res.data.name;
      } catch (err) {
        console.error(err);
      }
    };

    getCollection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      await axios.put(
        `/collections/${slug}`,
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
    } catch (err) {
      setFormStatus(err.message);
    }
  };

  return (
    <div>
      <Container className="max-w-80">
        <h1 className="mb-4 text-xl lg:text-4xl">Edit Collection</h1>
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
              The collection is updated
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
            Edit
          </button>
        </form>
      </Container>
    </div>
  );
}
