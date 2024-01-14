import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

import Container from "../../components/Container";
import Item from "../../components/Item";

import { Context } from "../../context/Context";

export default function Collection() {
  let { slug } = useParams();

  const [collection, setCollection] = useState({});

  useEffect(() => {
    const getCollection = async () => {
      try {
        const res = await axios.get(`/collections/${slug}`);
        console.log(res.data);
        setCollection(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCollection();
  }, []);

  return (
    <div>
      <Container>
        <div className="Collections-center mb-5 flex justify-between gap-4 lg:mb-7">
          <h2 className="text-xl lg:text-4xl">{collection?.name}</h2>
          <Link
            className="btn btn-primary"
            to={`/admin/collections/${slug}/create`}
          >
            Add
          </Link>
        </div>
        {/* {items.length === 0 && <p>No Items</p>} */}
        {/* {items.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {items.map((col, idx) => (
              <Item {...col} />
            ))}
          </div>
        )} */}
      </Container>
    </div>
  );
}
