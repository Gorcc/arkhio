"use client"
import React, { useState } from 'react'
import "../app/Styles/Filter.scss"

const Filter = () => {
  const [currentFilter, setCurrentFilter] = useState("all")

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  }

  return (
    <div className="filter-container">
      <h1>Filter by Type</h1>
      <div className="filter">
        <button className={currentFilter === "all" ? 'active-filter' : ''} onClick={() => handleFilter("all")}>All</button>
        <button className={currentFilter === "ui" ? 'active-filter' : ''} onClick={() => handleFilter("ui")}>UI</button>
        <button className={currentFilter === "design" ? 'active-filter' : ''} onClick={() => handleFilter("design")}>Design</button>
        <button className={currentFilter === "icon" ? 'active-filter' : ''} onClick={() => handleFilter("icon")}>Icon</button>
        <button className={currentFilter === "code" ? 'active-filter' : ''} onClick={() => handleFilter("code")}>Code</button>
      </div>
    </div>
  )
}

export default Filter
