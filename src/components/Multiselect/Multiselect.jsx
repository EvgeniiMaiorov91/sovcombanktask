import { useEffect, useRef, useState } from "react";
import classes from "./Multiselect.module.scss";

function Multiselect({ group, setActive }) {

  const [show, setShow] = useState(false);
  const activeItems = group.multi.filter(item=> item.selected);
 const ref = useRef();
 const refSelect = useRef();
 useEffect(()=>{
    
     const onClick = (e) =>
       ref.current.contains(e.target) ||
       refSelect.current.contains(e.target) ||
       setShow(false);
     document.addEventListener("click",onClick);
     return () => document.removeEventListener("click", onClick);
 },[])

 const changeGroupSelected = (id) => {
                let arr = [...group.multi];
                arr[id].selected = !arr[id].selected;
                let groupClone = {...group};
                groupClone.multi=arr;
                setActive(groupClone);
              }



  return (
    <div className={classes.multiselect}>
      <div
        className={classes.select} 
        ref={refSelect}
        onClick={() => setShow(!show)}
        tabindex="0"
      >
        {activeItems.length ? (
          activeItems.map((item, i) => (
            <div key={i}>
              {item.value}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  changeGroupSelected(item.id);
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
        {group.multi.map((item) => {
          return (
            <li
              key={item.id}
              className={`${classes.itemGroup} ${
                item.selected ? classes.active : ""
              }`}
              onClick={() => changeGroupSelected(item.id)}
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
