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
    this.state = { username: '', password: '', showForgotPassword: false };
  }

  componentDidMount() {
    const authToken = localStorage.getItem('access-token');
    if(authToken) {
      const role = localStorage.getItem('user_type');
      // if (role === 'OM_VENDOR_ADMIN') {
      //   this.props.history.push(push('/eventsLive'));
      // } else {
      //   this.props.history.push('/overview')
      // }
    }

  }

  componentDidUpdate() {
    if (this.props.authStatus === actions.LOGIN_STATUS.success) {
      const authToken = localStorage.getItem('access-token');
      const role = localStorage.getItem('user_type');
      if(authToken) {
        // if (role === 'OM_VENDOR_ADMIN') {
        //   this.props.history.push(push('/eventsLive'));
        // } else {
        //   //this.props.history.push('/overview');
        //   window.location.reload();
        //}
      }
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginHandler({
          username: this.state.username,
          password: this.state.password
        })
      }
    });
  };

  submitForgotPassword = (e)=> {
    e.preventDefault();
    if (this.props.authStatus !== actions.LOGIN_STATUS.initiated) {
      this.toggleForgotPassword();
    }
  }

  loginFormChange =(e) =>{
    this.setState({ [e.target.name]: e.target.value });
  }
  toggleForgotPassword =() => {
    const { showForgotPassword } = this.state;
    this.setState({ showForgotPassword: !showForgotPassword });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { username, password } = this.state
    return (
      <div styleName="login-container">
        <div styleName="login-form" className="login-form">
           <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item label="User Name" colon={false}>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" />}
                    placeholder="Username"
                    value={username}
                    name="username"
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
                <Button type="primary" loading={this.props.authStatus === API_STATUS.initiated} htmlType="submit" className="login-form-button" styleName="login-btn">
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
