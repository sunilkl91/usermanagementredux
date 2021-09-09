import React from 'react';
import { getSessionData } from '../redux/actions/userSessionAction';
import { connect } from 'react-redux';
import { getUserList } from '../redux/actions/countAction';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.props.getSessionData();
        this.props.getUserList();
      
    }
   
    logOut() {
        localStorage.removeItem('loginUser');
        this.props.history.push('/login')
    }
    render() {
        return (
            <div> {
                this.props.state.userSession?.userSession?.role == 'admin' ?
                    <div>
                        <nav className="navbar navbar-inverse">
                            <div className="container-fluid">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a className="cursorpointer" onClick={this.logOut.bind(this)}><span className="glyphicon glyphicon-log-in" ></span> Logout</a></li>
                                </ul>
                            </div>
                        </nav>
                        <div className="col-md-6 col-md-offset-3">
                            <h1>User List</h1>
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props?.state?.userCount?.userList.map(function (data) {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.firstname}</td>
                                                <td>{data.lastname}</td>
                                                <td>{data.role}</td>
                                            </tr>)
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div> : null
            }
                {
                    this.props.state.userSession?.userSession?.role == 'user' ?
                        <div>
                            <nav className="navbar navbar-inverse">
                                <div className="container-fluid">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><a className="cursorpointer" onClick={this.logOut.bind(this)}><span className="glyphicon glyphicon-log-in" ></span> Logout</a></li>
                                    </ul>
                                </div>
                            </nav>
                            <h1>Hi {this.props.state.userSession?.userSession?.firstname}!</h1>
                        </div>
                        : null
            }
            </div>
        )
    }

}
const mapStateToProps = (state) => {
return {
state
}
}
export default connect(mapStateToProps, { getSessionData,getUserList })(HomePage);