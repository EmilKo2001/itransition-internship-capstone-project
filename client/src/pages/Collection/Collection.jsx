import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import axios from "axios";

import Container from "../../components/Container";
import Item from "../../components/Item";

export default function Collection({ type }) {
  let { slug } = useParams();
  let history = useHistory();

  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getCollection = async () => {
      try {
        const res = await axios.get(`/collections/${slug}`);

        setCollection(res.data);
        getItems(res.data._id);
      } catch (error) {
        console.error(error);
        if (error.response.data.error === "Collection not found") {
          history.push("/404");
        }
      }
    };

    const getItems = async (colId) => {
      try {
        const res = await axios.get(`/items?col=${colId}`);
        setItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCollection();
  }, []);

  const deleteCollection = async () => {
    try {
      await axios.delete(`/collections/${slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Deleted successfuly");
      history.push("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Container>
        <div className="Collections-center mb-5 flex justify-between gap-4 lg:mb-7">
          <h2 className="text-xl lg:text-4xl">{collection?.name}</h2>
          {type !== "page" && (
            <div className="flex gap-4">
              <Link
                className="btn btn-primary"
                to={`/admin/collections/${slug}/edit`}
              >
                Edit Collection
              </Link>{" "}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={deleteCollection}
              >
                Delete Collection
              </button>
              <Link
                className="btn btn-primary"
                to={`/admin/collections/${slug}/create`}
              >
                Add Item
              </Link>
            </div>
          )}
        </div>
        {items.length === 0 && <p>No Items</p>}
        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {items.map((item, idx) => (
              <Item {...item} key={`item${idx}`} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
