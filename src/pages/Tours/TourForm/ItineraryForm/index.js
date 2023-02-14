import {
  // main
  useEffect,
  useState,
  uuid,
  Accordion,

  // components
  Editor,

  // other
  closeSVG,

  // css
  styles,
} from "./UpdateItinerary.import";
import "./UpdateItinerary.override.css";
import { ErrorMessage, Field } from "formik";

function ItineraryForm({ language, formik, itinerary, name }) {
  const [firstRender, setFirstRender] = useState(true);
  const { setFieldValue, values, setFieldTouched, setValues } = formik;

  // thêm ngày, chỉ có ở tiếng Việt
  // khi thêm ngày thì thêm luôn ở bản en
  const addDayHandler = () => {
    const newItem = {
      id: uuid(),
      day: `NGÀY MỚI`,
      destination: `NGÀY MỚI`,
      content: { ops: [{ insert: "\n" }] },
      images: [],
    };

    setValues({
      ...values,
      itinerary: [...values.itinerary, newItem],
      en: {
        ...values.en,
        itinerary: [...values.en.itinerary, newItem],
      },
    });
  };

  // remove ngày handler
  // chỉ có ở tiếng Việt
  // khi xóa 1 ngày ở tiếng Việt thì xóa ngày tương ứng trong bản en
  const removeHandler = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ngày này không?")) {
      // setFieldValue(
      //   "itinerary",
      //   values.itinerary.filter((item) => item.id !== id),
      //   false
      // );

      // setFieldValue(
      //   "translation",
      //   values.translation.map((trans) => {
      //     return {
      //       ...trans,
      //       itinerary: trans.itinerary.filter((item) => item.id !== id),
      //     };
      //   }),
      //   false
      // );

      setValues({
        ...values,
        itinerary: values.itinerary.filter((item) => item.id !== id),
        en: {
          ...values.en,
          itinerary: values.en.itinerary.filter((item) => item.id !== id),
        },
      });
    }
  };

  // side effect: scroll khi thêm ngày, mở ra khi thêm ngày...
  useEffect(() => {
    const scrollingElement = document.getElementById("admin__content");
    scrollingElement.scroll({
      top: scrollingElement.scrollHeight,
      behavior: "smooth",
    });

    if (!firstRender && itinerary.length > 0) {
      const className = ".itinerary-" + (itinerary.length - 1);
      const btn = document.querySelector(className + " .accordion-button");
      btn.click();
    }
  }, [itinerary.length]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      if (itinerary.length === 1) {
        const className = ".itinerary-" + (itinerary.length - 1);
        const btn = document.querySelector(className + " .accordion-button");
        btn.click();
      }
    }
  }, [firstRender]);
  // side effect end

  const actionButtons = (
    <div className="d-flex align-items-center pb-4 justify-content-start">
      <button
        type="button"
        onClick={addDayHandler}
        className="btn btn-info me-2"
      >
        Thêm ngày mới
      </button>

      {values.itinerary.length > 0 && (
        <button
          type="button"
          className="btn btn-danger "
          onClick={() => {
            setFieldValue("itinerary", [], false);
            setFieldValue(
              "translation",
              values.translation.map((trans) => ({ ...trans, itinerary: [] })),
              false
            );
          }}
        >
          Xóa hết
        </button>
      )}
    </div>
  );

  const isVnTour = !name.startsWith("translation");
  return (
    <div className={styles.container + " pb-5"}>
      {isVnTour && actionButtons}

      <div className={styles.plan + " updateItinerary__accordion pb-4"}>
        {itinerary.length > 0 && (
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            {itinerary.map((planItem, index) => (
              <Accordion.Item
                eventKey={planItem.id}
                key={planItem.id}
                className={`itinerary-${index}`}
              >
                <Accordion.Header>
                  <div className={styles.accordionHeader}>
                    <h6>
                      <strong>{planItem.day}</strong>
                    </h6>
                    <h5>{planItem.destination}</h5>
                    {(language === "vi" || !language) && (
                      <span
                        title="Xóa"
                        className={styles.removeDayBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeHandler(planItem.id);
                        }}
                      >
                        {closeSVG}
                      </span>
                    )}
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <div key={planItem.id} className={styles.planItem}>
                    {/* tiêu đề  */}
                    <label>
                      <h6>Tiêu đề</h6>
                      <Field name={`${name}[${index}].day`} />
                      <ErrorMessage
                        className="text-danger"
                        name={`${name}[${index}].day`}
                        component="p"
                      />
                    </label>

                    {/* địa điểm */}
                    <label>
                      <h6>Địa điểm</h6>

                      <Field name={`${name}[${index}].destination`} />
                      <ErrorMessage
                        className="text-danger"
                        name={`${name}[${index}].destination`}
                        component="p"
                      />
                    </label>

                    {/* nội dung  */}
                    <div className="pb-3">
                      <h6>Nội dung</h6>
                      <div className={styles.editor}>
                        <Editor
                          placeholder="nhập nội dung ở đây..."
                          onChange={(delta) => {
                            setFieldValue(
                              `${name}[${index}].content`,
                              delta,
                              false
                            );
                          }}
                          initialValue={planItem.content}
                          onBlur={() => {
                            setFieldTouched(
                              `${name}[${index}].content`,
                              true,
                              true
                            );
                          }}
                        />
                        <ErrorMessage
                          className="text-danger"
                          name={`${name}[${index}].content`}
                          component="p"
                        />
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}

        {itinerary.length === 0 && <h6>Chưa có lộ trình</h6>}
      </div>

      {itinerary.length > 0 && isVnTour && actionButtons}
    </div>
  );
}

export default ItineraryForm;
