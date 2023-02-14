// other
import styles from "./TourSlider.module.css";

// sliderKey: is_home_slider, is_europe_slider, is_domestic_slider
function TourSlider({ onChoose, onRemove, remainTours, chosenTours }) {
  return (
    <>
      <div className={styles.main + " row p-2"}>
        <div className="col-6 border-end">
          <h6>Còn lại:</h6>
          <ul className="list-group">
            {remainTours.map((tour) => (
              <li
                onClick={() => {
                  onChoose(tour.code);
                }}
                className="list-group-item list-group-item-action"
                key={tour.code}
              >
                {tour.name} {tour.title} {tour.code && `[${tour.code}]`}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-6">
          <h6>Chọn làm slider/banner:</h6>
          <ul className="list-group">
            {chosenTours.map((tour) => (
              <li
                onClick={() => {
                  onRemove(tour.code);
                }}
                className="list-group-item list-group-item-action"
                key={tour.code}
              >
                {tour.name} {tour.title} {tour.code && `[${tour.code}]`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TourSlider;
