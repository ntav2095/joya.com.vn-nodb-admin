import { ErrorMessage } from "formik";
import Editor from "../../../../containers/Editor";
import styles from "./VisaFormGroup.module.css";

function VisaFormGroup({
  label,
  setFieldValue,
  setFieldTouched,
  type,
  name,
  placeholder,
  initialValues,
  values,
}) {
  if (type === "editor") {
    return (
      <div className="pb-4">
        <p className="mb-0 pb-1 fw-bold">{label}</p>
        <div className="bg-white">
          <Editor
            placeholder={placeholder}
            initialValue={values[name]}
            onChange={setFieldValue.bind(null, name)}
          />
        </div>
      </div>
    );
  }
}

export default VisaFormGroup;
