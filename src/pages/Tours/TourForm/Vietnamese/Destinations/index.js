import { useState } from "react";
import styles from "./Destinations.module.css";

function Destinations({ title, places, formik }) {
  const [search, setSearch] = useState("");
  const destinations = formik.values.destinations;
  const setFieldValue = formik.setFieldValue;

  // ************* handlers *********************
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const choosePlaceHandler = (id) => {
    setFieldValue("destinations", [...destinations, id], false);
  };

  const removePlaceHandler = (id) => {
    setFieldValue(
      "destinations",
      destinations.filter((dest) => dest !== id),
      false
    );
  };

  // ************* lọc ra các địa điểm chưa chọn - đã chọn - tìm kiếm ***********
  // chưa chọn
  const remainItems = places.filter(
    (place) => !destinations.some((id) => id === place.id)
  );

  // chưa chọn được search
  const searchedItems = remainItems.filter((item) =>
    item.name.includes(search.toLowerCase())
  );

  // đã chọn
  // const chosenItems = destinations.filter((id) =>
  //   places.some((place) => place.id === id)
  // );

  const chosenItems = places.filter((place) =>
    destinations.some((id) => place.id === id)
  );

  // ***************** JSX CONTENT ******************
  // ----------------- địa điểm chưa chọn -----------
  let remainItemsJSX;
  if (remainItems.length === 0) {
    remainItemsJSX = (
      <p>
        <i>Không còn địa điểm nào</i>
      </p>
    );
  }

  if (remainItems.length > 0 && searchedItems.length === 0) {
    remainItemsJSX = (
      <p>
        <i>Không tìm thấy địa điểm nào</i>
      </p>
    );
  }

  if (searchedItems.length > 0) {
    remainItemsJSX = (
      <ul className="list-group">
        {searchedItems.map((item) => (
          <li
            className="list-group-item"
            key={item.id}
            onClick={() => choosePlaceHandler(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }

  // ---------------- địa điểm đã chọn -------------
  let chosenItemsJSX;
  if (chosenItems.length === 0) {
    chosenItemsJSX = (
      <p>
        <i>Chưa chọn địa điểm nào</i>
      </p>
    );
  }

  if (chosenItems.length > 0) {
    chosenItemsJSX = (
      <ul className="list-group">
        {chosenItems.map((item) => {
          return (
            <li
              className="list-group-item"
              key={item.id}
              onClick={() => {
                removePlaceHandler(item.id);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      <h6 className="text-uppercase fw-bold">{title}</h6>
      <input
        type="text"
        className="form-control"
        value={search}
        onChange={changeHandler}
        placeholder="Tìm địa danh"
      />
      <div className="row mt-2">
        <div className="col-6">
          <h6>Địa điểm chưa chọn</h6>
          <div className={styles.listContainer}>{remainItemsJSX}</div>
        </div>

        <div className="col-6">
          <h6>Địa điểm đã chọn</h6>
          <div className={styles.listContainer + " " + styles.chosenItems}>
            {chosenItemsJSX}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destinations;
