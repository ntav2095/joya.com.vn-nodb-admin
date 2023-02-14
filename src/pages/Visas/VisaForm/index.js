// main
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";

// components
import VisaFormGroup from "./VisaFormGroup";
import StatusBar from "../../../layout/AdminLayout/StatusBar";

// apis
import useAxios from "../../../hooks/useAxios";
import { fetchCats } from "../../../services/apis";

// css
import styles from "./VisaForm.module.css";

const isEmptyDelta = (delta) => {
  const ops = delta.ops;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

const validator = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }

  return errors;
};

function VisaForm({ visaProduct, onSubmit, initialValues }) {
  const [sendRequest, isFetchingCat, cat, fetchingCatError] = useAxios();

  const submitHandler = (values) => {
    onSubmit(values);
  };

  const fieldMessage = (msg) => <p className={styles.fieldMessage}>{msg}</p>;

  useEffect(() => {
    sendRequest(fetchCats());
  }, []);

  const countries = cat
    ? cat.data.filter((item) => item.type === "country")
    : [];

  const types = cat ? cat.data.filter((item) => item.type === "visa") : [];

  return (
    <div className={styles.visaForm}>
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitHandler}
      >
        {({ setFieldValue, setFieldTouched, values }) => (
          <Form>
            <Tabs defaultActiveKey="generalInfo" className="bg-light">
              <Tab
                eventKey="generalInfo"
                title="Thông tin chung"
                className="p-2 bg-light"
              >
                <div className={styles.formGroup}>
                  <p className={styles.label}>Tên sản phẩm visa</p>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name">{fieldMessage}</ErrorMessage>
                </div>

                {values.language === "vi" && (
                  <div className={styles.formGroup}>
                    <p className={styles.label}>Giá sản phẩm</p>
                    <Field type="number" name="price" />
                    <ErrorMessage name="price">{fieldMessage}</ErrorMessage>
                  </div>
                )}

                {values.language === "vi" && (
                  <div className="d-flex">
                    <Field as="select" name="country">
                      <option value="">--- Chọn nước ---</option>
                      {countries.map((item) => (
                        <option
                          className="d-flex align-items-center me-2 border p-2 bg-white rounded"
                          value={item.code}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                )}

                {values.language === "vi" && (
                  <div className="my-4">
                    <Field as="select" name="type">
                      <option value="">--- Chọn loại dịch vụ visa ---</option>

                      {types.map((item) => (
                        <option
                          className="d-flex align-items-center me-2 border p-2 bg-white rounded"
                          value={item.code}
                        >
                          {item.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                )}

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

              <Tab eventKey="terms" title="Điều khoản" className="p-2 bg-light">
                <VisaFormGroup
                  type="editor"
                  label="Điều kiện đăng ký"
                  values={values}
                  setFieldValue={setFieldValue}
                  name="registrationPolicy"
                />
                <VisaFormGroup
                  type="editor"
                  label="Phương thức thanh toán"
                  values={values}
                  setFieldValue={setFieldValue}
                  name="paymentPolicy"
                />
                <VisaFormGroup
                  type="editor"
                  label="Chính sách hoàn hủy đổi"
                  values={values}
                  setFieldValue={setFieldValue}
                  name="cancellationPolicy"
                />
                <VisaFormGroup
                  type="editor"
                  label="Lưu ý"
                  setFieldValue={setFieldValue}
                  values={values}
                  name="notes"
                />
              </Tab>

              <Tab eventKey="price" title="Bảng giá" className="p-2 bg-light">
                <VisaFormGroup
                  label="Giá bao gồm"
                  name="priceIncludes"
                  type="editor"
                  setFieldValue={setFieldValue}
                  values={values}
                />

                <VisaFormGroup
                  label="Giá không bao gồm"
                  name="priceExcludes"
                  type="editor"
                  setFieldValue={setFieldValue}
                  values={values}
                />

                <VisaFormGroup
                  label="Giá trẻ em và phụ thu"
                  name="priceOther"
                  type="editor"
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </Tab>
            </Tabs>

            <StatusBar title="hehe visa">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </StatusBar>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default VisaForm;
