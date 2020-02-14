/*
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from "react-redux";
import * as actions from "../../store/actions/loginActions";
import { API_STATUS }  from  "../../constants";
import { Form, Icon, Input, Button } from 'antd';
import './styles.scss';


export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', showForgotPassword: false };
  }

  componentDidMount() {
    const authToken = localStorage.getItem('accessToken');
    if(authToken) {
      this.props.history.push('/dashboard')
      const role = localStorage.getItem('user_type');
    }

  }

  componentDidUpdate() {
    if (this.props.authStatus === actions.LOGIN_STATUS.success) {
      const authToken = localStorage.getItem('accessToken');
      const role = localStorage.getItem('user_type');
      if(authToken) {
        window.location.reload();
      }
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginHandler({
          email: this.state.email,
          password: this.state.password
        })
      }
    });
  };


  loginFormChange =(e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { email, password } = this.state
    return (
      <div className="login-container">
        <div className="login-form">
           <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Email ID" colon={false}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input
                    prefix={<Icon type="user" />}
                    placeholder="Email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={this.loginFormChange}
                  />,
                )}
              </Form.Item>
              <Form.Item label="Password" colon={false}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={this.loginFormChange}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" loading={this.props.authStatus === API_STATUS.initiated} htmlType="submit" className="login-form-button login-btn">
                  Log in
                </Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginHandler: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.userDetails.authStatus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginHandler: values => dispatch(actions.loginHandler(values)),
    dispatch
  };
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
