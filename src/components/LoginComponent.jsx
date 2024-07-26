import React, {useState} from 'react'
import {loginAPICall, saveLoggedInUser, storeToken} from "../services/AuthService";
import {useNavigate} from "react-router-dom";

const LoginComponent = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigater = useNavigate();
    async function handleLoginForm(e) {
        e.preventDefault();
       await loginAPICall(username, password).then(response => {
            console.log(response.data);
            console.log(response.data.accessToken);
           // const token = "Basic " + window.btoa(username + ":" + password);
           const token = "Bearer " + response.data.accessToken;
           const role = response.data.role;
            storeToken(token);
            saveLoggedInUser(username, role);
            navigater('/todos');
            window.location.reload();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="container">
            <br></br>
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center">Login</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">Username</label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">Password</label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-primary" onClick={(e) => handleLoginForm(e)}>Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginComponent
