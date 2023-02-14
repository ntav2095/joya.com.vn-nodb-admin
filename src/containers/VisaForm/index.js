// main
import { Formik, Form, Field, ErrorMessage } from "formik";

// components
import Editor from "../Editor";
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
  if (!values.detail || isEmptyDelta(values.detail)) {
    errors.detail = "Required";
  }
  if (!values.term || isEmptyDelta(values.term)) {
    errors.term = "Required";
  }
  if (!values.priceIncludes || isEmptyDelta(values.priceIncludes)) {
    errors.priceIncludes = "Required";
  }
  if (values.price === "") {
    errors.price = "Required";
  } else if (isNaN(Number(values.price))) {
    errors.price = "Must be number";
  } else if (!isNaN(Number(values.price)) && Number(values.price) <= 0) {
    errors.price = "Must be larger than 0";
  }
  if (!values.cancellationPolicy || isEmptyDelta(values.cancellationPolicy)) {
    errors.cancellationPolicy = "Required";
  }

  return errors;
};

const templateValues = {
  name: "",
  country: "",
  price: "",
  priceIncludes: "",
  detail: "",
  term: "",
  cancellationPolicy: "",
};

function VisaForm({ visaProduct, onSubmit }) {
  const submitHandler = (values) => {
    onSubmit(values);
  };

  const initialValues = visaProduct || templateValues;

  const fieldMessage = (msg) => <p className={styles.fieldMessage}>{msg}</p>;

  return (
    <div className={styles.visaForm}>
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitHandler}
      >
        {({ setFieldValue, setFieldTouched, values }) => (
          <Form>
            <div className={styles.formGroup}>
              <p className={styles.label}>Tên sản phẩm visa</p>
              <Field type="text" name="name" />
              <ErrorMessage name="name">{fieldMessage}</ErrorMessage>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Tên nước</p>
              <Field type="text" name="country" />
              <ErrorMessage name="country">{fieldMessage}</ErrorMessage>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Giá sản phẩm</p>
              <Field type="number" name="price" />
              <ErrorMessage name="price">{fieldMessage}</ErrorMessage>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Chi tiết phiếu dịch vụ</p>
              <Editor
                placeholder="Chi tiết phiếu dịch vụ"
                initialValue={initialValues.detail}
                onChange={setFieldValue.bind(null, "detail")}
                onBlur={setFieldTouched.bind(null, "detail", true, true)}
                onFocus={setFieldTouched.bind(null, "detail", false, false)}
              />
              <ErrorMessage name="detail">{fieldMessage}</ErrorMessage>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Giá đã bao gồm</p>
              <Editor
                placeholder="Giá đã bao gồm"
                initialValue={initialValues.price}
                onChange={setFieldValue.bind(null, "priceIncludes")}
                onBlur={setFieldTouched.bind(null, "priceIncludes", true, true)}
                onFocus={setFieldTouched.bind(
                  null,
                  "priceIncludes",
                  false,
                  false
                )}
              />
              <ErrorMessage name="priceIncludes">{fieldMessage}</ErrorMessage>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Điều kiện và điều khoản</p>
              <Editor
                placeholder="Điều kiện và điều khoản"
                initialValue={initialValues.term}
                onChange={setFieldValue.bind(null, "term")}
                onBlur={setFieldTouched.bind(null, "term", true, true)}
                onFocus={setFieldTouched.bind(null, "term", false, false)}
              />
              <ErrorMessage name="term">{fieldMessage}</ErrorMessage>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Chính sách hủy đặt chỗ</p>
              <Editor
                placeholder="Chính sách hủy đặt chỗ"
                initialValue={initialValues.cancellationPolicy}
                onChange={setFieldValue.bind(null, "cancellationPolicy")}
                onBlur={setFieldTouched.bind(
                  null,
                  "cancellationPolicy",
                  true,
                  true
                )}
                onFocus={setFieldTouched.bind(
                  null,
                  "cancellationPolicy",
                  false,
                  false
                )}
              />
              <ErrorMessage name="cancellationPolicy">
                {fieldMessage}
              </ErrorMessage>
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default VisaForm;
