import React from 'react';
import { fieldsLogin } from "./constant";
import { HashLink as Link } from 'react-router-hash-link';
import { setSessionData } from '../redux/actions/userSessionAction';
import { connect } from 'react-redux';
import { getUserList } from '../redux/actions/countAction';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.getUserList();
        this.state = {
            fields: { ...fieldsLogin },
            errors: {}
        }
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
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

            let users = this.props.userCount.userList || [];
            let fields = this.state.fields;
            let filteredUsers = users.filter(user => {
                return user.username === fields["username"] && user.password === fields["password"];
            });
            if (filteredUsers.length) {
                let user = filteredUsers[0];
                let responseJson = {
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role
                };
                this.props.setSessionData(JSON.stringify(responseJson));
                this.setState({ fields: fieldsLogin, errors: {} });
                this.props.history.push('/home')
            } else {
                let errors = {};
                errors["incorrect"] = "Username or password is incorrect";
                this.setState({ errors: errors });
            }

        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    render() {
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <h1 className="card-header">Login</h1>
                    <div className="card-body">
                        <span style={{ color: "red" }}>{this.state.errors["incorrect"]}</span>
                        <form id="signup-form" name="userform" action="post" >
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
                            <button className="btn btn-primary btn-block" onClick={this.submitForm.bind(this)}>Login</button>
                            <Link to='/register'> for Registration</Link>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => (state);
export default connect(mapStateToProps, { setSessionData,getUserList })(Login);