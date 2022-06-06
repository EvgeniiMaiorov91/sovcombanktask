import classes from "./App.module.scss";
import { useRef, useState } from "react";
import Multiselect from "../Multiselect/Multiselect";
import submitHandler from "../../utils/submitHandler";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import Select from "../Select/Select";
import CheckBox from "../CheckBox/CheckBox";

import Loading from "../Loader/Loading";
import SuccessModel from "../SuccessModel/SuccessModel";
import Inputs from "../Inputs/Inputs";

function App() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    fullName: {},
    dateOfBirth: "",
    phone: "",
    gender: "",
    clientsGroup: [],
    doctor: "",
    sms: false,
  });
  const [status, setStatus] = useState({
    success: false,
    loader: false,
  });
  const select = {
    multi: [
      { value: "VIP" },
      { value: "Проблемные" },
      { value: "ОМС" },
      { value: "ДМС" },
    ],
    gender: [{ value: "MALE" }, { value: "FEMALE" }],
    doctor: [
      { value: "Петров" },
      { value: "Захаров" },
      { value: "Черниговская" },
    ],
  };
  const [error, setError] = useState({
    fullName: false,
    dateOfBirth: false,
    phone: false,
    gender: false,
    clientsGroup: false,
    doctor: false,
  });
  return (
    <>
      <div className={classes.App}>
        <p>Форма клиента</p>
        <form
          className={classes.clientForm}
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            setStatus({ ...status, loader: true });
            setError({
              fullName: false,
              dateOfBirth: false,
              phone: false,
              gender: false,
              clientsGroup: false,
              doctor: false,
            });
            submitHandler(
              formData,
              setError,
              setStatus,
              setFormData,
              formRef.current
            );
          }}
        >
          <Inputs formData={formData} setFormData={setFormData} error={error} />
          <label htmlFor="gender">Пол</label>
          <Select
            options={select}
            type="gender"
            value={formData.gender}
            setForm={setFormData}
            formData={formData}
          />
          <ErrorContainer text={error.gender} />
          <label htmlFor="group">Группа клиентов</label>
          <Multiselect
            group={select}
            setForm={setFormData}
            formData={formData}
          />
          <ErrorContainer text={error.clientsGroup} />
          <label htmlFor="doctor">Лечащий врач</label>
          <Select
            options={select}
            type="doctor"
            value={formData.doctor}
            setForm={setFormData}
            formData={formData}
          />
          <ErrorContainer text={error.doctor} />
          <CheckBox formData={formData} setFormData={setFormData} />
          <button>Отправить</button>
        </form>
        {status.loader && <Loading />}
        {status.success && (
          <SuccessModel status={status} setStatus={setStatus} />
        )}
      </div>
    </>
  );
}

export default App;
