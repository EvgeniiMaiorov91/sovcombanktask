import { useEffect, useRef, useState } from "react";
import classes from "./Multiselect.module.scss";

function Multiselect({ group, setActive }) {
  const [show, setShow] = useState(false);
  const activeItems = group.filter(item=> item.selected);
//  const ref = useRef();
//  useEffect(()=>{
//      console.log("fack")
//      const onClick = e => ref.current.contains(e.target)||setShow(false);
//      document.addEventListener("click",onClick);
//      return () => document.removeEventListener("click", onClick);
//  },[])
  return (
    <div className={classes.multiselect}>
      <div className={classes.select} onClick={() => setShow(!show)}>
        {activeItems.length ? (
          activeItems.map((item) => (
            <div>
              {item.value}
              <span>&#10006;</span>
            </div>
          ))
        ) : (
          <p>Выберете</p>
        )}
      </div>
      <ul
    //    ref={ref} 
       style={show ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }}>
        {group.map((item, index) => {
          return (
            <li
              key={index}
              className={`${classes.itemGroup} ${
                item.selected ? classes.active : ""
              }`}
              onClick={() => {
                let arr = [...group];
                arr[index].selected = !item.selected;
                setActive(arr);
              }}
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
