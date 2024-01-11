import React from "react";
import { Link } from "react-router-dom";

export default function Collection({ name, image, qty, slug, author }) {
  return (
    <div className="card w-full shadow">
      {/* <img src={image} alt={name} /> */}
      <img
        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        alt="Shoes"
      />
      <div className="card-body">
        <h2 className="card-title mb-2">{name}</h2>{" "}
        <p className="mb-2">Автор: {author}</p>
        <p className="mb-2">Колическо айтемов: {qty}</p>
        <Link className="btn btn-primary" to={`/admin/collections/${slug}`}>
          Смотреть
        </Link>
      </div>
    </div>
  );
}
