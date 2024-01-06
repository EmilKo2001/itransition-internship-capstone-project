import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await axios.get("/categories");
        setCats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCats();
  }, []);

  return (
    <aside className="lg:fixed lg:right-0 lg:w-1/4 ">
      <div className="p-8 shadow lg:w-[85.8%]">
        <h3 className="mb-5	text-lg lg:text-2xl">Облако Тегов</h3>
        <ul className="flex flex-wrap gap-3 gap-y-5">
          <li>
            <Link
              to={`/?cat=`}
              className="rounded-xl border border-solid border-black px-3 py-1"
            >
              tag 1
            </Link>
          </li>{" "}
          <li>
            <Link
              to={`/?cat=`}
              className="rounded-xl border border-solid border-black px-3 py-1"
            >
              tag 1
            </Link>
          </li>{" "}
          <li>
            <Link
              to={`/?cat=`}
              className="rounded-xl border border-solid border-black px-3 py-1"
            >
              tag 1
            </Link>
          </li>{" "}
          <li>
            <Link
              to={`/?cat=`}
              className="rounded-xl border border-solid border-black px-3 py-1"
            >
              tag 1
            </Link>
          </li>{" "}
          <li>
            <Link
              to={`/?cat=`}
              className="rounded-xl border border-solid border-black px-3 py-1"
            >
              tag 1
            </Link>
          </li>{" "}
          {/* {cats.map((c, idx) => (
            <Link
              key={`sidebarListItem${idx}`}
              to={`/?cat=${c.name}`}
              className="link"
            >
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))} */}
        </ul>
      </div>
    </aside>
  );
}
