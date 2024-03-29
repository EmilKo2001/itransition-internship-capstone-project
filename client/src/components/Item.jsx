import React from "react";
import { Link } from "react-router-dom";

export default function Item({ title, image, col, slug, tags }) {
  return (
    <div className="card w-full shadow">
      <img src="/images/placeholder.png" alt={title} />
      <div className="card-body">
        <h2 className="card-title mb-2">{title}</h2>
        <ul className="mb-4 grow">
          <li>
            Коллеция:{" "}
            <Link to={`/collections/${col?.slug}`} className="underline">
              {col?.name}
            </Link>
          </li>
          <li>Автор: {col?.author.fullname}</li>
          {tags.length > 0 && (
            <li>
              Теги:{" "}
              {tags.slice(0, 3).map((tag, idx) => (
                <Link
                  to={`/items?tag=${tag}`}
                  key={`tag${idx}`}
                  className="mr-1 underline"
                >
                  {tag}
                </Link>
              ))}
            </li>
          )}
        </ul>
        <Link
          className="btn btn-primary"
          to={`/collections/${col?.slug}/${slug}`}
        >
          Читать
        </Link>
      </div>
    </div>
  );
}
