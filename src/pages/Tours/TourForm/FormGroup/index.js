import { ErrorMessage, Field } from "formik";
import Editor from "../../../../containers/Editor";
import styles from "./FormGroup.module.css";

const requiredField = <em title="Bắt buộc">(bắt buộc)</em>;

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

const allowedChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const numberInputHandler = (prevVal, curVal) => {
  // delete
  if (curVal.length < prevVal.length) {
    return [null, Number(curVal.replace(/,/g, "")).toLocaleString()];
  }

  const newChar = curVal.replace(prevVal, "");
  // new char is dot
  if (newChar === ".") {
    if (prevVal.includes(".")) {
      return [true, null];
    } else {
      return [null, Number(prevVal.replace(/,/g, "")).toLocaleString() + "."];
    }
  }

  if (!allowedChars.includes(newChar)) return [true, null];
  return [null, Number(curVal.replace(/,/g, "")).toLocaleString()];
};

function FormGroup(props) {
  const { isRequired, label, note, component, type, name, formik, ...other } =
    props;

  // label
  let form_label = (
    <p className={styles.label}>
      {label} {note && <em>{note}</em>} {isRequired && requiredField}
    </p>
  );

  // field
  let form_field = (
    <Field component={component} type={type} name={name} {...other} />
  );

  if (type === "file") {
    const { values, setFieldValue } = formik;
    const src =
      typeof values[name] === "string"
        ? values[name]
        : URL.createObjectURL(values[name]);

    // chọn file bằng drop
    const dropHandler = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 1) return; // drop hơn 1 hình thì không làm gì
      setFieldValue(name, Array.from(e.dataTransfer.files)[0], false);
    };

    // chọn file bình thường
    const changeHandler = (e) => {
      if (e.target.files[0]) {
        setFieldValue(name, Array.from(e.target.files)[0], false);
      }
    };

    form_field = (
      <label
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      >
        <div className={styles.image}>
          {values[name] && <img className="img-fluid w-100 h-100" src={src} />}
          {!values[name] && <p className={styles.plusImage}>+</p>}
        </div>
        <input type="file" name={name} hidden onChange={changeHandler} />
      </label>
    );
  }

  if (type === "editor") {
    const { setFieldValue, setFieldTouched, values } = formik;
    const changeHandler = (delta) => {
      setFieldValue(name, delta, false);
    };

    const blurHandler = () => {
      setFieldTouched(name, true, true);
    };

    const initialValue = getNestedObj(values, name);

    form_field = (
      <div className={styles.editor}>
        <Editor
          initialValue={initialValue}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </div>
    );
  }

  if (type === "locale-number") {
    const { setFieldValue, values } = formik;

    const changeHandler = (e) => {
      const [error, numberValue] = numberInputHandler(
        values[name],
        e.target.value
      );
      if (error) return;
      setFieldValue(name, numberValue, false);
    };

    form_field = (
      <input type="text" value={values[name]} onChange={changeHandler} />
    );
  }

  return (
    <div className={styles.container}>
      {form_label}
      {form_field}
      <div className={styles.errorMessage}>
        <ErrorMessage name={name} className="text-danger" component="h6" />
      </div>
    </div>
  );
}

export default FormGroup;
