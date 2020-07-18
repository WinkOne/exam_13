import React, {Component} from 'react';
import {registerUser} from "../../store/actions/actionsUsers";
import {connect} from "react-redux";
import AddUser from "../AddUser/AddUser";

class Register extends Component {

  state = {
    username: '',
    password: '',
    displayName:'',
    avatar:'',
    role:'user'
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(this.state).forEach(key=>{
      formData.append(key,this.state[key])
    });
    this.props.registerUser(formData);
  };
  fileChangeHandler = (e)=>{
    this.setState({[e.target.name]: e.target.files[0]})
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <AddUser
          getFieldError={this.getFieldError}
          fileChangeHandler={this.fileChangeHandler}
          submitFormHandler={this.submitFormHandler}
          inputChangeHandler={this.inputChangeHandler}
          state={this.state}
          formName={'Register'}

      />
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.registerError,
  loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);