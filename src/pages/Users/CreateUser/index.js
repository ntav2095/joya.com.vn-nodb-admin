import { Field, ErrorMessage, Formik, Form } from "formik";
import usePageTitle from "../../../hooks/usePageTitle";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import AdminLayout from "../../../layout/AdminLayout";
import useAxios from "../../../hooks/useAxios";
import { createUser } from "../../../services/apis";
import styles from "./CreateUser.module.css";

const initialValues = {
  username: "",
  password: "",
  re_password: "",
  role: "client",
};

const validator = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "bắt buộc";
  }

  if (!values.password) {
    errors.password = "bắt buộc";
  }

  if (!values.re_password) {
    errors.re_password = "bắt buộc";
  }

  if (
    values.password &&
    values.re_password &&
    values.re_password !== values.password
  ) {
    errors.re_password = "Không trùng";
  }

  return errors;
};

function CreateUser() {
  const [sendRequest, isLoading, success, error, resetStates] = useAxios();

  const submitHandler = (values) => {
    sendRequest(
      createUser({
        username: values.username.trim(),
        password: values.password,
        re_password: values.password,
        role: values.role,
      })
    );
  };

  usePageTitle("Quản lý user | Joya Travel");

  return (
    <>
      <AdminLayout>
        <StatusBar title="Tạo user mới"></StatusBar>
        <div className={styles.container}>
          <Formik
            initialValues={initialValues}
            validate={validator}
            onSubmit={submitHandler}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <label>
                  <h6>Username</h6>
                  <Field type="text" name="username" />
                  <ErrorMessage name="username" component="p" />
                </label>

                <div className={styles.role}>
                  <h6>Role</h6>

                  <div className="d-flex">
                    <label className="d-flex align-items-center border p-2 mx-2 rounded">
                      <h5 className="fs-6 fw-normal mb-0 me-2">client</h5>
                      <input
                        type="checkbox"
                        value="client"
                        checked={values.role === "client"}
                        onChange={() => {
                          if (values.role !== "client") {
                            setFieldValue("role", "client");
                          }
                        }}
                      />
                    </label>

                    <label className="d-flex align-items-center border p-2 mx-2 rounded">
                      <h5 className="fs-6 fw-normal mb-0 me-2">moderator</h5>
                      <input
                        type="checkbox"
                        value="moderator"
                        checked={values.role === "moderator"}
                        onChange={() => {
                          if (values.role !== "moderator") {
                            setFieldValue("role", "moderator");
                          }
                        }}
                      />
                    </label>

                    <label className="d-flex align-items-center border p-2 mx-2 rounded">
                      <h5 className="fs-6 fw-normal mb-0 me-2">admin</h5>
                      <input
                        type="checkbox"
                        value="admin"
                        checked={values.role === "admin"}
                        onChange={() => {
                          if (values.role !== "admin") {
                            setFieldValue("role", "admin");
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <label>
                  <h6>Password</h6>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="p" />
                </label>

                <label>
                  <h6>Re-password</h6>
                  <Field type="password" name="re_password" />
                  <ErrorMessage name="re_password" component="p" />
                </label>

                {success && <p className="text-success">Thành công</p>}
                {error && <p className="text-danger">{error.message}</p>}

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </AdminLayout>
    </>
  );
}

export default CreateUser;
