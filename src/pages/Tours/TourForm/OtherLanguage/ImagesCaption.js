import { ErrorMessage, Field } from "formik";
import styles from "./ImagesCaption.module.css";

function ImagesCaption({ values }) {
  return (
    <div className={styles.container}>
      {values.itinerary.length > 0 && (
        <ul className={styles.itinerary}>
          {values.itinerary.map((iti, itiIndex) => (
            <li key={iti.id}>
              <h6 className="bg-secondary text-light p-2">
                <strong>
                  {values.en.itinerary[itiIndex].day || "Chưa đặt tên"}:{" "}
                </strong>
                {values.en.itinerary[itiIndex].destination || "Chưa đặt tên"}
              </h6>

              {iti.images.length === 0 && <h6>Chưa có hình</h6>}
              {iti.images.length > 0 && (
                <ul className={styles.images}>
                  {iti.images.map((imgItem, imgIndex) => (
                    <li key={imgItem.id}>
                      <div className={styles.image}>
                        <img
                          src={
                            typeof imgItem.image === "string"
                              ? imgItem.image
                              : URL.createObjectURL(imgItem.image)
                          }
                        />
                        <Field
                          name={`en.itinerary[${itiIndex}].images[${imgIndex}].caption`}
                          placeholder="mô tả"
                        />
                        <ErrorMessage
                          name={`en.itinerary[${itiIndex}].images[${imgIndex}].caption`}
                          component="p"
                          className="text-danger "
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {values.itinerary.length === 0 && <h6>Chưa có lộ trình</h6>}
    </div>
  );
}

export default ImagesCaption;
