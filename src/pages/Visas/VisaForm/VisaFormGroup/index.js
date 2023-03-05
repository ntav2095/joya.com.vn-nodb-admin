import { ErrorMessage } from "formik";
import Editor from "../../../../containers/Editor";
import styles from "./VisaFormGroup.module.css";

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

function VisaFormGroup({
  label,
  setFieldValue,
  type,
  name,
  placeholder,
  values,
}) {
  if (type === "editor") {
    return (
      <div className="pb-4">
        <p className="mb-0 pb-1 fw-bold">{label}</p>
        <div className="bg-white">
          <Editor
            placeholder={placeholder}
            initialValue={getNestedObj(values, name)}
            onChange={(delta) => setFieldValue(name, delta)}
          />
        </div>
        <ErrorMessage name={name} />
      </div>
    );
  }
}

export default VisaFormGroup;
