import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AdminLayout from "../../layout/AdminLayout";
import TopBar from "../../components/TopBar";
import NotifyModal from "../../components/NotifyModal";
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";
import { fetchCompanyInfo, updateCompanyInfo } from "../../services/apis";
import styles from "./CompanyInfo.module.css";

function CompanyInfo() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios(
    (resData) => resData.data
  );
  const [update, updating, updated, updatingError, resetUpdate] = useAxios(
    (updatedData) => updatedData.data
  );
  const [content, setContent] = useState(null);
  const submitRef = useRef();

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const submitHandler = (values) => {
    update(updateCompanyInfo(values));
  };

  const validator = (values) => {
    const required = "Bắt buộc";
    const errors = {};

    if (!values.name) {
      errors.name = required;
    }
    if (!values.address) {
      errors.address = required;
    }
    if (!values.phone) {
      errors.phone = required;
    }
    if (!values.hotline) {
      errors.hotline = required;
    }
    if (!values.email) {
      errors.email = required;
    }
    if (!values.website) {
      errors.website = required;
    }
    if (!values.license_name) {
      errors.license_name = required;
    }
    if (!values.license_agency) {
      errors.license_agency = required;
    }
    if (!values.license_number) {
      errors.license_number = required;
    }
    if (!values.license_date) {
      errors.license_date = required;
    }

    let enErrors = {};

    if (!values.en.name) {
      enErrors.name = required;
    }

    if (!values.en.address) {
      enErrors.address = required;
    }

    if (!values.en.license_name) {
      enErrors.license_name = required;
    }

    if (!values.en.license_agency) {
      enErrors.license_agency = required;
    }

    if (Object.keys(enErrors).length > 0) {
      errors.en = enErrors;
    }

    return errors;
  };

  useEffect(() => {
    sendRequest(fetchCompanyInfo());
  }, []);

  useEffect(() => {
    if (data) {
      setContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (updated) {
      setContent(updated);
    }
  }, [updated]);

  usePageTitle("Thông tin công ty | Joya Travel");

  // notification
  let notify = {};
  if (updated) {
    notify = {
      show: Boolean(updated),
      type: "success",
      message: "Thành công",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetUpdate();
        },
      },
    };
  }

  if (updatingError) {
    notify = {
      show: Boolean(updatingError),
      type: "error",
      message: updatingError.message,
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetUpdate();
          sendRequest();
        },
      },
    };
  }
  return (
    <>
      <NotifyModal {...notify} />
      <AdminLayout>
        <TopBar title="Thông tin công ty">
          <button onClick={submitTrigger} className="btn btn-primary">
            Lưu
          </button>
        </TopBar>
        <div className={styles.container}>
          {content && (
            <Formik
              initialValues={content}
              onSubmit={submitHandler}
              validate={validator}
              enableReinitialize
            >
              <Form>
                <div className="row">
                  <div className="col-6">
                    <div className={styles.formGroup}>
                      <label>
                        <h6>Tên công ty</h6>
                        <Field name="name" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="name"
                        />
                      </label>

                      <label>
                        <h6>Địa chỉ</h6>
                        <Field name="address" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="address"
                        />
                      </label>

                      <label>
                        <h6>Số điện thoại</h6>
                        <Field name="phone" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="phone"
                        />
                      </label>

                      <label>
                        <h6>Hotline</h6>
                        <Field name="hotline" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="hotline"
                        />
                      </label>

                      <label>
                        <h6>Email</h6>
                        <Field name="email" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="email"
                        />
                      </label>

                      <label>
                        <h6>Website</h6>
                        <Field name="website" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="website"
                        />
                      </label>

                      <label>
                        <h6>Tên giấy phép kinh doanh</h6>
                        <Field name="license_name" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="license_name"
                        />
                      </label>

                      <label>
                        <h6>Số giấy phép kinh doanh</h6>
                        <Field name="license_number" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="license_number"
                        />
                      </label>

                      <label>
                        <h6>Đơn vị cấp</h6>
                        <Field name="license_agency" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="license_agency"
                        />
                      </label>

                      <label>
                        <h6>Ngày cấp</h6>
                        <Field name="license_date" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="license_date"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className={styles.formGroup}>
                      <label>
                        <h6>Tên công ty - tiếng Anh</h6>
                        <Field name="en.name" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="en.name"
                        />
                      </label>

                      <label>
                        <h6>Địa chỉ - tiếng Anh</h6>
                        <Field name="en.address" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="en.address"
                        />
                      </label>

                      <label>
                        <h6>Tên giấy phép kinh doanh - tiếng Anh</h6>
                        <Field name="en.license_name" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="en.license_name"
                        />
                      </label>

                      <label>
                        <h6>Đơn vị cấp giấy phép - tiếng Anh</h6>
                        <Field name="en.license_agency" />
                        <ErrorMessage
                          component="p"
                          className="text-danger m-0"
                          name="en.license_agency"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  hidden
                  ref={submitRef}
                  className="btn btn-primary"
                  type="submit"
                >
                  Lưu
                </button>
              </Form>
            </Formik>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default CompanyInfo;
// CÔNG TY CỔ PHẦN JOYA
// Địa chỉ: Hoa Sữa 11-52 Vinhomes Riveside, Long Biên, Hà Nội.

// Điện thoại: 123456789 | Hotline : 123456789

// Email: info@joya.vn

// Website: https://www.joya.com.vn

// GIẤY PHÉP KINH DOANH DỊCH VỤ LỮ HÀNH QUỐC TẾ
// Số GP/No: 79-042/2022/TCDL - GP LHQT

// Do TCDL cấp ngày 30/10/2022
