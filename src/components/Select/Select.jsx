import { useEffect, useRef, useState } from "react";
import classes from "../Multiselect/Multiselect.module.scss";

function Select({ options, type, value, setForm, formData }) {
  const [show, setShow] = useState(false);
  const activeOption = options[type].filter((option) => option.value === value);
  const ref = useRef();
  const refSelect = useRef();
  useEffect(() => {
    const onClick = (e) =>
      ref.current.contains(e.target) ||
      refSelect.current.contains(e.target) ||
      setShow(false);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const translate = {
    MALE: "Мужской",
    FEMALE: "Женский",
  };

  const changeHandler = (value) => {
    setForm({ ...formData, [type]: value });
    setShow(false);
  };

  return (
    <div className={classes.selectBox}>
      <div
        className={classes.select}
        ref={refSelect}
        onClick={() => setShow(!show)}
        tabIndex="0"
      >
        {activeOption.length ? (
          <p>
            {type === "gender"
              ? translate[activeOption[0].value]
              : activeOption[0].value}
          </p>
        ) : (
          <p>Выберете</p>
        )}
      </div>
      <ul
        ref={ref}
        style={show ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }}
      >
        {options[type].map((item, i) => {
          return (
            <li
              key={i}
              className={classes.itemGroup}
              onClick={() => changeHandler(item.value)}
            >
              {type === "gender" ? translate[item.value] : item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Select;
