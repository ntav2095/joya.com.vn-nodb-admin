import { useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import useConverExcelToJson from "../../hooks/useConverExcelToJson";
import { AdminLayout, StatusBar } from "../Tours/Tours.import";
import styles from "./import.module.css";

function ImportFileExcel() {
  const [state, setState] = useState("");
  const [data, status, error] = useConverExcelToJson(state ? state : null);

  const handlechange = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const file = e.target.files[0];
    setState({ file });
  };

  const handleButton = () => {};

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <AdminLayout>
      <StatusBar title="Quản lý banners" />
      <div className={styles.container}>
        <div className={styles.content}>
          <input type="file" id="file" onChange={handlechange} />
          <Button onClick={handleButton}>Read File</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
export default ImportFileExcel;
