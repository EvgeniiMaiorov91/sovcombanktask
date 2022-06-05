import classes from "./App.module.scss";
import { FioSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useRef, useState } from "react";
import Multiselect from "../Multiselect/Multiselect";
import submitHandler from "../../utils/submitHandler";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import Select from "../Select/Select";
import InputMask from "react-input-mask";
import Loading from "../Loader/Loading";
import SuccessModel from "../SuccessModel/SuccessModel";

function App() {
  // const [value, setValue] = useState({});
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
  return (<>
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
            status,
            setFormData,
            formRef.current
          );
        }}
      >
        <label htmlFor="fullName">ФИО</label>
        <FioSuggestions
          selectOnBlur
          inputProps={{
            placeholder: "Введите ФИО",
            name: "fullName",
          }}
          token="3a9a40c4be9150b2207cd4bdcc2763aee31930c3"
          value={formData.fullName}
          onChange={(res) => {
            if (!res.data) return "";
            const { name, surname, patronymic, gender } = res.data;
            setFormData({
              ...formData,
              gender,
              fullName: { name, surname, patronymic },
            });
          }}
          id="fullName"
          type="text"
        />
        <ErrorContainer text={error.fullName} />
        <label htmlFor="dateOfBirth">Дата рождения</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          className="react-dadata__input "
          autoComplete="off"
          value={formData.dateOfBirth}
          onChange={(e) =>
            setFormData({ ...formData, dateOfBirth: e.target.value })
          }
        />
        <ErrorContainer text={error.dateOfBirth} />

        <label htmlFor="phone">Номер телефона</label>

        <InputMask
          className="react-dadata__input"
          mask="+7(999)999-99-99"
          maskChar="_"
          name="phone"
          placeholder="+7(___)___-__-__"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <ErrorContainer text={error.phone} />
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
        <Multiselect group={select} setForm={setFormData} formData={formData} />
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

        <div className={classes.box}>
          <label>Не отправлять СМС</label>
          <input
            id="sms"
            type="checkbox"
            className={classes.checkbox}
            checked={formData.sms}
            onChange={(e) => setFormData({ ...formData, sms: !formData.sms })}
          />
        </div>
        <button>Отправить</button>
      </form>

      {status.loader && <Loading />}
      
    </div>
    {status.success && <SuccessModel status={status} setStatus={setStatus}/>}</>
  );
}

export default App;
