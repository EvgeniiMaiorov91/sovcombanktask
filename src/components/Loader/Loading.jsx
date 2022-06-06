import classes from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={classes.loader}>
      <div className={classes.lds_dual_ring}></div>
    </div>
  );
}
