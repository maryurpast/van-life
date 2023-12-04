import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Vans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("api/vans")
      .then((response) => response.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  const vanElements = vans.map((van) => {
    let { id, description, imageUrl, name, price, type } = van;

    return (
      <div key={van.id} className="van-tile">
        <Link to={`/vans/${id}`}>
          <img src={imageUrl} alt={name} />
          <div className="van-info">
            <h3>{name}</h3>
            <p>
              ${price} <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${type} selected`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </i>
        </Link>
      </div>
    );
  });

  return (
    <div className="vans-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
