import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        let url = window.location + "";
        url = url.split("/");
        let id = url[url.length-1];
        this.state = {
            userId: id,
            user: {
                username: "",
                scripts: [],
            },
        }
    }

    handleUserResponse = (response) => {
        if (response.data.success) {
            this.setState({
                user: response.data.user
            })
        } else {
            alert("Unknown Error. \n Reloading...")
            window.location = window.location + " "
        }
    }

    getUserInfo = () => {
        fetch("https://scripterapi.pythonanywhere.com/user/"+this.state.userId+"/")
        .then(response => response.json())
        .then(response => this.handleUserResponse(response))
        .catch(err => {
            alert("error:"+err)
        })
    }

    componentWillMount() {
        this.getUserInfo()
    }

    render() {
        return (
            <div>
                <h1 className="display-4">{this.state.user.username}</h1>

                <div className="row">
                    {this.state.user.scripts.map(script => (
                        <div class="col card" style={{width: 18+'em', margin: 2+'em', minWidth: 275+'px'}}>
                            <div class="card-body">
                                <h5 class="card-title">{script.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{script.lang}</h6>
                                <p class="card-text">{script.description}</p>
                                <a href={"/script/"+script.id} class="card-link">See script</a> 
                                <a onClick={() => alert("coming soon")} class="card-link">Make a copy</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
