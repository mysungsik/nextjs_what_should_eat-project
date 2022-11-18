import styles from "./contact-form.module.css";
import Button from "../ui/card/button";
import { useState } from "react";

function ContactForm() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [content, setContent] = useState();

  async function submitHandler(e) {
    e.preventDefault();

    const contactData = {
      email,
      name,
      content,
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      setEmail("");
      setName("");
      setContent("");
    }
  }
  return (
    <div className={styles.maindiv}>
      <form className={styles.contactForm}>
        <h1> Contact Me!</h1>
        <div className={styles.infoDiv}>
          <div>
            <label htmlFor="email"> 이메일을 입력해주세요</label>
            <input
              type={"email"}
              id={"email"}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name"> 이름을 입력해주세요</label>
            <input
              type={"text"}
              id={"name"}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.contentDiv}>
          <label htmlFor="content">무엇을 도와드릴까요?</label>
          <textarea
            id="content"
            required
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <Button onClick={submitHandler}> 제출</Button>
      </form>
    </div>
  );
}

export default ContactForm;
