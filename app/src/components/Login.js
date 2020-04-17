import React from 'react';
import {Redirect} from 'react-router-dom';

import Input from './Input';

// from django documentation
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    submitForm() {
        // just some code I had lying around and decided to use
        let params = `?username=${document.getElementById('username').value}&password=${document.getElementById('password').value}`;

        fetch('https://scripterapi.pythonanywhere.com/login/'+params, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': 'https://scripterapi.pythonanywhere.com'
            }
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.data.success === true) {
                // setting user session in localStorage and redirecting to dashboard
                localStorage.setItem("session-key", response.data.sessionKey);
                localStorage.setItem("logged-in", true);
                window.location = "/Dashboard"
            }
            else {
                alert("failure");
            }
        }).catch((err) => {
            alert("error: "+err);
        });
    }

    render() {
        return (
            <div style={{margin: 2+'em', justifyContent: 'center'}}>
                <h1>Login</h1>

                <div className="form">
                    <Input name={"username"} type={"text"} />
                    <Input name={"password"} type={"password"} />
                    <button onClick={() => this.submitForm()} className="submit-btn" >Submit</button>
                </div>
            </div>
        );
    }
};

export default Login;