import styles from "./SliderItem.module.css";

function SliderItem({ slide, setFieldValue }) {
  const { image, caption, imgIndex, itiIndex } = slide;

  const src = typeof image === "string" ? image : URL.createObjectURL(image);

  const removeSlideHandler = () => {
    setFieldValue(`itinerary[${itiIndex}].images[${imgIndex}].isSlider`, false);
  };

  return (
    <div className={styles.sliderItem}>
      <img src={src} alt={caption} />
      <button type="button" onClick={removeSlideHandler}>
        Hủy chọn
      </button>
      <p className={styles.caption}>
        {caption.trim() ? caption : "Chưa có mô tả"}
      </p>
    </div>
  );
}

export default SliderItem;
