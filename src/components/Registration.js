import React from 'react';
import { fieldsRegistration } from "./constant";
import { HashLink as Link } from 'react-router-hash-link';
import { setUserList,getUserList } from '../redux/actions/countAction';
import { connect } from 'react-redux';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
    this.state = {
      fields: { ...fieldsRegistration },
      errors: {}
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "Cannot be empty";
    } else if (typeof fields["firstname"] !== "undefined") {
      if (!fields["firstname"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstname"] = "Only letters";
      }
    }

    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "Cannot be empty";
    } else if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastname"] = "Only letters";
      }
    }

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Cannot be empty";
    } else {
      let checkUser = this.props.userCount.userList;

      if (checkUser) {
        let duplicateUser = checkUser.filter(user => { return user.username === fields["username"]; }).length;
        if (duplicateUser) {
          formIsValid = false;
          errors["username"] = "username already exist";
        }
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  submitForm(e) {
    e.preventDefault();

    if (this.handleValidation()) {

      let checkUser = this.props.userCount.userList;
      let fields = this.state.fields;
      if (!checkUser || checkUser === undefined) {
        checkUser = [];
        fields['role'] = "admin";
      } else {
        fields['role'] = "user";
      }
      this.setState({ fields: fieldsRegistration, errors: {} });
      fields['id'] = checkUser.length ? Math.max(...checkUser.map(user => user.id)) + 1 : 1;
      checkUser.push(fields);
      this.props.setUserList(checkUser);
      this.props.history.push('/login')
    }

  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
    this.handleValidation()
  }
  render() {
    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <h1 className="card-header">Sign up</h1>
          <div className="card-body">
            <form id="signup-form" name="userform" action="post" >
              <div className="form-group">
                <div className="form-label-group">
                  <label htmlFor="firstname">Firstname</label>
                  <input type="text" id="firstname" name="firstname" maxLength="30" className="form-control" placeholder="Enter firstname" onChange={this.handleChange.bind(this, "firstname")} value={this.state.fields["firstname"]} />
                  <span style={{ color: "red" }}>{this.state.errors["firstname"]}</span>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label htmlFor="lastname">Lastname</label>
                  <input type="text" id="lastname" name="lastname" maxLength="30" className="form-control" placeholder="Enter lastname" onChange={this.handleChange.bind(this, "lastname")} value={this.state.fields["lastname"]} />
                  <span style={{ color: "red" }}>{this.state.errors["lastname"]}</span>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" maxLength="20" className="form-control" placeholder="Enter username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]} />
                  <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" maxLength="10" className="form-control" placeholder="Password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} />
                  <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                </div>
              </div>
              <button className="btn btn-primary btn-block" onClick={this.submitForm.bind(this)}>Signup</button>
            </form>
            <Link to='/login'> for Login</Link>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => (state);
export default connect(mapStateToProps, { setUserList,getUserList })(Registration);
