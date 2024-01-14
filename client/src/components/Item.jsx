import React from "react";
import { Link } from "react-router-dom";

export default function Item({
  title,
  image,
  col,
  collectionSlug,
  author,
  slug,
}) {
  return (
    <div className="card w-full shadow">
      {/* <img src={image} alt={title} /> */}
      <img
        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        alt="Shoes"
      />
      <div className="card-body">
        <h2 className="card-title mb-2">{title}</h2>
        <ul className="mb-4">
          <li>
            Коллеция:{" "}
            <Link to={`/collections/${col}`} className="underline">
              {col}
            </Link>
          </li>
          <li>Автор: {author}</li>
        </ul>
        <Link className="btn btn-primary" to={`/collections/${col}/${slug}`}>
          Смотреть
        </Link>
      </div>
    </div>
  );
}
