import React from "react";

const ContactMe = () => {
  return (
    <div className="contact-me">
      <h1>Contact Me</h1>
      <h3>If you have any questions, feel free to reach out!</h3>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Message:
          <input name="message"></input>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactMe;