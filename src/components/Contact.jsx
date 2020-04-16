import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  margin-bottom: 14px;
  border: none;
  border-radius: 5px;

  padding: 15px;
  line-height: 24px;
  font-size: 1em;

  color: ${props => props.color || "#000000"};
  background-color: ${props => props.backgroundcolor || "#ffffff"};
`;

const InputMulti = styled.textarea`
  width: 100%;
  max-width: 100%;
  margin-bottom: 14px;
  border: none;
  border-radius: 5px;

  padding: 15px;
  line-height: 24px;
  font-size: 1em;

  color: ${props => props.color || "#000000"};
  background-color: ${props => props.backgroundcolor || "#ffffff"};
`;

var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      a.nocache = Math.floor(1e6 * Math.random() + 1),
      a.Action = "Send";
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }
    )
  }, ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
    a.onload = function () {
      var e = a.responseText;
      null != t && t(e) },
    a.send(n)
  }, ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    t.onload = function () {
      var e = t.responseText;
      null != n && n(e)
    }, t.send()
  }, createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest;
    return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    //TODO
    console.log(this.state);

    let body = "From: " + this.state.name + " (" + this.state.mail + ")<br><br>Message:<br>" + this.state.message.split('\n').join("<br>");

    Email.send({
      SecureToken : "6c6ef1f0-7570-487c-b09b-091ecfdd3ceb ",
      To : 'hello@3pif.de',
      From : 'hello@3pif.de',
      Subject : "Message via contact form",
      Body : body
  }).then(this.setState({
    name: "",
    mail: "",
    message: ""
  })).then(alert("Thank you for your message."));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Name"
          aria-label="Name"
          value={this.state.name}
          onChange={this.handleChange}
          color={this.props.foreground}
          backgroundcolor={this.props.color}
        />
        <Input
          name="mail"
          type="email"
          placeholder="Mail"
          aria-label="Mail"
          value={this.state.mail}
          onChange={this.handleChange}
          color={this.props.foreground}
          backgroundcolor={this.props.color}
        />
        <InputMulti
          name="message"
          rows="5"
          placeholder="Message"
          aria-label="Message"
          value={this.state.message}
          onChange={this.handleChange}
          color={this.props.foreground}
          backgroundcolor={this.props.color}
        />
        <Input
          type="submit"
          aria-label="Send message"
          value="Send message"
          color={this.props.foreground}
          backgroundcolor={this.props.accent}
        />
      </form>
    );
  }
}

export default Contact;
