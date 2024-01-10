import React, { Suspense } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../api";

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dataPromise = useLoaderData();

  function renderVanElements(vans) {
    const typeFilter = searchParams.get("type");

    const displayedVans = typeFilter
      ? vans.filter((van) => typeFilter === van.type)
      : vans;

    const vanElements = displayedVans.map((van) => {
      return (
        <div key={van.id} className="van-tile">
          <Link
            to={van.id}
            state={{
              search: `?${searchParams.toString()}`,
              type: typeFilter,
            }}
          >
            <img src={van.imageUrl} alt={`Image of ${van.name}`} />
            <div className="van-info">
              <p className="van-info-name">{van.name}</p>
              <p className="van-info-price">
                ${van.price} <span>/day</span>
              </p>
            </div>
            <i className={`van-type ${van.type} selected`}>
              {van.type.charAt(0).toUpperCase() + van.type.slice(1)}
            </i>
          </Link>
        </div>
      );
    });

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => handleFilterChange("type", "simple")}
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
          >
            Simple
          </button>

          <button
            onClick={() => handleFilterChange("type", "luxury")}
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
          >
            Luxury
          </button>

          <button
            onClick={() => handleFilterChange("type", "rugged")}
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
          >
            Rugged
          </button>

          {typeFilter && (
            <button
              onClick={() => handleFilterChange("type", null)}
              className="van-type clear-filter"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <div className="vans-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2 aria-live="polite">Loading vans ...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}
