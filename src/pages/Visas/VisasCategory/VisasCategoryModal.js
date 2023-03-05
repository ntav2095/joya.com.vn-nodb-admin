import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Field, ErrorMessage, Form, Formik } from "formik";
import useAxios from "../../../hooks/useAxios";
import NotifyModal from "../../../components/NotifyModal";
import {
  addVisasCategoryItem,
  updateVisasCategoryItem,
} from "../../../services/apis";

function VisasCategoryModal({
  mode,
  item,
  setCategory,
  onHide,
  reFetchCategories,
  ...props
}) {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();

  let initialValues = item || {
    name: "",
    en: { name: "" },
  };

  const submitHandler = (values) => {
    if (mode === "add") {
      sendRequest(addVisasCategoryItem(values));
    } else {
      sendRequest(updateVisasCategoryItem(values));
    }
  };

  const validator = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Bắt buộc";
    }

    if (!values.en.name) {
      errors.en = {
        name: "Bắt buộc",
      };
    }

    return errors;
  };

  // notification
  let notify = {};
  if (data) {
    notify = {
      show: Boolean(data),
      type: "success",
      message: "Thành công",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetStates();
        },
      },
    };
  }

  if (error) {
    notify = {
      show: Boolean(error),
      type: "error",
      message: error.message,
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetStates();
        },
      },
    };
  }

  useEffect(() => {
    if (data) {
      onHide();
      if (mode === "add") {
        setCategory((prev) => [...prev, data.data]);
      }

      if (mode === "edit") {
        setCategory((prev) =>
          prev.map((item) => (item.id === data.data.id ? data.data : item))
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      onHide();
      reFetchCategories();
    }
  }, [error]);

  return (
    <>
      <NotifyModal {...notify} />
      <Modal
        {...props}
        onHide={() => {
          onHide();
          resetStates();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm danh mục</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validate={validator}
          enableReinitialize
        >
          {({}) => (
            <Form>
              <Modal.Body>
                <label className="d-block mb-4">
                  <h6>Tên danh mục</h6>
                  <Field name="name" className="w-100 p-2" />
                  <ErrorMessage
                    name="name"
                    className="text-danger"
                    component="p"
                  />
                </label>

                <label className="d-block mb-4">
                  <h6>Tên danh mục tiếng Anh</h6>
                  <Field name="en.name" className="w-100 p-2" />
                  <ErrorMessage
                    name="en.name"
                    className="text-danger"
                    component="p"
                  />
                </label>
              </Modal.Body>
              <Modal.Footer>
                {error && <p className="text-danger">{error.message}</p>}
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default VisasCategoryModal;
