import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <div className={classes.button}>
      <button>{props.text}</button>
    </div>
  );
};

export default Button;
