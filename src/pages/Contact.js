import "./contact.css";
import { FaPhoneAlt,FaEnvelope,FaMapMarkerAlt } from "react-icons/fa";
import contact from "./images/contact.jpg";
function Contact() {
  return (
    <>
    <div className="contact">

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Feel free to contact us anytime.</p>
      </section>

      <section className="contact-cards">
        <div className="contact-card">
         <FaPhoneAlt  className="contact-icon"/>
          <h3>Call Us</h3>
          <p>+91 9306593030 | 9306793030</p>
        </div>

        <div className="contact-card">
         <FaEnvelope  className="contact-icon"/>
          <h3>Email Us</h3>
          <p>support@veggiehub.com</p>
        </div>

        <div className="contact-card">
         <FaMapMarkerAlt  className="contact-icon"/>
          <h3>Location</h3>
          <p>Yamuna nagar,Haryana 135001</p>
        </div>
      </section>


      <section className="contact-box">
        <div className="contact-image">
          <img src={contact} alt="contactus"></img>
        </div>

        <div className="contact-form">
          <h2>Send Message</h2>
          <form>
            <input type="text" placeholder="Your Name*"/>
            <input type="email" placeholder="Email Address*" />
            <input type="tel" placeholder="Phone Number*"/>
            <textarea rows={5} placeholder="Write your message..."></textarea>
            <button>Send Message</button>
          </form>
        </div>
      </section>

      <section className="contact-map">
        <iframe title="Google Map" src="https://www.google.com/maps?q=Yamunanagar ,Haryana&output=embed" loading="lazy"></iframe>
      </section>
    </div>
    </>
  )
}

export default Contact;