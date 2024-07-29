import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  }

  const validateForm = () => {
    const { firstName, lastName, email, phone, message } = formDetails;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/; // Adjust this regex according to your phone number format

    if (!firstName) {
      return { valid: false, message: "First Name is required." };
    }
    if (!lastName) {
      return { valid: false, message: "Last Name is required." };
    }
    if (!email || !emailRegex.test(email)) {
      return { valid: false, message: "A valid Email Address is required." };
    }
    if (!phone || !phoneRegex.test(phone)) {
      return { valid: false, message: "A valid Phone Number is required." };
    }
    if (!message) {
      return { valid: false, message: "Message is required." };
    }
    return { valid: true };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({}); // Reset status on every submit
    const validation = validateForm();
    if (!validation.valid) {
      setStatus({ success: false, message: validation.message });
      return;
    }
    setButtonText("Sending...");
    try {
      let response = await fetch("http://localhost:8080/api/v1/web/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      setButtonText("Send");

      if (response.ok) {
        let result = await response.json();
        setStatus({ success: true, message: result.message || 'Message sent successfully' });
      } else {
        let errorResult = await response.body();
        if (response.status === 409) { // Conflict
          console.log(errorResult.message);
          setStatus({ success: false, message: errorResult || 'Conflict occurred, please try again.' });
        } else { // Other errors
          setStatus({ success: false, message: errorResult || 'Something went wrong, please try again later.' });
        }
      }
    } catch (error) {
      setButtonText("Send");
      setStatus({ success: false, message: error.message || 'Conflict occurred, please try again.'  });
    }
    setFormDetails(formInitialDetails);
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                      {
                        status.message &&
                        <Col>
                          <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                        </Col>
                      }
                    </Row>
                  </form>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
