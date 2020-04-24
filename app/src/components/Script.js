import React from 'react';
import Input from './Input';

let script = {
    id: 32,
    name: "Calculator",
    description: "this is a cool algebra calculator app. Scrapes dictionary.com with a given url and returns json for the word and all its definitions. Scrapes documentation with a given url and returns json for the components (methods and attributes).",
    user: {
        name: "python151",
    }
}

export default class Script extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleApiResponse = (response) => {
        if (response.data.success) {
            this.setState({
                script: response.data.script,
            })
        }
    }

    getScriptFromApi = () => {
        let session = localStorage.getItem("session-key")
        fetch('https://scripterapi.pythonanywhere.com/get/script/')
        .then(response => response.json())
        .then(response => this.handleApiResponse(response))
    }

    componentWillMount() {
        this.getScriptFromApi()
    }

    render = () => (
        <div className="script-page">
            <div className="container-fluid script-head text-center">
                <span className="display-4">{script.name}</span>
                <div className="container lead">
                    {script.description}
                </div>
            </div>

            <div className="container">
            <a href={"/editor/"+script.id}><button className="btn btn-secondary">Edit</button></a>
            </div>


            
        </div>

    );
}