import React from "react";
import { Button, Box, TextField, Divider } from "@material-ui/core";
import Api from "../api";
import Header from "./header";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/userActions";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: "",
      password: "",
      userError: false,
      passwordError: false
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.authGoogle = this.authGoogle.bind(this);
  }

  componentDidMount() {
    const queryString = this.props.location.search;
    if (queryString) {
      const token = getQueryParam(queryString, "tk");
      const username = getQueryParam(queryString, "u");
      if (token) {
        this.props.setUser({username, token});
        this.props.history.push('/book');
      }
    }
  }

  onUserChange(event) {
    this.setState({ user: event.target.value });
    if (event.target.value === "") {
      this.setState({ userError: true });
    } else {
      this.setState({ userError: false });
    }
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
    if (event.target.value === "") {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  }

  async onSubmit() {
    if (this.state.user === "") {
      this.setState({ userError: true });
    }
    if (this.state.password === "") {
      this.setState({ passwordError: true });
    }
    if (this.state.user !== "" && this.state.password !== "") {
      const api = new Api();
      const res = await api.login({ user: this.state.user, password: this.state.password });
      if (res.status === 200 && res.data.token) {
        this.props.setUser({ username: this.state.user , token: res.data.token } );
        this.props.history.push('/book');
      }
    }
  }

  authGoogle() {
    window.location.href = process.env.REACT_APP_API_URL + "/auth/google";
  }

  render() {
    return (
      <div className="container">
        <Header history={this.props.history} />
        <div className="main-container">
          <Box p={2} className="loginBox">
            <h3>Login</h3>
            <Box m={2}>
              <TextField label="Username"
                value={this.state.user}
                onChange={this.onUserChange}
                error={this.state.userError}
                helperText={this.state.userError ? 'Please enter username.' : ' '}
              />
              <TextField
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.onPasswordChange}
                error={this.state.passwordError}
                helperText={this.state.passwordError ? 'Please enter password.' : ' '} />
              <div>
                <Button variant="contained" color="primary"
                  onClick={this.onSubmit}>Login</Button>
              </div>
            </Box>
            <Divider />
            <Box m={2}>
              <Button
                variant="outlined"
                color="primary"
                className="btn-social"
                onClick={this.authGoogle}>
                <div className="icon-gg"></div>Login with Google
                </Button>
            </Box>
          </Box>
        </div>
      </div>
    )
  }
}

function getQueryParam(search, name) {
  var q = search.match(new RegExp('[?&]' + name + '=([^&#]*)'));
  return q && q[1];
}

export default connect(
  null, { setUser }
)(Login);