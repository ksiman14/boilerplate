import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate, logout } from '../redux';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.me !== this.props.me) {
      this.setState({
        name: '',
        password: '',
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.auth(this.state.name, this.state.password, evt.target.id);
  }

  render() {
    return (
      <div>
        <form>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <label>Password: </label>
          <input
            type="text"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button id="login" type="submit" onClick={this.handleSubmit}>
            Log In
          </button>
          <button id="signup " type="submit" onClick={this.handleSubmit}>
            Sign Up
          </button>
        </form>
        {this.props.me.name ? (
          <div>
            <h6>Welcome, {this.props.me.name}!</h6>
            <button type="button" onClick={this.props.logout}>
              Log Out
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => ({
  me: state,
});

const mapDispatch = (dispatch) => ({
  auth: (name, pw, method) => dispatch(authenticate(name, pw, method)),
  logout: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(Main);
