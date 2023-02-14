import { useState } from "react";
import styles from "./Filter.module.css";

const magnifyingGlass = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const resetSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

function Filter({ setFilter, filter }) {
  const [searchInput, setSearchInput] = useState("");

  const changeFilterHandler = (e, type) => {
    if (type === "banner") {
      setFilter((prev) => ({ ...prev, banner: e.target.value }));
    }

    if (type === "category") {
      setFilter((prev) => ({ ...prev, category: e.target.value }));
    }

    if (type === "search") {
      setFilter((prev) => ({ ...prev, search: searchInput }));
    }

    if (type === "resetSearch") {
      if (filter.search) {
        setFilter((prev) => ({ ...prev, search: "" }));
        setSearchInput("");
      }
    }
  };

  return (
    <div>
      <div className={styles.filter}>
        <select
          value={filter.category}
          onChange={(e) => changeFilterHandler(e, "category")}
        >
          <option value="all">Danh mục</option>
          <option value="all">Chưa phân loại --- chưa làm</option>
          <option value="europe">Tour châu Âu</option>
          <option value="vi">Tour Việt Nam</option>
        </select>

        <select onChange={(e) => changeFilterHandler(e, "banner")}>
          <option value="">Banner</option>
          <option value="home-slider">Banner home</option>
          <option value="vn-tours">Banner tours VN</option>
          <option value="eu-tours">Du lịch châu Âu</option>
        </select>

        <form>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className={styles.searchBtn}
            onClick={(e) => changeFilterHandler(e, "search")}
            type="button"
          >
            {magnifyingGlass}
          </button>
          <button
            className={styles.resetBtn}
            onClick={(e) => changeFilterHandler(e, "resetSearch")}
            type="button"
            title="reset search"
          >
            {resetSVG}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filter;
