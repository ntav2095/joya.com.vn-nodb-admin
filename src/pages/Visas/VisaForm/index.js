// main
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Tabs, Tab } from "react-bootstrap";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// components
import VisaFormGroup from "./VisaFormGroup";
import StatusBar from "../../../layout/AdminLayout/StatusBar";

// apis
import useAxios from "../../../hooks/useAxios";
import { fetchVisasCategory } from "../../../services/apis";

// css
import styles from "./VisaForm.module.css";
import "./VisaForm.override.css";

const isEmptyDelta = (delta) => {
  const ops = delta.ops;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

const validator = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Bắt buộc";
  }

  if (!values.country) {
    errors.country = "Bắt buộc";
  }

  if (!values.type) {
    errors.type = "Bắt buộc";
  }

  if (!values.price) {
    errors.price = "Bắt buộc";
  }

  const priceErrors = {};
  if (isEmptyDelta(values.price_policies.includes)) {
    priceErrors.includes = "Bắt buộc";
  }

  if (isEmptyDelta(values.price_policies.excludes)) {
    priceErrors.excludes = "Bắt buộc";
  }

  if (isEmptyDelta(values.price_policies.other)) {
    priceErrors.other = "Bắt buộc";
  }

  if (Object.keys(priceErrors).length > 0) {
    errors.price_policies = priceErrors;
  }

  const termsErrors = {};
  if (isEmptyDelta(values.terms.registration)) {
    termsErrors.registration = "Bắt buộc";
  }

  if (isEmptyDelta(values.terms.cancellation)) {
    termsErrors.cancellation = "Bắt buộc";
  }

  if (isEmptyDelta(values.terms.payment)) {
    termsErrors.payment = "Bắt buộc";
  }

  if (Object.keys(termsErrors).length > 0) {
    errors.terms = termsErrors;
  }

  return errors;
};

function VisaForm({ onSubmit, initialValues }, ref) {
  const [sendRequest, isFetchingCat, cat, fetchingCatError] = useAxios();
  const [language, setLanguage] = useState("vi");

  const submitHandler = (values) => {
    onSubmit(values);
  };

  const fieldMessage = (msg) => <p className={styles.fieldMessage}>{msg}</p>;

  useEffect(() => {
    sendRequest(fetchVisasCategory());
  }, []);

  const types = cat ? cat.data : [];

  const destinations = useSelector(
    (state) => state.destinations.destinations.places
  );

  const countries = destinations.filter((item) => item.type === "country");

  return (
    <div className={styles.visaForm + " visaForm p-2"}>
      <select
        className="p-2 mb-2"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">Tiếng Anh</option>
      </select>

      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitHandler}
        enableReinitialize
      >
        {({ setFieldValue, values, errors }) => (
          <Form>
            {console.log(errors)}
            {language === "vi" && (
              <Tabs defaultActiveKey="generalInfo">
                <Tab
                  eventKey="generalInfo"
                  title="Thông tin chung"
                  className="p-2 bg-white"
                >
                  <div className={styles.formGroup}>
                    <p className={styles.label}>Tên visa</p>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name">{fieldMessage}</ErrorMessage>
                  </div>

                  <div className="mb-4">
                    <label>
                      <h6>Giá</h6>
                      <Field
                        type="number"
                        name="price"
                        placeholder="giá"
                        className="p-2"
                      />
                    </label>

                    <ErrorMessage
                      name="price"
                      className="text-danger"
                      component="p"
                    />
                  </div>

                  <div className="d-flex gap-2 align-items-center mb-4">
                    <Field as="select" name="country" className="p-2">
                      <option value="">Nước</option>
                      {countries.map((item) => (
                        <option
                          className="d-flex align-items-center me-2 border p-2 bg-white rounded"
                          value={item.id}
                          key={item.id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Field>

                    <Field as="select" name="type" className="p-2">
                      <option value="">Loại dịch vụ</option>

                      {types.map((item) => (
                        <option
                          className="d-flex align-items-center me-2 border p-2 bg-white rounded"
                          value={item.id}
                          key={item.id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="bg-white">
                    <VisaFormGroup
                      type="editor"
                      label="Chi tiết phiếu dịch vụ"
                      values={values}
                      setFieldValue={setFieldValue}
                      name="detail"
                    />
                  </div>
                </Tab>

                <Tab
                  eventKey="terms"
                  title="Điều khoản"
                  className="p-2 bg-white"
                >
                  <VisaFormGroup
                    type="editor"
                    label="Điều kiện đăng ký"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="terms.registration"
                  />
                  <VisaFormGroup
                    type="editor"
                    label="Phương thức thanh toán"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="terms.payment"
                  />
                  <VisaFormGroup
                    type="editor"
                    label="Chính sách hoàn hủy đổi"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="terms.cancellation"
                  />
                  <VisaFormGroup
                    type="editor"
                    label="Lưu ý"
                    setFieldValue={setFieldValue}
                    values={values}
                    name="terms.notes"
                  />
                </Tab>

                <Tab
                  eventKey="price"
                  title="Bảng giá"
                  className="p-2  bg-white"
                >
                  <VisaFormGroup
                    label="Giá bao gồm"
                    name="price_policies.includes"
                    type="editor"
                    setFieldValue={setFieldValue}
                    values={values}
                  />

                  <VisaFormGroup
                    label="Giá không bao gồm"
                    name="price_policies.excludes"
                    type="editor"
                    setFieldValue={setFieldValue}
                    values={values}
                  />

                  <VisaFormGroup
                    label="Giá trẻ em và phụ thu"
                    name="price_policies.other"
                    type="editor"
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                </Tab>
              </Tabs>
            )}

            {language === "en" && (
              <Tabs defaultActiveKey="en.generalInfo" className="">
                <Tab
                  eventKey="en.generalInfo"
                  title="Thông tin chung"
                  className="p-2  bg-white"
                >
                  <div className={styles.formGroup}>
                    <p className={styles.label}>Tên visa</p>
                    <Field type="text" name="en.name" />
                    <ErrorMessage name="name">{fieldMessage}</ErrorMessage>
                  </div>

                  <div className="bg-white">
                    <VisaFormGroup
                      type="editor"
                      label="Chi tiết phiếu dịch vụ"
                      values={values}
                      setFieldValue={setFieldValue}
                      name="en.detail"
                    />
                  </div>
                </Tab>

                <Tab
                  eventKey="terms"
                  title="Điều khoản"
                  className="p-2  bg-white"
                >
                  <VisaFormGroup
                    type="editor"
                    label="Điều kiện đăng ký"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="en.terms.registration"
                  />

                  <VisaFormGroup
                    type="editor"
                    label="Phương thức thanh toán"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="en.terms.payment"
                  />

                  <VisaFormGroup
                    type="editor"
                    label="Chính sách hoàn hủy đổi"
                    values={values}
                    setFieldValue={setFieldValue}
                    name="en.terms.cancellation"
                  />

                  <VisaFormGroup
                    type="editor"
                    label="Lưu ý"
                    setFieldValue={setFieldValue}
                    values={values}
                    name="en.terms.notes"
                  />
                </Tab>

                <Tab
                  eventKey="price"
                  title="Bảng giá"
                  className="p-2  bg-white"
                >
                  <VisaFormGroup
                    label="Giá bao gồm"
                    name="en.price_policies.includes"
                    type="editor"
                    setFieldValue={setFieldValue}
                    values={values}
                  />

                  <VisaFormGroup
                    label="Giá không bao gồm"
                    name="en.price_policies.excludes"
                    type="editor"
                    setFieldValue={setFieldValue}
                    values={values}
                  />

                  <VisaFormGroup
                    label="Giá trẻ em và phụ thu"
                    name="en.price_policies.other"
                    type="editor"
                    setFieldValue={setFieldValue}
                    values={values}
                  />
                </Tab>
              </Tabs>
            )}

            <button ref={ref} hidden className="btn btn-primary" type="submit">
              Lưu
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default forwardRef(VisaForm);
