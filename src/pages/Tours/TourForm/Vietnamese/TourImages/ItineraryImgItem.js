import { ErrorMessage, Field } from "formik";
import styles from "./ItineraryImgItem.module.css";

function ItineraryImgItem({ imgItem, itiIndex, setFieldValue, itinerary }) {
  const { image, isSlider, id, imgIndex } = imgItem;

  const src = typeof image === "string" ? image : URL.createObjectURL(image);

  const toggleBtnClasses = imgItem.isSlider
    ? " bg-warning text-dark"
    : " bg-primary";

  const toggleBtnContent = imgItem.isSlider
    ? "Hủy chọn làm slider"
    : "Chọn làm slider";

  // functions
  const toggleSlider = () => {
    setFieldValue(
      `itinerary[${itiIndex}].images[${imgIndex}].isSlider`,
      !itinerary[itiIndex].images[imgIndex].isSlider,
      false
    );
  };

  const removeImg = () => {
    const updatedImgs = itinerary[itiIndex].images.filter(
      (item) => item.id !== id
    );

    // tiếng Việt
    setFieldValue(`itinerary[${itiIndex}].images`, updatedImgs, false);

    // tiếng Anh
    setFieldValue(
      `en.itinerary[${itiIndex}].images`,
      updatedImgs.map((item) => ({ caption: item.caption, id: item.id })),
      false
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img title="Loại bỏ" src={src} />
        <div className={styles.imgBtns}>
          <button
            type="button"
            className={toggleBtnClasses}
            onClick={toggleSlider}
          >
            {toggleBtnContent}
          </button>

          <button type="button" onClick={removeImg}>
            Loại bỏ
          </button>
        </div>

        {isSlider && <span className={styles.isSlider}>slider</span>}
      </div>

      <Field
        name={`itinerary[${itiIndex}].images[${imgIndex}].caption`}
        placeholder="mô tả"
      />
      <ErrorMessage
        name={`itinerary[${itiIndex}].images[${imgIndex}].caption`}
        component="p"
        className="text-danger"
      />
    </div>
  );
}

export default ItineraryImgItem;
