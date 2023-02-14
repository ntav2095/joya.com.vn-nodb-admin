import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import SpinnerModal from "../../components/SpinnerModal";
import styles from "./Terms.module.css";
import "./Terms.override.css";
import StatusBar from "../../layout/AdminLayout/StatusBar";

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
  return (
    <>
      <AdminLayout>
        <StatusBar title="Điều khoản" />

        <div className={styles.container + "  layoutManager"}>
          <Tabs defaultActiveKey={TERM_ITEMS[0].type}>
            {TERM_ITEMS.map((item) => (
              <Tab key={item.type} eventKey={item.type} title={item.name}>
                <div key={item.type} className="py-3 ">
                  {<TermTab type={item.type} />}
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}

export default Terms;
