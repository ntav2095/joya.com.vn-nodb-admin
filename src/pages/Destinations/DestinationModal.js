import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import NotifyModal from "../../components/NotifyModal";
import useAxios from "../../hooks/useAxios";
import { updateDestinationItem, addDestinationItem } from "../../services/apis";
import styles from "./AddNewDestination.module.css";

function DestinationModal({
  setDestinations,
  destinations,
  initialValues,
  mode,
  ...props
}) {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();

  const submitHandler = (values) => {
    if (mode === "edit") {
      sendRequest(updateDestinationItem(values));
    }

    if (mode === "add") {
      sendRequest(addDestinationItem(values));
    }
  };

  const validator = (values) => {
    const errors = {};

    return errors;
  };

  useEffect(() => {
    if (data) {
      if (mode === "add") {
        setDestinations((prev) => ({
          ...prev,
          places: [...prev.places, data.data],
        }));
      }

      if (mode === "edit") {
        console.log(data);
        setDestinations((prev) => ({
          ...prev,
          places: prev.places.map((item) =>
            item.id === data.data.id ? data.data : item
          ),
        }));
      }
    }
  }, [data]);

  // notification
  let notify = {};
  if (data) {
    notify = {
      show: Boolean(data),
      type: "success",
      message: mode === "add" ? "Đã thêm" : "Đã cập nhật",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetStates();
          props.onHide();
        },
      },
    };
  }

  return (
    <>
      <NotifyModal {...notify} />
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "add" ? "Thêm địa điểm" : "Cập nhật địa điểm"}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validate={validator}
        >
          {({ values }) => (
            <Form>
              <Modal.Body>
                <div className={styles.container}>
                  <label>
                    <h6>Loại: </h6>
                    <Field name="type" component="select">
                      <option value="">Chọn loại</option>
                      {destinations.types.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      ))}
                    </Field>
                  </label>

                  {values.type !== "continent" && values.type && (
                    <label>
                      <h6>Châu lục</h6>
                      <Field name="continent" component="select">
                        <option value="">Chọn châu lục</option>
                        {destinations.continents.map((item) => (
                          <option key={item.id} value={item.slug}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="continent" />
                    </label>
                  )}

                  {(values.type === "province" || values.type === "city") && (
                    <label>
                      <h6>Vùng miền</h6>
                      <Field name="region" component="select">
                        <option value="">Chọn vùng miền</option>
                        {destinations.regions.map((item) => (
                          <option key={item.id} value={item.slug}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="region" />
                    </label>
                  )}

                  <label>
                    <h6>Tên</h6>
                    <Field name="name" />
                    <ErrorMessage name="name" />
                  </label>

                  <label>
                    <h6>Tên tiếng Anh</h6>
                    <Field name="en.name" />
                    <ErrorMessage name="en.name" />
                  </label>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {error && <p className="text-danger">{error.message}</p>}
                <button className="btn btn-primary" type="submit">
                  {mode === "add" ? "Thêm" : "Cập nhật"}
                </button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default DestinationModal;
