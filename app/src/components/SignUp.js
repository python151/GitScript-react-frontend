import React from 'react';
import Input from './Input';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSignupResponse = (response) => {
        if (response.data.success === true) {
            localStorage.setItem("session-key", response.data.sessionKey)
            localStorage.setItem("logged-in", true)
            window.location = "/Dashboard"
        }
    }

    submitForm() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        fetch('https://scripterapi.pythonanywhere.com/signup/', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            })
        })
        .then(response => response.json())
        .then(response => this.handleSignupResponse(response))
    }

    render() {
        return (
            <div style={{margin: 2+'em', justifyContent: 'center'}}>
                <h1>SignUp</h1>

                <div className="form">
                    <Input name={"username"} type={"text"} />
                    <Input name={"password"} type={"password"} />
                    <Input name={"email"} type={"email"} />
                    <button onClick={() => this.submitForm()} className="submit-btn">Submit</button>
                </div>
            </div>
        );
    }
};

export default SignUp;