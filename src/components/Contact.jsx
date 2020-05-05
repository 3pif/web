import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  appearance: none;

  color: ${props => props.foreground};
  background: ${props => props.color};
  margin-bottom: 14px;

  line-height: 24px;
  font-size: 1em;
  padding: 13px;

  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.error && "rgb(221, 34, 34)" || props.color};
  transition: border 0.3s ease;

  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const InputButton = styled(Input)`
  cursor: pointer;

  align-self: flex-start;
  margin-top: 24px;

  border-radius: 100em;
  border-color: ${props => props.foreground || "rgb(255, 255, 255)"};
  padding: 13px 50px;
  background: transparent;

  transition: border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

  ${props => props.disabled && `
    cursor: default;
    box-shadow: none;
    opacity: 0.5;
  `}

  &:not(:disabled):hover, &:not(:disabled):active, &:not(:disabled):focus {
    color: ${props => props.foreground};
    background: ${props => props.color || "rgb(0, 0, 0)"};
    border-color: ${props => props.color || "rgb(255, 255, 255)"};
  }

  @media (max-width: 650px) {
    align-self: center;
  }
`;

const InputMulti = styled.textarea`
  appearance: none;

  min-width: 100%;
  max-width: 100%;

  color: ${props => props.foreground};
  background: ${props => props.color};
  margin-bottom: 14px;

  line-height: 24px;
  font-size: 1em;
  padding: 13px;

  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.error && "rgb(221, 34, 34)" || props.color};
  transition: border 0.3s ease;

  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px !important;
`;

const LabelText = styled.p`
  margin: 0px !important;
  color: ${props => props.foreground};
`;

const ErrorMessage = styled.p`
  margin: 0px !important;
  opacity: ${props => props.error && "1" || "0"};
  color: rgb(221, 34, 34);
  transition: opacity 0.3s ease;
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
      <Form onSubmit={this.handleSubmit}>
        <Label>
          <LabelText>Name</LabelText>
          <ErrorMessage error={this.state.fields.name.error.length > 0}>{this.state.fields.name.error}</ErrorMessage>
        </Label>
        <Input
          name="name"
          type="text"
          placeholder="..."
          aria-label="Name"
          value={this.state.fields.name.value}
          onChange={this.handleChange}
          foreground={this.props.foreground}
          color={this.props.color}
          error={this.state.fields.name.error.length > 0}
          />
        <Label>
          <LabelText>Mail</LabelText>
          <ErrorMessage error={this.state.fields.mail.error.length > 0}>{this.state.fields.mail.error}</ErrorMessage>
        </Label>
        <Input
          name="mail"
          type="email"
          placeholder="@"
          aria-label="Mail"
          value={this.state.fields.mail.value}
          onChange={this.handleChange}
          foreground={this.props.foreground}
          color={this.props.color}
          error={this.state.fields.mail.error.length > 0}
          />
        <Label>
          <LabelText>Message</LabelText>
          <ErrorMessage error={this.state.fields.message.error.length > 0}>{this.state.fields.message.error}</ErrorMessage>
        </Label>
        <InputMulti
          name="message"
          rows="5"
          placeholder="..."
          aria-label="Message"
          value={this.state.fields.message.value}
          onChange={this.handleChange}
          foreground={this.props.foreground}
          color={this.props.color}
          error={this.state.fields.message.error.length > 0}
          />
        <InputButton
          type="submit"
          aria-label="Send message"
          value="Send message"
          foreground={this.props.foreground}
          color={this.props.accent}
          disabled={!this.state.formValid}
        />
      </Form>
    );
  }
}

export default Contact;
