import { useEffect, useState } from "react";

import axios from "axios";

import Container from "../../components/Container";
import Item from "../../components/Item";

export default function Items() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const tag = params.get("tag");

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        let res;
        if (tag) {
          res = await axios.get(`/items?tag=${tag}`);
        } else {
          res = await axios.get(`/items`);
        }
        setItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);

  return (
    <div>
      <Container>
        <div className="Itemss-center mb-5 flex justify-between gap-4 lg:mb-7">
          <h2 className="text-xl lg:text-4xl">Items</h2>
        </div>
        {items.length === 0 && <p>No Item</p>}
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
