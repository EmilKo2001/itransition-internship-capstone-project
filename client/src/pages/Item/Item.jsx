import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import axios from "axios";

import Container from "../../components/Container";

export default function Item({ type }) {
  let { collection, slug } = useParams();
  const history = useHistory();

  const [item, setItem] = useState({});

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get(`/items/${slug}`);

        setItem(res.data);
      } catch (error) {
        console.error(error);
        if (error.response.data.error === "Item not found") {
          history.push("/404");
        }
      }
    };

    getItem();
  }, []);

  const deleteItem = async () => {
    try {
      await axios.delete(`/items/${item?._id}`, {
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
        <img
          src="/images/placeholder.png"
          alt={item?.title}
          className="mx-auto mb-[30px]"
        />
        <div className="mb-5 flex items-center justify-between gap-4 lg:mb-7">
          <h1 className="text-xl lg:text-4xl">{item?.title}</h1>

          {type === "authed" && (
            <div className="flex gap-4">
              <Link
                className="btn btn-primary"
                to={`/admin/collections/${collection}/${slug}/edit`}
              >
                Edit Item
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={deleteItem}
              >
                Delete Item
              </button>
            </div>
          )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: item?.content }} />
      </Container>
    </div>
  );
}
