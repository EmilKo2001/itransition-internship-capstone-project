import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../../config/axios";

export default function Sidebar() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await axios.get("/items/tags");
        setTags(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTags();
  }, []);

  return (
    <aside className="lg:fixed lg:right-0 lg:w-1/4 ">
      <div className="p-8 shadow lg:w-[85.8%]">
        <h3 className="mb-5	text-lg lg:text-2xl">Облако Тегов</h3>
        <ul className="flex flex-wrap gap-3 gap-y-5">
          {tags.map((tag, idx) => (
            <Link
              key={`tag${idx}`}
              to={`/items?tag=${tag}`}
              className="rounded-xl border border-solid border-black px-3 py-1"
            >
              {tag}
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
