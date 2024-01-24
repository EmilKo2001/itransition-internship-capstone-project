import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { Context } from "../../context/Context";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import Collection from "../../components/Collection";

export default function Admin() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const res = await axios.get("/collections");
        console.log(res.data);
        setCollections(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCollections();
  }, []);

  return (
    <div>
      <Container>
        <div className="mb-5 flex items-center justify-between gap-4 lg:mb-7	">
          <h2 className="text-xl lg:text-4xl">Collections</h2>{" "}
          <Link className="btn btn-primary" to="/admin/collections-new">
            Add Collection
          </Link>
        </div>
        {collections.length === 0 && <p>No Collection</p>}
        {collections.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {collections.map((col, idx) => (
              <Collection {...col} key={`collection${idx}`} isAdmin />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
