import classes from "./ErrorContainer.module.scss";

const ErrorContainer = ({ text }) => <h4 className={classes.error}>{text}</h4>;

export default ErrorContainer;
