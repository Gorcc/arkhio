"use client";
import React, { useState, useEffect } from "react";
import "../app/Styles/Filter.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CardComponent from "./CardComponent";

const Filter = ({ userData }) => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);

  const supabase = createClientComponentClient();

  const handleFilter = (cfilter) => {
    setFilter(cfilter);
  };

  useEffect(() => {
    const fetchData = async () => {
      let query = supabase.from("archive");

      if (filter) {
        query = query.select().eq("site_type", filter);
      } else {
        query = query.select();
      }

      const { data } = await query;
      setData(data);
      
    };

    fetchData();
  }, [filter]);

  return (
    <>
      <div className="filter-container">
        <h1>Filter by Type</h1>
        <div className="filter">
          <button
            className={filter === "" ? "active-filter" : ""}
            onClick={() => handleFilter("")}
          >
            All
          </button>
          <button
            className={filter === "UI" ? "active-filter" : ""}
            onClick={() => handleFilter("UI")}
          >
            UI
          </button>
          <button
            className={filter === "Design" ? "active-filter" : ""}
            onClick={() => handleFilter("Design")}
          >
            Design
          </button>
          <button
            className={filter === "Icon" ? "active-filter" : ""}
            onClick={() => handleFilter("Icon")}
          >
            Icon
          </button>
          <button
            className={filter === "Code" ? "active-filter" : ""}
            onClick={() => handleFilter("Code")}
          >
            Code
          </button>
          {userData && <button
            className={filter === "Favorites" ? "active-filter" : ""}
            onClick={() => handleFilter("Favorites")}
          >
            Favorites
          </button>}
        </div>
      </div>
      <div className="cards-container">
        {data?.map((item) => (
          <CardComponent
            userData={userData}
            id={item.id}
            key={item.id}
            title={item.site_name}
            description={item.site_desc}
            type={item.site_type}
            image={item.image_url}
            url={item.site_url}
          />
        ))}
      </div>
    </>
  );
};

// Export the Filter component
export default Filter;
