import { Field, ErrorMessage } from "formik";
import styles from "./ArticleForm.module.css";
import Editor from "../../../containers/Editor";

const getNestedObj = (obj, str) => {
  try {
    if (str.startsWith("translation[0]")) {
      const transIndex = str.slice(str.indexOf("[") + 1, str.indexOf("]"));
      return str
        .split(".")
        .reduce(
          (o, i, index) => (index === 0 ? o : o[i]),
          obj.translation[transIndex]
        );
    }
    return str.split(".").reduce((o, i) => o[i], obj);
  } catch (error) {
    return null;
  }
};

function ArticleField({ label, name, formik, isRequired, type }) {
  const required = (
    <em className="text-italic fw-normal text-secondary">(bắt buộc)</em>
  );

  if (type === "editor")
    return (
      <div className={styles.label}>
        <h6>{label}</h6>
        <div className={styles.quillEditor}>
          <Editor
            placeholder="Nội dung"
            onChange={(delta) => formik.setFieldValue(name, delta)}
            initialValue={getNestedObj(formik.values, name)}
            onBlur={() => formik.setFieldTouched(name, true, true)}
          />
        </div>
        {<ErrorMessage name={name} component="p" className="text-danger" />}
      </div>
    );

  return (
    <label>
      <h6>
        {label} {isRequired && required}
      </h6>

      <Field type={type} name={name} />
      <ErrorMessage name={name} component="p" className="text-danger" />
    </label>
  );
}

export default ArticleField;
