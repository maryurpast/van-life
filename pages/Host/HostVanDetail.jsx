import React, { Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ currentVan: getVan(params.id) });
}

export default function HostVanDetail() {
  const dataPromise = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section className="host-van-detail-wrapper">
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <Suspense fallback={<h2 aria-live="polite">Loading van details...</h2>}>
        <Await resolve={dataPromise.currentVan}>
          {(currentVan) => {
            return (
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
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}
