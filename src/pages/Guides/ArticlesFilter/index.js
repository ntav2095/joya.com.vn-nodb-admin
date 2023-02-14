import { useNavigate, useParams, useLocation } from "react-router-dom";
import { funnel_solid, reset as resetSVG } from "../../../assets/svgs";
import styles from "./ArticlesFilter.module.css";

function ArticlesFilter({ categories }) {
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  let { category } = useParams();
  if (!category) {
    category = "";
  }
  const location = useLocation();

  const changeCategoryHandler = (e) => {
    let path = `/guides/`;

    if (e.target.value) {
      path = `/guides/phan-loai/${e.target.value}`;
    }

    if (search) {
      path += `?search=${search}`;
    }
    navigate(path);
  };

  const searchHandler = (e) => {
    let path = `/guides/`;

    if (category) {
      path = `/guides/phan-loai/${category}`;
    }

    if (e.target.value) {
      path += `?search=${e.target.value.replace(/ /g, "%20")}`;
    }

    navigate(path);
  };

  const resetSearchHandler = () => {
    navigate(location.pathname);
  };

  const resetFilterHandler = () => {
    navigate("/guides");
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
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <form>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={searchHandler}
        />

        <button
          className={styles.resetBtn}
          onClick={resetSearchHandler}
          type="button"
          title="reset search"
        >
          {resetSVG}
        </button>
      </form>
    </div>
  );
}

export default ArticlesFilter;
