import styles from "./button.module.css";

function Button(props) {
  const { onClick } = props;
  return (
    <button onClick={onClick} className={styles.button}>
      {props.children}
    </button>
  );
}

export default Button;
