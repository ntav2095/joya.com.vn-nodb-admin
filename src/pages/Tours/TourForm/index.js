import { Formik, Form } from "formik";
import { forwardRef, useState, useEffect } from "react";

// components
import Vietnamese from "./Vietnamese";
import OtherLanguage from "./OtherLanguage";
import LanguageToggleBtns from "./LanguageToggleBtns";

// other
import useAxios from "../../../hooks/useAxios";
import {
  validationErrorsAnalyser,
  setTouchedAllFields,
  formIsValid,
  tourValidator,
} from "./TourForm.import";

// css
import "./TourForm.override.css";
import { useSelector } from "react-redux";

function TourForm({ initialValues, onSubmit }, ref) {
  const [displayLanguage, setDisplayLanguage] = useState("vi");
  const [submitted, setSubmitted] = useState(false);
  const { destinations } = useSelector((state) => state.destinations);

  // submit handler
  const submitHandler = async (e, formik) => {
    e.preventDefault();
    if (!submitted) {
      setSubmitted(true);
    }

    const { setFieldTouched, validateForm, values } = formik;
    setTouchedAllFields(setFieldTouched, values);
    const isValid = await formIsValid(validateForm);
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={tourValidator}
      enableReinitialize
      validateOnChange={false}
    >
      {(formik) => {
        const errorsText = validationErrorsAnalyser(formik.errors);
        console.log("re-render");
        console.log(formik.errors);
        return (
          <Form
            onSubmit={async (e) => {
              await submitHandler(e, formik);
            }}
          >
            {errorsText.length > 0 && submitted && (
              <p className="text-danger">
                <strong>Chưa hợp lệ: </strong>
                {errorsText.join(", ")}
              </p>
            )}

            <LanguageToggleBtns
              currentLanguage={displayLanguage}
              onToggle={setDisplayLanguage}
            />

            <div className="tourForm pb-2">
              {displayLanguage === "vi" && (
                <Vietnamese destinations={destinations} formik={formik} />
              )}

              {/* tiếng Anh */}
              {displayLanguage !== "vi" && (
                <OtherLanguage
                  formik={formik}
                  displayLanguage={displayLanguage}
                />
              )}
            </div>

            <button type="submit" ref={ref} hidden />
          </Form>
        );
      }}
    </Formik>
  );
}

export default forwardRef(TourForm);
