import { useEffect, useRef, useState } from "react";
import classes from "./Select.module.scss";

function Select({ options, type, setSelect }) {
  const [show, setShow] = useState(false);
  const activeOption = options[type].filter((option) => option.selected);
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

  const changeSelected = (id) => {
    let arr = [...options[type]];

    if (!arr[id].selected) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].selected = arr[i].id === id;
      }

      setSelect({ ...options, [type]: arr });
    }

    setShow(false);
  };

  return (
    <div className={classes.selectBox}>
      <div
        className={classes.select}
        ref={refSelect}
        onClick={() => setShow(!show)}
      >
        {activeOption.length ? <p>{activeOption[0].value}</p> : <p>Выберете</p>}
      </div>
      <ul
        ref={ref}
        style={show ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }}
      >
        {options[type].map((item) => {
          return (
            <li
              key={item.id}
              className={classes.itemGroup}
              onClick={() => changeSelected(item.id)}
            >
              {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Select;
