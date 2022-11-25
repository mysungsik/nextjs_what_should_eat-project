import ContactForm from "../components/contact-components/contact-form";
import Head from "next/head";

function ContactPage() {
  return (
    <div>
      <Head>
        <title> Contact </title>
        <meta
          name="description"
          content="contact me, if you inserted in this page "
        />
      </Head>
      <ContactForm />
    </div>
  );
}
export default ContactPage;
