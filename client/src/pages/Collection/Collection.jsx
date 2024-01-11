import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { Context } from "../../context/Context";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import Item from "../../components/Item";

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
        <div className="Collections-center mb-5 flex gap-4 lg:mb-7	">
          <h2 className="text-xl lg:text-4xl">{collection?.name}</h2>
          <Link
            className="btn btn-primary"
            to={`/admin/collections/${slug}/create`}
          >
            Add
          </Link>
        </div>
        {/* {collections.length === 0 && <p>No Collection</p>} */}
        {/* {collections.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {collections.map((col, idx) => (
              <Collection {...col} />
            ))}
          </div>
        )} */}
      </Container>
    </div>
  );
}
