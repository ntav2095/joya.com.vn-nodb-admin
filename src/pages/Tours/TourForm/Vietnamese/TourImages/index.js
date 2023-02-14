import styles from "./TourImages.module.css";
import { v4 as uuid } from "uuid";

// components
import SliderItem from "./SliderItem";
import ItineraryImgItem from "./ItineraryImgItem";

function TourImages({ formik }) {
  const { values, setFieldValue, setValues } = formik;

  // thên hình bằng drop
  const dropHandler = (e, index) => {
    e.preventDefault();
    const droppedImages = Array.from(e.dataTransfer.files).map((file) => ({
      image: file,
      caption: "",
      id: uuid(),
      isSlider: false,
    }));

    const updatedItinerary = values.itinerary.map((iti, itiIndex) => {
      if (itiIndex !== index) return iti;
      return { ...iti, images: [...iti.images, ...droppedImages] };
    });

    const updatedEn = {
      ...values.en,
      itinerary: values.en.itinerary.map((iti, itiIndex) => {
        if (itiIndex !== index) return iti;

        const updatedImages = [
          ...iti.images,
          ...droppedImages.map((item) => ({
            caption: item.caption,
            id: item.id,
          })),
        ];

        return { ...iti, images: updatedImages };
      }),
    };

    setValues({
      ...values,
      itinerary: updatedItinerary,
      en: updatedEn,
    });
  };

  // thêm hình thủ công (không drop)
  const chooseFilesHandler = (e, index) => {
    if (!e.target.files[0]) return; // mở input mà không chọn file nào thì không làm gì

    const newImgs = Array.from(e.target.files).map((file) => ({
      image: file,
      caption: "",
      id: uuid(),
      isSlider: false,
    }));

    // tiếng Anh (chỉ cần caption và id, không cần image và isSlider)
    const updatedItinerary = values.itinerary.map((iti, itiIndex) => {
      if (itiIndex !== index) return iti;
      return { ...iti, images: [...iti.images, ...newImgs] };
    });

    const updatedEn = {
      ...values.en,
      itinerary: values.en.itinerary.map((iti, itiIndex) => {
        if (itiIndex !== index) return iti;

        const updatedImages = [
          ...iti.images,
          ...newImgs.map((item) => ({
            caption: item.caption,
            id: item.id,
          })),
        ];

        return {
          ...iti,
          images: updatedImages,
        };
      }),
    };

    setValues({
      ...values,
      itinerary: updatedItinerary,
      en: updatedEn,
    });
  };

  // phân tích data
  const itinerary = values.itinerary;

  const slider = itinerary.reduce((acc, cur, itiIndex) => {
    return [
      ...acc,
      ...cur.images
        .map((imgItem, imgIndex) => ({
          ...imgItem,
          imgIndex,
          itiIndex,
        }))
        .filter((imgItem) => imgItem.isSlider),
    ];
  }, []);

  return (
    <div className={styles.container}>
      {/* ********************* SLIDER ********************  */}
      <div className="pb-5 border-bottom">
        <h4 className="text-center fw-bold pb-4">Hình slider</h4>

        {slider.length > 0 && (
          <ul className={styles.sliderImages}>
            {slider.map((slide) => (
              <li key={slide.id}>
                <SliderItem slide={slide} setFieldValue={setFieldValue} />
              </li>
            ))}
          </ul>
        )}

        {slider.length === 0 && itinerary.length > 0 && (
          <h6 className="text-center">Chưa chọn hình làm slider</h6>
        )}

        {itinerary.length === 0 && (
          <h6 className="text-center">Chưa có lộ trình</h6>
        )}
      </div>

      {/* ********************* HÌNH LỘ TRÌNH ********************  */}
      <div className="pt-3">
        <h4 className="text-center fw-bold pb-4">Hình lộ trình</h4>

        {itinerary.length > 0 && (
          <ul className="list-group">
            {itinerary.map((iti, itiIndex) => (
              <li key={iti.id} className="mb-4 border-bottom pb-2">
                <h6>
                  <strong>
                    {iti.day || <u className="text-danger">Chưa đặt tên</u>}
                  </strong>
                  :
                  <span className="text-lowercase">
                    {iti.destination || (
                      <u className="text-danger">Chưa đặt tên</u>
                    )}
                  </span>
                </h6>

                <ul
                  className={styles.dropZone}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => dropHandler(e, itiIndex)}
                >
                  {iti.images.map((imgItem, imgIndex) => (
                    <li key={imgItem.id}>
                      <ItineraryImgItem
                        imgItem={{ ...imgItem, imgIndex }}
                        itiIndex={itiIndex}
                        setFieldValue={setFieldValue}
                        itinerary={itinerary}
                      />
                    </li>
                  ))}

                  {/****** Ô chữ nhật có dấu cộng, nhấn vào thì mở cửa sổ chọn files *****/}
                  <li>
                    <label>
                      <div className={styles.addImage}>
                        <p className={styles.plusMark}>+</p>
                      </div>
                      <input
                        type="file"
                        hidden
                        multiple
                        onClick={(e) => (e.target.value = null)}
                        onChange={(e) => chooseFilesHandler(e, itiIndex)}
                      />
                    </label>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )}

        {itinerary.length === 0 && (
          <h6 className="text-center">Chưa có lộ trình</h6>
        )}
      </div>
    </div>
  );
}

export default TourImages;
