import React from "react";

const ContactMe = () => {
  return (
    <div>
      <h1>Contact Me</h1>
      <p>If you have any questions, feel free to reach out!</p>
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
          <textarea name="message"></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactMe;