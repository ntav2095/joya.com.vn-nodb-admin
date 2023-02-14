import { Formik, Form, Field, ErrorMessage } from "formik";
import { forwardRef, useEffect } from "react";
import { useState } from "react";
import ArticleImg from "./ArticleImg";
import styles from "./ArticleForm.module.css";
import ArticleField from "./ArticleField";
import { useRef } from "react";
import useAxios from "../../../hooks/useAxios";
import { fetchGuidesCategory } from "../../../services/apis";

const isEmptyDelta = (delta) => {
  if (!delta) return true;

  const ops = delta.ops;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

const validator = (values) => {
  // console.log("values from validator: ", values);
  const errors = {};
  if (!values.title) {
    errors.title = "Bắt buộc";
  }

  if (!values.author) {
    errors.author = "Bắt buộc";
  }

  if (isEmptyDelta(values.content)) {
    errors.content = "Bắt buộc";
  }

  if (!values.thumb) {
    errors.thumb = "Bắt buộc";
  }

  if (!values.banner) {
    errors.banner = "Bắt buộc";
  }

  if (!values.category) {
    errors.category = "Bắt buộc";
  }

  const enErrors = {};
  if (!values.en.title) {
    enErrors.title = "Bắt buộc";
  }

  if (isEmptyDelta(values.en.content)) {
    enErrors.content = "Bắt buộc";
  }

  if (Object.keys(enErrors).length > 0) {
    errors.en = enErrors;
  }

  return errors;
};

function ArticleForm({ onSubmit, initialValues }, ref) {
  const [sendRequest, isLoading, category, error, resetStates] = useAxios(
    (data) => data.data
  );

  const [language, setLanguage] = useState("vi");
  const submitRef = useRef();

  useEffect(() => {
    sendRequest(fetchGuidesCategory());
  }, []);

  return (
    <div className={styles.container}>
      {error && (
        <h5 className="text-danger">
          {error.httpCode + " - " + error.message}
        </h5>
      )}

      {category && (
        <>
          <select
            className="p-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">Tiếng Anh</option>
          </select>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validator}
          >
            {(formik) => {
              console.log(formik.values);
              return (
                <Form>
                  {language === "vi" && (
                    <div>
                      <ArticleField
                        label="Tiêu đề"
                        type="text"
                        name="title"
                        isRequired
                      />

                      <div className="row">
                        <div className="col-6">
                          <ArticleField
                            label="Tác giả"
                            type="text"
                            name="author"
                            isRequired
                          />
                        </div>

                        <div className="col-6">
                          <ArticleField
                            label="Nguồn"
                            type="text"
                            name="origin"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <ul
                          className="d-flex gap-2 p-0 m-0"
                          style={{ listStyleType: "none" }}
                        >
                          {category.map((categoryItem) => (
                            <li key={categoryItem.id} className="m-0">
                              <label className="d-flex gap-2 bg-white p-2 rounded border mb-0">
                                <h6>{categoryItem.name}</h6>
                                <Field
                                  type="radio"
                                  value={categoryItem.id}
                                  name="category"
                                  className="w-auto"
                                />
                              </label>
                            </li>
                          ))}
                        </ul>
                        <ErrorMessage
                          name="category"
                          component="p"
                          className="m-0 text-danger"
                        />
                      </div>

                      <ArticleField
                        label="Nội dung"
                        type="editor"
                        name="content"
                        isRequired
                        formik={formik}
                      />

                      <div className="row">
                        <div className="col-6">
                          <ArticleImg name="thumb" formik={formik} />
                        </div>

                        <div className="col-6">
                          <ArticleImg name="banner" formik={formik} />
                        </div>
                      </div>
                    </div>
                  )}

                  {language !== "vi" && (
                    <>
                      <div>
                        <ArticleField
                          label="Tiêu đề"
                          type="text"
                          name="en.title"
                          isRequired
                        />

                        <ArticleField
                          label="Nội dung"
                          type="editor"
                          name="en.content"
                          isRequired
                          formik={formik}
                        />
                      </div>
                    </>
                  )}

                  <button
                    ref={ref}
                    hidden
                    type="button"
                    onClick={async () => {
                      const { setFieldTouched, validateForm, values } = formik;
                      setFieldTouched("title", true, true);
                      setFieldTouched("author", true, true);
                      setFieldTouched("content", true, true);
                      setFieldTouched("thumb", true, true);
                      setFieldTouched("banner", true, true);
                      setFieldTouched("category", true, true);
                      setFieldTouched("en.title", true, true);
                      setFieldTouched("en.content", true, true);
                      const errors = await validateForm();
                      const isValid = !Object.keys(errors).length;
                      if (!isValid) return;
                      submitRef.current.click();
                    }}
                  >
                    Submit Trigger
                  </button>

                  <button ref={submitRef} hidden type="submit">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </div>
  );
}

export default forwardRef(ArticleForm);
