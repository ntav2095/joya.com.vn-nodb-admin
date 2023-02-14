// main
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FieldArray, Form, Formik } from "formik";
import { updateTourImages } from "../../../services/apis";

// components
import Dropfile from "./DropFile";
import NotifyModal from "../../../components/NotifyModal";
import AddImageCard from "./AddImageCard";
import ImageCard from "./ImageCard";

// other
import useAxios from "../../../hooks/useAxios";
import { fetchSingleTour } from "../../../services/apis";
import styles from "./formImage.module.css";

function FormEditImage({ tourCode, show, onHide, fetchTours }) {
  const [goEdit, editing, isSuccess, editingError, resetEdit] = useAxios();
  const [sendRequest, isLoading, data, error, resetFetch] = useAxios();
  const [sentRequest, setSentRequest] = useState(false); // nếu đã sent request sửa tour thì khi thoát modal sẽ fetch lại danh sách tours

  const exitModalHandler = () => {
    resetEdit();
    resetFetch();
    onHide();
    if (sentRequest) {
      fetchTours();
    }
  };

  const tour = data?.data || null;

  // *********** SET INITIALVALUES **********************
  const initialValues = {
    thumb: tour?.thumb || "",
    banner: tour?.banner || "",
  };

  const images = tour
    ? tour.itinerary.map((item, index) => {
        return { [`ngày ${index + 1}`]: item.images };
      })
    : [];

  images.forEach((item, index) => {
    initialValues[`ngày ${index + 1}`] = item[`ngày ${index + 1}`];
  });

  // *********** SUBMIT HANDLER **********************
  const submitHandler = (values) => {
    const formdata = new FormData();
    formdata.append("tourCode", tour.code);
    formdata.append("thumb", values.thumb);
    formdata.append("banner", values.banner);

    tour.itinerary.forEach((item, index) => {
      const dayindexfile = values[`ngày ${index + 1}`]?.filter(
        (item) => typeof item !== "string"
      );
      const dayindexurl = values[`ngày ${index + 1}`]?.filter(
        (item) => typeof item === "string"
      );

      if (dayindexurl && dayindexurl.length > 0) {
        formdata.append(`plan${index}`, JSON.stringify(dayindexurl));
      } else {
        formdata.append(`plan${index}`, JSON.stringify([]));
      }

      if (dayindexfile && dayindexfile.length > 0) {
        dayindexfile.forEach((item) => {
          formdata.append(`plan${index}`, item);
        });
      }
    });

    if (!sentRequest) {
      setSentRequest(true);
    }

    goEdit(updateTourImages(formdata));
  };

  // *********** HANDLE NOTIFICATIONS **********************
  let notify = {};
  if (isSuccess) {
    notify = {
      type: "success",
      message: "Cập nhật ảnh thành công",
      btn: {
        text: "OK",
        cb: exitModalHandler,
        component: "button",
      },
      onHide: exitModalHandler,
      time: 2000,
      show: isSuccess,
    };
  }

  if (editingError) {
    notify = {
      type: "error",
      message: editingError.message,
      btn: {
        text: "OK",
        cb: () => {
          resetEdit();
        },
        component: "button",
      },
      onHide: () => {
        resetEdit();
      },
      show: editingError,
    };
  }

  // *********** FETCH TOUR **********************
  useEffect(() => {
    if (tourCode) {
      sendRequest(fetchSingleTour(tourCode));
    }
  }, [tourCode]);

  return (
    <>
      <NotifyModal {...notify} />

      <Modal size="lg" show={show} onHide={exitModalHandler}>
        {tour && (
          <Formik initialValues={initialValues} onSubmit={submitHandler}>
            {({ values, setFieldValue }) => (
              <Form>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {data.data.name} [{data.data.code}]
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  {/* **************** ẢNH THUMNAIL VÀ BANNER ******************  */}
                  <div className="row pb-4">
                    <div className="col-6">
                      <h6>Hình đại diện</h6>
                      <div className={styles.preview}>
                        {values.thumb ? (
                          <ImageCard
                            src={values.thumb}
                            close={false}
                            arr={false}
                            handleChange={setFieldValue}
                            name="thumb"
                          />
                        ) : (
                          <AddImageCard
                            callback={setFieldValue}
                            arr={false}
                            name="thumb"
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-6">
                      <h6>Hình banner</h6>
                      <div className={styles.preview}>
                        {values.banner ? (
                          <ImageCard
                            handleChange={setFieldValue}
                            src={values.banner}
                            close={false}
                            arr={false}
                            name="banner"
                          />
                        ) : (
                          <AddImageCard
                            callback={setFieldValue}
                            arr={false}
                            name="banner"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* **************** ẢNH LỘ TRÌNH ******************  */}
                  <div>
                    {images.map((item, index) => {
                      return (
                        <div
                          id={index}
                          key={index + 100}
                          className="border-top pt-3 pb-5"
                        >
                          <FieldArray name={`ngày ${index + 1}`}>
                            {({ insert, remove, push }) => (
                              <>
                                <h6 className="position-relative">
                                  {"Ảnh lộ trình ngày " + `${index + 1}`}{" "}
                                  {values[`ngày ${index + 1}`].length > 0 && (
                                    <span
                                      className={
                                        styles.removeAllImgs + " text-danger"
                                      }
                                      onClick={() => {
                                        values[`ngày ${index + 1}`]
                                          .map((item, index) => index)
                                          .reverse()
                                          .forEach((item) => remove(item));
                                      }}
                                    >
                                      Xóa hết
                                    </span>
                                  )}
                                </h6>

                                <div className={styles.container__itinerary}>
                                  {values[`ngày ${index + 1}`].map(
                                    (item, index1) => {
                                      return (
                                        <ImageCard
                                          src={item}
                                          index={index1}
                                          handleClose={remove}
                                          close={true}
                                          handleChange={insert}
                                          arr={true}
                                        />
                                      );
                                    }
                                  )}

                                  <Dropfile
                                    callback={insert}
                                    index={values[`ngày ${index + 1}`].length}
                                  />
                                </div>
                              </>
                            )}
                          </FieldArray>
                        </div>
                      );
                    })}
                  </div>

                  <button className="btn btn-primary" type="submit">
                    Lưu
                  </button>
                </Modal.Body>
              </Form>
            )}
          </Formik>
        )}

        {/* ***************** SPINNER LOADING *******************  */}
        {(isLoading || editing) && (
          <div className={styles.spinner}>
            {!tour && (
              <div className="bg-white w-100 h-100 position-absolute rounded"></div>
            )}
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
export default FormEditImage;
