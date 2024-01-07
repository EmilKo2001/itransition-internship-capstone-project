import React from "react";
import { Link } from "react-router-dom";

export default function Item({
  name,
  image,
  collection,
  collectionSlug,
  author,
  slug,
}) {
  return (
    <div className="card w-full shadow">
      <img src={image} alt={name} />
      <div className="card-body">
        <h2 className="card-title mb-2">{name}</h2>
        <ul className="mb-4">
          <li>
            Коллеция:{" "}
            <Link to={`/asdsad/${collectionSlug}`} className="underline">
              {collection}
            </Link>
          </li>
          <li>Автор: {author}</li>
        </ul>
        <Link className="btn btn-primary" to={`/asdasda/${slug}`}>
          Смотреть
        </Link>
      </div>
    </div>
  );
}
