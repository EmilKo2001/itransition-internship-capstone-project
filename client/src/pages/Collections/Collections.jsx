import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

import Container from "../../components/Container";
import Collection from "../../components/Collection";

export default function Collections() {
  let { slug } = useParams();

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const res = await axios.get(`/collections`);
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
        <div className="Collectionss-center mb-5 flex justify-between gap-4 lg:mb-7">
          <h2 className="text-xl lg:text-4xl">Collections</h2>
        </div>
        {collections.length === 0 && <p>No Collection</p>}
        {collections.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {collections.map((col, idx) => (
              <Collection {...col} key={`col${idx}`} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
