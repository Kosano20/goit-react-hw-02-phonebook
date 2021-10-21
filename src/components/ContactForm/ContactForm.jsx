import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";
import InputField from "../InputField/InputField";
import inputAttr from "../InputField/InputAttr";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd({ ...this.state });
    this.reset();
  };
  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name } = this.state;
    const { number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <InputField
          {...inputAttr.name}
          value={name}
          onChange={this.handleChange}
        />
        <InputField
          {...inputAttr.number}
          value={number}
          onChange={this.handleChange}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  name: PropTypes.string,
  number: PropTypes.number,
};

export default ContactForm;
