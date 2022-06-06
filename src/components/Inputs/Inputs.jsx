import { FioSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import InputMask from "react-input-mask";
const DadataInputName = ({formData, setFormData, error}) => {
  return (
    <>
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
    </>
  );
};

export default DadataInputName;
