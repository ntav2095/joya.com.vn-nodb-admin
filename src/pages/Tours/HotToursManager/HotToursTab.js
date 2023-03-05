import { useState } from "react";
import styles from "./HotToursTab.module.css";

function HotToursTab({ title, addTour, removeTour, remainTours, chosenTours }) {
  const [search, setSearch] = useState("");
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchTerm = search.trim().toLowerCase();
  const filteredTours = remainTours.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.code.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="row bg-white p-2 rounded">
      <h5>{title}</h5>

      <form className="mb-2">
        <input
          className="form-control"
          type="text"
          placeholder="Tìm địa điểm"
          value={search}
          onChange={changeHandler}
        />
      </form>

      <div className="col-6">
        <h6>Tour còn lại</h6>

        {remainTours.length === 0 && (
          <p>
            <i>Không có tour nào</i>
          </p>
        )}
        {remainTours.length > 0 && filteredTours.length === 0 && (
          <p>
            <i>Không có kết quả phù hợp</i>
          </p>
        )}

        {filteredTours.length > 0 && (
          <ul className={styles.tourList + " list-group mt-2 border p-2"}>
            {filteredTours.map((tour) => (
              <li
                className="list-group-item"
                key={tour.code}
                onClick={() => addTour(tour)}
              >
                {tour.name} [{tour.code}]
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.chosenTours + " col-6"}>
        <h6>Tour đã chọn</h6>
        <ul className={styles.tourList + " list-group mt-2 border p-2"}>
          {chosenTours.map((tour) => (
            <li
              className="list-group-item"
              key={tour.code}
              onClick={() => removeTour(tour)}
            >
              {tour.name} [{tour.code}]
            </li>
          ))}

          {chosenTours.length === 0 && (
            <p>
              <i>Chưa chọn tour nào</i>
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HotToursTab;
