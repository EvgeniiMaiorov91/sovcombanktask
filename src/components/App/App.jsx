import classes from "./App.module.scss";
import { FioSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useRef, useState, version } from "react";
import Multiselect from "../Multiselect/Multiselect";
import pro from "../../function/function";
import ErrorContainer from "../ErrorContainer/ErrorContainer";
import Select from "../Select/Select";
import InputMask from "react-input-mask";

function App() {
  const [value, setValue] = useState("");

  const [select, setSelect] = useState({
    multi:[
    { value: "VIP", selected: false, id: 0 },
    { value: "Проблемные", selected: false, id: 1 },
    { value: "ОМС", selected: false, id: 2 },
    { value: "ДМС", selected: false, id: 3 },
  ],
  gender:[
    {value:"Мужской",selected:false, id:0},
    {value:"Женский",selected:false, id:1},
  ],
  doctor:[
    {value:"Петров", selected:false, id:0},
    {value:"Захаров", selected:false, id:1},
    {value:"Черниговская", selected:false, id:2},
  ]});
  const [error, setError] = useState({
    fullName: false,
    dateOfBirth: false,
    phone: false,
    gender: false,
    clientsGroup: false,
    doctor: false,
  });
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    gender: "false",
    clientsGroup:[],
    doctor: "",
    sms:false
  });
  

  return (
    <div className={classes.App}>
      <p>Форма клиента</p>
      <form
        className={classes.clientForm}
        onSubmit={(e) => {
          e.preventDefault();

          console.log(e.target.name.value);
          let str = value.value.trim();
          console.log(str);
          // pro(str, setValue);

          // function func(str) {
          //    let tmp = /^[А-Яа-яЁё\s]+$/i.test(str);
          //    return tmp
          // }
          // console.log(func(value.value.trim()));

          // if(!tmp.test(value.value.trim())){
          //   alert("dsdsadasdsa")
          // }
          // console.log(value.value.trim())
          // pattern = "^[А-Яа-яЁёs]+$";
        }}
      >
        <label htmlFor="fullName">ФИО</label>
        <FioSuggestions
          selectOnBlur
          inputProps={{
            placeholder: "Введите ФИО",
            name: "fullName",
            // pattern: /^[А-Яа-яЁё\s]+$/i,
            // required: true,
            // title: "ns lehfr",
          }}
          token="3a9a40c4be9150b2207cd4bdcc2763aee31930c3"
          value={value}
          onChange={setValue}
          id="fullName"
          type="text"
        />
        <ErrorContainer text={error.fullName} />
        <label htmlFor="dateOfBirth">Дата рождения</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          className="react-dadata__input"
          autoComplete="off"
        />
        {/* <InputMask
          className="react-dadata__input"
          mask="99/99/9999"
          maskChar="_"
          // name="date"
          placeholder="__.__.____"
          value={formData.dateOfBirth}
          onChange={(e) =>
            setFormData({ ...formData, dateOfBirth: e.target.value })
          }
          required
        /> */}
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
          required
        />

        <ErrorContainer text={error.phone} />
        {/* <input type = "text" name = "gender"  value={value && value.data.gender}/> */}
        <label htmlFor="gender">Пол</label>

        <Select options={select} type="gender" setSelect={setSelect} />
        <ErrorContainer text={error.gender} />

        <label htmlFor="group">Группа клиентов</label>

        <Multiselect group={select} setActive={setSelect} />
        <ErrorContainer text={error.clientsGroup} />
        <label htmlFor="doctor">Лечащий врач</label>
        <Select options={select} type="doctor" setSelect={setSelect} />
        <ErrorContainer text={error.doctor} />

        <div className={classes.box}>
          <label>Не отправлять СМС</label>
          <input
            id="sms"
            type="checkbox"
            className={classes.checkbox}
            // checked={p.isDone}
            // onChange={(e) => checkedBox(e.target.checked, index)}
          />
        </div>
        <button>Отправить</button>
      </form>
    </div>
  );
}

export default App;
