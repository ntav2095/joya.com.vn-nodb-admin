import { useState, useEffect, useCallback } from "react";
import styles from "./StartAt.module.css";
import { Field } from "formik";

function StartAt({ formik, places }) {
  const [type, setType] = useState(
    !formik.values.start_at && formik.values.start_at_text
      ? "optional"
      : "specific"
  );

  const selectStartPointHandler = useCallback(
    (e) => {
      formik.setFieldValue("start_at", e.target.value);
    },
    [formik.values]
  );

  const changeTypeHandler = useCallback((e) => {
    setType(e.target.value);
  }, []);

  const inputChangeHandler = useCallback(
    (e) => {
      formik.setFieldValue("start_at_text", e.target.value);
    },
    [formik.values]
  );

  return (
    <div>
      <h6 className="mb-2">Điểm khởi hành</h6>

      <div className="pb-3 d-flex align-items-center gap-2">
        <select onChange={changeTypeHandler} className="p-2" value={type}>
          <option value="specific">Địa điểm cụ thể</option>
          <option value="optional">Tùy chọn</option>
        </select>

        {type === "specific" && (
          <select
            className="p-2"
            onChange={selectStartPointHandler}
            value={formik.values.start_at}
          >
            <option value="">Chọn điểm khởi hành</option>
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        )}

        {type === "optional" && (
          <input
            onChange={inputChangeHandler}
            className="p-2"
            placeholder="vd: đón tận nơi"
            value={formik.values.start_at_text}
          />
        )}
      </div>
    </div>
  );
}

export default StartAt;
