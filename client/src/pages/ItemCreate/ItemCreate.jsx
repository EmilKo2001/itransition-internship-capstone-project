import { useState, useRef, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import SimpleMDE from "react-simplemde-editor";

import Container from "../../components/Container";

import "easymde/dist/easymde.min.css";

export default function ItemCreate() {
  let { slug } = useParams();
  const [formStatus, setFormStatus] = useState("");

  const [content, setContent] = useState("");

  const onChange = useCallback((value) => {
    setContent(value);
  }, []);

  const titleRef = useRef();
  const tagsRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const collectionId = (await axios.get(`/collections/${slug}`)).data._id;
      await axios.post(
        "/items",
        {
          title: titleRef?.current?.value,
          tags: tagsRef?.current?.value,
          content,
          col: collectionId,
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

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: { uniqueId: "uniqueId", enabled: true, delay: 1000 },
    }),
    [],
  );

  return (
    <div>
      <Container className="max-w-80">
        <h1 className="mb-4 text-xl lg:text-4xl">Add Item</h1>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col gap-2">
            <label>Title</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Enter title"
              ref={titleRef}
              required
            />
          </div>
          <SimpleMDE value={content} onChange={onChange} options={options} />
          <div className="flex w-full flex-col gap-2">
            <label>Tags</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Enter tags"
              ref={tagsRef}
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
