import React from "react";
import styled from "styled-components";

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 100%;
  margin-bottom: 14px;
  border: none;
  border-radius: 5px;

  line-height: 24px;
  font-size: 1em;
  padding: ${props => props.error && "13px" || "15px"};

  color: ${props => props.foreground || "#000000"};
  background: ${props => props.color || "#ffffff"};
  ${props => props.error && "border: 2px solid #d22"};

  box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.06);

  transition: opacity 0.3s ease;
`;

const InputButton = styled(Input)`
  cursor: pointer;
  opacity: 0.9;

  &:hover, &:active, &:focus {
    color: ${props => props.foreground || "#000000"};
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;

const InputMulti = styled.textarea`
  width: 100%;
  max-width: 100%;
  margin-bottom: 14px;
  border: none;
  border-radius: 5px;

  line-height: 24px;
  font-size: 1em;
  font-family: inherit;
  padding: ${props => props.error && "13px" || "15px"};

  color: ${props => props.foreground || "#000000"};
  background: ${props => props.color || "#ffffff"};
  ${props => props.error && "border: 2px solid #d22"};

  box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.06);
`;

const ErrorMessage = styled.p`
  visibility: ${props => props.error && "visible" || "hidden"};
  ${props => !props.error && "margin-bottom: 0px !important"};
  line-height: 0 !important;
  color: #d22;

  transition: 0.3s ease;
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
      fields: {
        name: {
          value: "",
          valid: undefined,
          error: ""
        },
        mail: {
          value: "",
          valid: undefined,
          error: ""
        },
        message: {
          value: "",
          valid: undefined,
          error: ""
        }
      },
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var state = this.state;
    state.fields[e.target.name].value = e.target.value;
    this.setState(state);
    this.validateForm(e.target.name);
  }

  validateForm(solo = undefined) {
    var state = this.state;
    let fields = solo ? fields = {[solo]: state.fields[solo]} : fields = state.fields;

    for (let field in fields) {
      if (field == "name") {
        fields[field].error = true;
        fields[field].valid = true;

        if (!fields[field].value) {
          fields[field].error = "A name is required"
          fields[field].valid = false
        }
      }

      if (field == "mail") {
        fields[field].error = true;
        fields[field].valid = true;

        if (!fields[field].value) {
          fields[field].error = "A mail is required"
          fields[field].valid = false;
        } else {
          let mailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          if (!mailRegex.test(fields[field].value)) {
            fields[field].error = "Mail is not vaild"
            fields[field].valid = false;
          }
        }
      }

      if (field == "message") {
        fields[field].error = true;
        fields[field].valid = true;

        if (!fields[field].value) {
          fields[field].error = "A message is required"
          fields[field].valid = false;
        }
      }

      state.formValid = state.fields.name.valid && state.fields.mail.valid && state.fields.message.valid ? true : false;
    }

    if (solo) {
      state.fields[solo] = fields[solo];
    }
    else {
      state.fields = fields;
    }

    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.validateForm();
    if (!this.state.formValid) {
      return;
    }

    let body = "From: " + this.state.fields.name.value + " (" + this.state.fields.mail.value + ")<br><br>Message:<br>" + this.state.fields.message.value.split('\n').join("<br>");

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
  })).then(alert(
    "Thank you for your message."
  )).then(
    this.setState({
      fields: {
        name: {
          value: "",
          valid: undefined,
          error: ""
        },
        mail: {
          value: "",
          valid: undefined,
          error: ""
        },
        message: {
          value: "",
          valid: undefined,
          error: ""
        }
      },
      formValid: false}));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Name"
          aria-label="Name"
          value={this.state.fields.name.value}
          onChange={this.handleChange}
          foreground={this.props.foreground}
          color={this.props.color}
          error={this.state.fields.name.error.length > 0}
          />
        <ErrorMessage error={this.state.fields.name.error.length > 0}>{this.state.fields.name.error}</ErrorMessage>
        <Input
          name="mail"
          type="email"
          placeholder="Mail"
          aria-label="Mail"
          value={this.state.fields.mail.value}
          onChange={this.handleChange}
          foreground={this.props.foreground}
          color={this.props.color}
          error={this.state.fields.mail.error.length > 0}
          />
        <ErrorMessage error={this.state.fields.mail.error.length > 0}>{this.state.fields.mail.error}</ErrorMessage>
        <InputMulti
          name="message"
          rows="5"
          placeholder="Message"
          aria-label="Message"
          value={this.state.fields.message.value}
          onChange={this.handleChange}
          foreground={this.props.foreground}
          color={this.props.color}
          error={this.state.fields.message.error.length > 0}
          />
        <ErrorMessage error={this.state.fields.message.error.length > 0}>{this.state.fields.message.error}</ErrorMessage>
        <InputButton
          type="submit"
          aria-label="Send message"
          value="Send message"
          foreground={this.props.foreground}
          color={this.props.accent}
        />
      </form>
    );
  }
}

export default Contact;
