// main
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import VisaForm from "../VisaForm";
import SpinnerModal from "../../../components/SpinnerModal";

// hooks
import useAxios from "../../../hooks/useAxios";
import {
  fetchSingleVisaProduct,
  updateVisaProduct,
} from "../../../services/apis";

// css
import styles from "./EditVisa.module.css";
//
function EditVisa() {
  const [fetchVisa, isFetching, fetchedData, fetchingError] = useAxios();
  const [startEditing, isEditing, updated, editingError] = useAxios();
  const { visaId } = useParams();
  const [language, setLanguage] = useState("vi");
  const [visaFormKey, setvisaFormKey] = useState(1);

  const submitHandler = (values) => {
    console.log(values);
    startEditing(updateVisaProduct({ visaId, ...values }));
  };

  useEffect(() => {
    fetchVisa(fetchSingleVisaProduct(visaId));
  }, []);

  useEffect(() => {
    if (updated) {
      alert("Updated");
    }
  }, [updated]);

  useEffect(() => {
    if (editingError) {
      alert(`Failed: ${editingError.message.vi}`);
    }
  }, [editingError]);

  const visa = fetchedData ? fetchedData.data : null;
  let initialValues;

  if (visa && language === "vi") {
    initialValues = {
      _id: visa._id,
      language: "vi",

      name: visa.name,
      price: visa.price,
      type: visa.type,
      country: visa.country,

      priceIncludes: visa.price_policies.includes,
      priceExcludes: visa.price_policies.excludes,
      priceOther: visa.price_policies.other,

      cancellationPolicy: visa.terms.cancellation,
      registrationPolicy: visa.terms.registration,
      paymentPolicy: visa.terms.payment,
      notes: visa.terms.notes,

      detail: visa.detail,
    };
  }

  if (visa && language !== "vi") {
    const tid = visa.translation.findIndex(
      (item) => item.language === language
    );
    if (tid === -1) {
      initialValues = {
        language,
        _id: visa._id,

        name: "",
        price: visa.price,
        type: visa.type,
        country: visa.country,

        priceIncludes: null,
        priceExcludes: null,
        priceOther: null,

        cancellationPolicy: null,
        registrationPolicy: null,
        paymentPolicy: null,
        notes: null,

        detail: null,
      };
    } else {
      initialValues = {
        _id: visa._id,
        language,

        name: visa.translation[tid].name,
        price: visa.price,
        type: visa.type,
        country: visa.country,

        priceIncludes: visa.translation[tid].price_policies.includes,
        priceExcludes: visa.translation[tid].price_policies.excludes,
        priceOther: visa.translation[tid].price_policies.other,

        cancellationPolicy: visa.translation[tid].terms.cancellation,
        registrationPolicy: visa.translation[tid].terms.registration,
        paymentPolicy: visa.translation[tid].terms.payment,
        notes: visa.translation[tid].terms.notes,

        detail: visa.translation[tid].detail,
      };
    }
  }

  useEffect(() => {
    setvisaFormKey((prev) => prev + 1);
  }, [language]);

  return (
    <>
      <SpinnerModal show={isFetching || isEditing} />
      <AdminLayout title={`Cập nhật dịch vụ visa ${visa ? visa.name : ""}`}>
        <div className={styles.addVisa}>
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value="vi"> Tiếng Việt</option>
            <option value="en"> Tiếng Anh</option>
          </select>

          {visa && (
            <VisaForm
              key={visaFormKey}
              onSubmit={submitHandler}
              visaProduct={visa}
              initialValues={initialValues}
            />
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default EditVisa;
