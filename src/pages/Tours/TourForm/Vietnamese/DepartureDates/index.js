import { useState } from "react";
import { ErrorMessage, Field } from "formik";
import {
  isSameDate,
  stringToDate,
} from "../../../../../services/helpers/dateHandler";
import { format } from "date-fns";

function DepartureDates({ formik }) {
  const [departureDatesType, setDepartureDatesType] = useState(
    formik.values.departure_dates.length === 0 &&
      formik.values.departure_dates_text
      ? "optional"
      : "specific"
  );

  const { values, setFieldValue, setValues } = formik;

  const keydownHandler = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const keyupHandler = (e) => {
    if (e.code === "Enter") {
      const [err, newDate] = stringToDate(e.target.value);
      if (!err) {
        if (values.departure_dates.includes(newDate)) {
          alert("Bạn đã chọn ngày này");
          return;
        }

        setFieldValue("departure_dates", [...values.departure_dates, newDate]);

        e.target.value = "";
      }
    }
  };

  const removeDateHandler = (removedDate) => {
    setFieldValue(
      "departure_dates",
      values.departure_dates.filter(
        (timestamp) => !isSameDate(new Date(removedDate), new Date(timestamp))
      ),
      false
    );
  };

  return (
    <div>
      <h6>Ngày khởi hành</h6>
      {false && (
        <select
          className="p-2 w-auto mb-2"
          value={departureDatesType}
          onChange={(e) => setDepartureDatesType(e.target.value)}
        >
          <option value="specific">Ngày cụ thể</option>
          <option value="optional">Ngày không cố định - tùy chọn</option>
        </select>
      )}

      {(departureDatesType === "specific" || true) && (
        <div>
          <input
            className="p-2"
            type="text"
            name="todo"
            placeholder="ddmmyy"
            onKeyDown={keydownHandler}
            onKeyUp={keyupHandler}
          />

          <div className="d-flex flex-wrap">
            {values.departure_dates.map((item) => (
              <p className="btn btn-sm btn-secondary me-1 mt-2" key={item}>
                {format(new Date(item), "dd/MM/yyyy")}
                <span
                  className="ms-2"
                  onClick={() => {
                    removeDateHandler(item);
                  }}
                >
                  x
                </span>
              </p>
            ))}
          </div>
        </div>
      )}

      {departureDatesType === "optional" && false && (
        <Field name="departure_dates_text" placeholder="Thứ 6 hàng tuần,..." />
      )}

      <ErrorMessage name="departure_dates" />
    </div>
  );
}

export default DepartureDates;
