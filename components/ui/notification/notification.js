import styles from "./notification.module.css";

function Notification(props) {
  const { state, message } = props;

  let sendingStyle;
  let sendingmMessage;

  if (state === "pending" || state==="loading") {
    sendingStyle = styles.pending;
    sendingmMessage = message;
  }
  if (state === "error" || state==="unauthenticated") {
    sendingStyle = styles.error;
    sendingmMessage = message;
  }
  if (state === "success") {
    sendingStyle = styles.success;
    sendingmMessage = message;
  }

  return (
    <div className={styles.notification}>
      <div className={sendingStyle}>
        <p>{sendingmMessage} </p>
      </div>
    </div>
  );
}

export default Notification;
