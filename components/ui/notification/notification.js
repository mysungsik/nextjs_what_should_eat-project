import styles from "./notification.module.css";

function Notification(props) {
  return (
    <div className={styles.notification}>
      <div>
        <p> 전송중 </p>
      </div>
    </div>
  );
}

export default Notification;
