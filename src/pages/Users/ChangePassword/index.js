// main
import { useEffect } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { useParams } from "react-router-dom";

import usePageTitle from "../../../hooks/usePageTitle";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import AdminLayout from "../../../layout/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import SpinnerModal from "../../../components/SpinnerModal";
import { fetchSingleUser, changePassword } from "../../../services/apis";

import styles from "./ChangePassword.module.css";

const validator = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "bắt buộc";
  }

  if (!values.new_password) {
    errors.new_password = "bắt buộc";
  }

  if (!values.re_new_password) {
    errors.re_new_password = "bắt buộc";
  }

  if (
    values.new_password &&
    values.re_new_password &&
    values.new_password !== values.re_new_password
  ) {
    errors.re_new_password = "Mật khẩu nhập lại không đúng";
  }

  return errors;
};

function ChangePassword() {
  const [sendRequest, isLoading, success, error, resetStates] = useAxios();
  const [fetchUser, isFetching, data, fetchingError] = useAxios();

  const { username } = useParams();

  const submitHandler = (values) => {
    resetStates();
    sendRequest(
      changePassword({
        username: values.username,
        password: values.password,
        new_password: values.new_password,
        re_new_password: values.re_new_password,
      })
    );
  };

  const initialValues = data
    ? {
        username: data.data.username,
        password: "",
        new_password: "",
        re_new_password: "",
      }
    : null;

  useEffect(() => {
    fetchUser(fetchSingleUser(username));
  }, []);

  usePageTitle("Đổi mật khẩu | Joya Travel");

  return (
    <>
      <SpinnerModal show={isLoading || isFetching} />

      <AdminLayout>
        <StatusBar title="Đổi mật khẩu"></StatusBar>
        <div className={styles.container}>
          {initialValues && (
            <Formik
              initialValues={initialValues}
              validate={validator}
              onSubmit={submitHandler}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <label className={styles.username}>
                    <h6>Username</h6>
                    <Field type="text" name="username" readOnly />
                    <ErrorMessage name="username" component="p" />
                  </label>

                  <label>
                    <h6>Mật khẩu hiện tại</h6>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="p" />
                  </label>

                  <label>
                    <h6>Mật khẩu mới</h6>
                    <Field type="password" name="new_password" />
                    <ErrorMessage name="new_password" component="p" />
                  </label>

                  <label>
                    <h6>Nhập lại mật khẩu mới</h6>
                    <Field type="password" name="re_new_password" />
                    <ErrorMessage name="re_new_password" component="p" />
                  </label>

                  {success && !error && !isLoading && (
                    <p className="text-success">Thành công</p>
                  )}
                  {error && <p className="text-danger">{error.message}</p>}

                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default ChangePassword;
