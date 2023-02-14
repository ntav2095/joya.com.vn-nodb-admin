// main
import { useEffect } from "react";

// components
import AdminLayout from "../../../layout/AdminLayout";
import StatusBar from "../../../layout/AdminLayout/StatusBar";
import VisaForm from "../VisaForm";
import SpinnerModal from "../../../components/SpinnerModal";

// hooks
import useAxios from "../../../hooks/useAxios";
import { addNewVisaProduct } from "../../../services/apis";

// css
import styles from "./AddVisa.module.css";
//

const initialValues = {
  language: "vi",

  name: "",
  price: "",
  type: "",
  country: "",

  priceIncludes: null,
  priceExcludes: null,
  priceOther: null,

  cancellationPolicy: null,
  registrationPolicy: null,
  paymentPolicy: null,
  notes: null,

  detail: null,
};

function AddVisa() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const submitHandler = (values) => {
    sendRequest(addNewVisaProduct(values));
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
      <AdminLayout>
        <StatusBar title="Tạo sản phẩm visa mới"></StatusBar>

        <div className={styles.addVisa}>
          <VisaForm onSubmit={submitHandler} initialValues={initialValues} />
        </div>
      </AdminLayout>
    </>
  );
}

export default AddVisa;
