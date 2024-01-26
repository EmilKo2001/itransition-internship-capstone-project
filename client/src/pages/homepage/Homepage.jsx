import { useState, useEffect } from "react";

import axios from "../../config/axios";

import Sidebar from "../../components/sidebar/Sidebar";
import Container from "../../components/Container";
import Item from "../../components/Item";
import Collection from "../../components/Collection";

export default function Homepage() {
  const [items, setItems] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(`/items?latest`);
        setItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getItems();

    const getCollections = async () => {
      try {
        const res = await axios.get("/collections?largest");
        setCollections(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCollections();
  }, []);

  return (
    <Container>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="lg:w-3/4">
          <section className="mb-8 lg:mb-16">
            <h1 className="mb-5	text-xl lg:mb-7 lg:text-4xl">
              Последнии айтемы
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {items.length === 0 && <p>No Items</p>}
              {items.length > 0 &&
                items.map((item, idx) => <Item {...item} key={`item${idx}`} />)}
            </div>
          </section>{" "}
          <section className="mb-8 lg:mb-16">
            <h2 className="mb-5	text-xl lg:mb-7 lg:text-4xl">
              Топ 5 больших коллекций
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {collections.length === 0 && <p>No Collections</p>}
              {collections.length > 0 &&
                collections.map((col, idx) => (
                  <Collection {...col} key={`col${idx}`} />
                ))}
            </div>
          </section>
        </div>
        <Sidebar />{" "}
      </div>
    </Container>
  );
}
