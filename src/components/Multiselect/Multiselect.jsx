import { useEffect, useRef, useState } from "react";
import classes from "./Multiselect.module.scss";

function Multiselect({ group, setForm, formData }) {
  const [show, setShow] = useState(false);
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

  const changeGroupSelected = (value) => {
    let arr = [...formData.clientsGroup];
    let index = arr.findIndex((i) => i === value);
    if (index < 0) {
      arr.push(value);
    } else {
      arr.splice(index, 1);
    }

    setForm({ ...formData, clientsGroup: arr });
  };

  return (
    <div className={classes.multiselect}>
      <div
        className={classes.select}
        ref={refSelect}
        onClick={() => setShow(!show)}
        tabIndex="0"
      >
        {formData.clientsGroup.length ? (
          formData.clientsGroup.map((item, i) => (
            <div key={i}>
              {item}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  changeGroupSelected(item);
                }}
              >
                &#10006;
              </span>
            </div>
          ))
        ) : (
          <p>Выберете группу</p>
        )}
      </div>
      <ul
        ref={ref}
        style={show ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }}
      >
        {group.multi.map((item, i) => {
          const isActive =
            formData.clientsGroup.findIndex((i) => i === item.value) !== -1;

          return (
            <li
              key={i}
              className={`${isActive ? classes.active : ""}`}
              onClick={() => changeGroupSelected(item.value)}
            >
              {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Multiselect;
