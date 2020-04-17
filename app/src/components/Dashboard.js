import React from 'react';



export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scripts: [],
        }
    }

    getScripts = () => {
        let sess = localStorage.getItem("session-key");
        fetch('http://localhost:8000/get/scripts/?session-key='+sess)
        .then(response => response.json())
        .then(response => {
            this.setState({
                scripts: response.data
            })
        })
        .catch((err) => {
            alert("error:"+err);
        })
    }

    componentWillMount() {
        this.getScripts();
    }

    handleCreateResponse = (response) => {
        window.location = "/Dashboard"
    }

    createScript = (name, description) => {
        let sess = localStorage.getItem("session-key");
        fetch("http://localhost:8000/create/?session-key="+sess, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
            })
        })
        .then(response => this.handleCreateResponse(response))
    }

    popup = () => {
        let name = prompt("name")
        let description = prompt("description")
        if (name !== null && description !== null){
            this.createScript(name, description)
        } 
    }

    handleDeleteResponse = (response) => {
        window.location = "/Dashboard"
    }

    deleteScript = (id) => {
        let sess = localStorage.getItem("session-key");
        fetch("http://localhost:8000/delete/script/"+id+"/?session-key="+sess, {
            method: "DELETE",
        })
        .then(response => this.handleDeleteResponse(response))
    }

    areYouSure = (id) => {
        let sure = window.confirm("Are you sure?")
        if (sure) {
            this.deleteScript(id)
        }
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>

                <div className="row">
                    {this.state.scripts.map(script => (
                        <div class="col card" style={{width: 18+'em', margin: 2+'em', minWidth: 275+'px'}}>
                            <div class="card-body">
                                <button type="button" class="close" onClick={() => this.areYouSure(script.id)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="card-title">{script.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{script.lang}</h6>
                                <p class="card-text">{script.description}</p>
                                <a href={"/script/"+script.id} class="card-link">See script</a> 
                                <a href={"/editor/"+script.id} class="card-link">Edit script</a>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={this.popup} className="btn btn-primary" style={{
                    margin: 2+"em"
                }}>
                        New
                </button>
                

            </div>
        )
    }
}

