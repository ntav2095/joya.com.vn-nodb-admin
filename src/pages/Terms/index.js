import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import SpinnerModal from "../../components/SpinnerModal";
import "./Terms.override.css";
import TopBar from "../../components/TopBar";
import useAxios from "../../hooks/useAxios";
import { fetchTerms, updateTerms } from "../../services/apis";
import { Formik, Form, ErrorMessage } from "formik";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TermTab from "./TermTab";

const TERM_ITEMS = [
  {
    type: "registration",
    name: "Điều kiện đăng ký",
  },
  {
    type: "notes",
    name: "Thông tin cần lưu ý",
  },
  {
    type: "payment",
    name: "Phương thức thanh toán",
  },
  {
    type: "privacy",
    name: "Bảo mật dữ liệu khách hàng",
  },
  {
    type: "cancellation",
    name: "Điều kiện hủy đổi",
  },
];

function Terms() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [goUpdate, isUpdating, updated, updatingError] = useAxios();
  const [language, setLanguage] = useState("vi");

  const submitHandler = (values) => {
    sendRequest(updateTerms(values));
  };

  const validator = (values) => {
    const errors = {};
    return errors;
  };

  useEffect(() => {
    sendRequest(fetchTerms());
  }, []);

  let terms;
  if (data) {
    terms = data.data;
  }

  console.log(terms);

  return (
    <>
      <SpinnerModal show={isLoading || isUpdating} />
      <AdminLayout>
        {terms && (
          <Formik
            initialValues={terms}
            validate={validator}
            onSubmit={submitHandler}
          >
            {(formik) => (
              <Form>
                <TopBar title="Điều khoản">
                  <button className="btn btn-primary">Lưu</button>
                </TopBar>

                <div className="p-2 terms">
                  <select
                    className="p-2  mb-3"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">Tiếng Anh</option>
                  </select>

                  {language === "vi" && (
                    <Tabs defaultActiveKey="registration">
                      {TERM_ITEMS.map((item) => (
                        <Tab
                          key={item.type}
                          eventKey={item.type}
                          title={item.name}
                        >
                          <TermTab
                            onChange={(delta) => {
                              formik.setFieldValue(item.type, delta);
                            }}
                            initialValue={formik.values[item.type]}
                          />
                        </Tab>
                      ))}
                    </Tabs>
                  )}

                  {language === "en" && (
                    <Tabs defaultActiveKey="registration">
                      {TERM_ITEMS.map((item) => (
                        <Tab
                          key={item.type}
                          eventKey={item.type}
                          title={item.name}
                        >
                          <TermTab
                            onChange={(delta) => {
                              formik.setFieldValue(`en.${item.type}`, delta);
                            }}
                            initialValue={formik.values.en[item.type]}
                          />
                        </Tab>
                      ))}
                    </Tabs>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </AdminLayout>
    </>
  );
}

export default Terms;
