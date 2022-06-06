import classes from "./CheckBox.module.scss";

const CheckBox = ({ formData, setFormData }) => {
  return (
    <div className={classes.box}>
      <label>Не отправлять СМС</label>
      <input
        id="sms"
        type="checkbox"
        className={classes.checkbox}
        checked={formData.sms}
        onChange={(e) => setFormData({ ...formData, sms: !formData.sms })}
      />
    </div>
  );
};

export default CheckBox;
