import React from "react";
import { Link } from "react-router-dom";

export default function Collection({
  name,
  image,
  itemsCount,
  slug,
  author,
  isAdmin = false,
}) {
  return (
    <div className="card w-full shadow">
      <img src="/images/placeholder.png" alt={name} />
      <div className="card-body">
        <h2 className="card-title mb-2">{name}</h2>{" "}
        <p className="mb-2">Автор: {author?.fullname}</p>
        <p className="mb-2">Колическо айтемов: {itemsCount || 0}</p>
        <Link
          className="btn btn-primary"
          to={isAdmin ? `/admin/collections/${slug}` : `/collections/${slug}`}
        >
          Смотреть
        </Link>
      </div>
    </div>
  );
}
