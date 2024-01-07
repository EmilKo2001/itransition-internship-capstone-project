import React from "react";
import { Link } from "react-router-dom";

export default function Collection({ name, image, qty, slug }) {
  return (
    <div className="card w-full shadow">
      <img src={image} alt={name} />
      <div className="card-body">
        <h2 className="card-title mb-2">{name}</h2>
        <p className="mb-2">Колическо айтемов: {qty}</p>
        <Link className="btn btn-primary" to={`/asdasda/${slug}`}>
          Смотреть
        </Link>
      </div>
    </div>
  );
}
