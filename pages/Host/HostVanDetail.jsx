import { React, useEffect, useState } from "react";
import { Link, NavLink, useParams, Outlet } from "react-router-dom";

export default function HostVanDetail() {
  const { id } = useParams();

  const [currentVan, setCurrentVan] = useState(null);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans));
  }, [id]);

  console.log(currentVan);

  if (!currentVan) {
    return <h1> Loading...</h1>;
  }

  return (
    <section className="host-van-detail-wrapper">
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img
            src={currentVan.imageUrl}
            alt={currentVan.name}
            width={"150px"}
          />
          <div className="host-van-detail-info-text">
            <i className={`van-type ${currentVan.type} selected`}>
              {currentVan.type.charAt(0).toUpperCase() +
                currentVan.type.slice(1)}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>
              ${currentVan.price} <span>/day</span>
            </h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>

          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>

          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
}
