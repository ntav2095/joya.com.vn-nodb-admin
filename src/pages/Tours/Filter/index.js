import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

import { reset as resetSVG, funnel_solid } from "../../../assets/svgs";
import styles from "./Filter.module.css";

function Filter() {
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  const location = useLocation();
  let { category } = useParams();

  if (
    !category ||
    !["chau-au", "viet-nam", "thieu-hinh"].includes(category.trim())
  ) {
    category = "";
  }

  const changeCategoryHandler = (e) => {
    let path = "/tours";

    if (e.target.value) {
      path = `/tours/phan-loai/${e.target.value}`;
    }

    if (search) {
      path += `?search=${search}`;
    }

    navigate(path);
  };

  const resetFilterHandler = () => {
    navigate(`/tours`);
  };

  const changeSearchInputHandler = (e) => {
    let path = location.pathname;
    if (e.target.value) {
      path += `?search=${e.target.value.replace(/ /g, "%20")}`;
    }

    navigate(path);
  };

  const clearSearchInputHandler = () => {
    let path = location.pathname;
    navigate(path);
  };

  const isNoFilter = !category && !search;

  return (
    <div className={styles.filter}>
      <button
        className={
          "border bg-secondary text-white " +
          (isNoFilter && "opacity-50 pe-none")
        }
        onClick={resetFilterHandler}
      >
        <span className="me-1 fs-6">{funnel_solid}</span>
        Đặt lại bộ lọc
      </button>

      <select value={category} onChange={changeCategoryHandler}>
        <option value="">Danh mục</option>
        <option value="chau-au">Tour châu Âu</option>
        <option value="viet-nam">Tour Việt Nam</option>
        <option value="thieu-hinh-anh">Thiếu hình ảnh</option>
      </select>

      <form>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={changeSearchInputHandler}
        />
        <button
          className={styles.resetBtn}
          onClick={clearSearchInputHandler}
          type="button"
          title="reset search"
        >
          {resetSVG}
        </button>
      </form>
    </div>
  );
}

export default Filter;
