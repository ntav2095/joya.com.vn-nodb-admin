// main
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import SpinnerModal from "../../components/SpinnerModal";

// apis
import useAxios from "../../hooks/useAxios";
import { login } from "../../services/apis";

// store
import { setUser } from "../../store/user.slice";

// css
import styles from "./Login.module.css";

const validator = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Missing username";
  }

  if (!values.password) {
    errors.password = "Missing password";
  }

  return errors;
};

const initialValues = {
  username: "",
  password: "",
};

function Login() {
  const [sendRequest, isLoading, data, error, resetAxios] = useAxios();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const submitHandler = (values) => {
    sendRequest(login(values.username, values.password));
  };

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
      localStorage.setItem("accessToken", data.metadata.accessToken);
      localStorage.setItem("user", JSON.stringify(data.data));
    }
  }, [data]);

  if (user && !location.state.isExpired) {
    return <Navigate to="/admin" />;
  }

  if (user && location.state.isExpired) {
    return <Navigate to={location.state.from} />;
  }

  return (
    <>
      {isLoading && <SpinnerModal show={isLoading} />}

      {/* session expired notification  */}
      <div className={styles.login}>
        {location.state.isExpired && (
          <div className={styles.expiredSession}>
            <h1>Your session is expired. Please login!</h1>
          </div>
        )}

        <h1 className="pb-4">Joya.com.vn</h1>

        {/* login form  */}
        <Formik
          initialValues={initialValues}
          validate={validator}
          onSubmit={submitHandler}
        >
          {({ errors }) => {
            return (
              <Form>
                <label>
                  <Field type="text" name="username" placeholder="username" />
                  <ErrorMessage name="username" component="span" />
                </label>
                <label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                  <ErrorMessage name="password" component="span" />
                </label>

                <p className={styles.errorMessage}>{error && error.message}</p>
                <button type="submit">Login</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default Login;
