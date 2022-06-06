import classes from "./SuccessModel.module.scss";

const SuccessModel = ({ status, setStatus }) => {
  return (
    <div className={classes.container}>
      <div className={classes.window}>
        <h2>Клиент успешно создан!</h2>
        <span onClick={() => setStatus({ ...status, success: false })}>
          &#10006;
        </span>
      </div>
    </div>
  );
};

export default SuccessModel;
