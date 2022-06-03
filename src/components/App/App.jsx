import classes from "./App.module.scss";
import { FioSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useRef, useState } from "react";
import Multiselect from "../Multiselect/Multiselect";

function App() {
  const [value, setValue] = useState();

  const [clintsGroup, setClientsGroup] = useState([
    { value: "VIP", selected: false },
    { value: "Проблемные", selected: true },
    { value: "ОМС", selected: false },
    { value: "ДМС", selected: false },
  ]);

  console.log(value);
  // const muliselect=useRef();
  return (
    <div className={classes.App}>
      <p>Форма клиента</p>
      <form
        className={classes.clientForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="name">ФИО</label>
        <FioSuggestions
          // pattern="[А-Яа-яЁё] "
          token="3a9a40c4be9150b2207cd4bdcc2763aee31930c3"
          value={value}
          onChange={setValue}
          id="name"
        />
        <label htmlFor="age">Дата рождения</label>
        <input
          type="date"
          name="age"
          id="age"
          className="react-dadata__input"
          autoComplete="off"
        />
        <label htmlFor="Phone">Номер телефона</label>
        <input
          type="text"
          name="phone"
          id="phone"
          className="react-dadata__input"
          autoComplete="off"
          // placeholder="Введите текст для поиска"
        />
        {/* <input type = "text" name = "gender"  value={value && value.data.gender}/> */}
        <label htmlFor="gender">Пол</label>
        <select name="gender" id="gender" className={classes.select}>
          <option value="UNKNOWN">Выберете</option>
          <option value="MALE">Мужской</option>
          <option value="FEMALE">Женский</option>
        </select>

        <label htmlFor="group">Группа клиентов</label>

        {/* <select multiple size={1} ref={muliselect}  className={classes.multi} id="group" name="group">
          <option value="VIP">VIP</option>
          <option value="Проблемные">Проблемные</option>
          <option value="ОМС">ОМС</option>
          <option value="ДМС">ДМС</option>
        </select> */}

        <Multiselect group={clintsGroup} setActive={setClientsGroup} />

        <label htmlFor="doctor">Лечащий врач</label>
        <select name="doctor" id="doctor" className={classes.select}>
          <option value="Петров">Петров</option>
          <option value="Захаров">Захаров</option>
          <option value="Черниговская">Черниговская</option>
        </select>

        <div className={classes.box}>
          <label htmlFor="sms">Не отправлять СМС</label>
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
