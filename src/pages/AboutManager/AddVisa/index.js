// main
import { useEffect } from "react";

// components
import AdminLayout from "../../layout/AdminLayout";
import VisaForm from "../../../containers/VisaForm";
import SpinnerModal from "../../components/SpinnerModal";

// hooks
import useAxios from "../../hooks/useAxios";
import { visaApi } from "../../../services/apis";

// css
import styles from "./AddVisa.module.css";
//
function AddVisa() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const submitHandler = (values) => {
    sendRequest(visaApi.addVisa(values));
  };

  useEffect(() => {
    if (data) {
      alert("Added new visa product successfully!");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(`Failed to add visa: ${error.message.vi}!`);
    }
  }, [error]);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout title="Thêm dịch vụ visa mới">
        <div className={styles.addVisa}>
          <VisaForm onSubmit={submitHandler} />
        </div>
      </AdminLayout>
    </>
  );
}

export default AddVisa;
