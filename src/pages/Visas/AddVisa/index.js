// main
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import TopBar from "../../../components/TopBar";
import VisaForm from "../VisaForm";
import SpinnerModal from "../../../components/SpinnerModal";
import NotifyModal from "../../../components/NotifyModal";

// hooks
import useAxios from "../../../hooks/useAxios";
import { addNewVisaProduct } from "../../../services/apis";

const DELTA = { ops: [{ insert: "\n" }] };

const initialValues = {
  name: "",
  type: "",
  country: "",
  detail: DELTA,
  price: "",
  price_policies: {
    includes: DELTA,
    excludes: DELTA,
    other: DELTA,
  },
  terms: {
    registration: DELTA,

    cancellation: DELTA,
    payment: DELTA,
    notes: DELTA,
  },
  en: {
    name: "",
    detail: DELTA,
    price_policies: {
      includes: DELTA,
      excludes: DELTA,
      other: DELTA,
    },
    terms: {
      registration: DELTA,
      cancellation: DELTA,
      payment: DELTA,
      notes: DELTA,
    },
  },
};

function AddVisa() {
  const [sendRequest, isLoading, data, error, resetAdd] = useAxios();
  const submitHandler = (values) => {
    sendRequest(addNewVisaProduct(values));
  };

  const navigate = useNavigate();

  const submitBtnRef = useRef();

  const triggerSubmit = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click();
    }
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

  // notifications
  let notify = {};
  if (data) {
    notify = {
      type: "success",
      show: Boolean(data),
      message: "Thành công",
      btn: {
        component: "button",
        cb: () => {
          navigate(0);
        },
      },
    };
  }

  if (error) {
    notify = {
      type: "error",
      show: Boolean(error),
      message: error.message,
      btn: {
        component: "button",
        cb: () => {
          resetAdd();
        },
      },
    };
  }
  return (
    <>
      <SpinnerModal show={isLoading} />
      <NotifyModal {...notify} />

      <AdminLayout>
        <TopBar title="Tạo sản phẩm visa mới">
          <button onClick={triggerSubmit} className="btn btn-primary">
            Lưu
          </button>
        </TopBar>

        <VisaForm
          ref={submitBtnRef}
          onSubmit={submitHandler}
          initialValues={initialValues}
        />
      </AdminLayout>
    </>
  );
}

export default AddVisa;
