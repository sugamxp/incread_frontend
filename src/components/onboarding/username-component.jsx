import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import { updateUserName } from "../../redux/actions/authActions";

class UserNameComponent extends Component {
  state = {
    name: "",
    api_url: process.env.REACT_APP_API_URL,
    token: this.props.cookies.get("token")
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = (e) => {
    this.props.updateUserName(
      this.state.api_url,
      this.state.token,
      this.state.name
    );
  };

  render() {
    if (this.props.username_update_success) {
      console.log(this.props.username_update_success);

      return <Redirect to="/stats" />;
    }
    return (
      <section>
        <div className="container-fluid">
          <div className="main-container">
            <p className="text-14-gray"></p>
            <p className="mt-40 main-title-content">
              what's your first <br />
              name?
            </p>
            <input
              autoComplete="off"
              onChange={this.onChange}
              name="name"
              type="text"
              placeholder="eg: John"
              className="mt-30 text-dark-gray"
            />
            <br />
            {this.state.name ? (
              <button
                onClick={this.onClick}
                className="btn-general btn-blue mt-60"
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  username_update_success: state.auth.username_update_success
});

export default connect(mapStateToProps, { updateUserName })(
  withCookies(UserNameComponent)
);
