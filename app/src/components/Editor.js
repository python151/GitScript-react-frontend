import React from 'react';
import {useParams} from 'react-router-dom';

const ListFile = props => (
    <li onClick={() => {props.changeCurr(props.file.index)}} onDoubleClick={() => props.change(props.file.index)}>
        <span>{props.file.name}</span>
        <div className="icon" onClick={() => props.del(props.file.index)} >
            <svg class="bi bi-x-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
            </svg>
        </div>
    </li>
);

const SideBar = props => (
    <div className="side-bar">
        <ul>
            {props.files.map(file => (
                <ListFile file={file} changeCurr={this.changeCurr} />
            ))}
        </ul>
    </div>
);

class Editor extends React.Component {
    constructor(props) {
        super(props);
        let url = window.location + "";
        url = url.split("/");
        let id = url[url.length-1];
        this.state = {
            currentFile: {
                name: "None",
                value: "Files for this script have not been found. Please create one now.",
                index: 0,
            },
            files: [
                {
                    name: "None",
                    value: "Files for this script have not been found. Please create one now.",
                    index: 0,
                }
            ],
            scriptId: id,
            scriptName: null,
        }
    }

    changeCurr = index => {
        let file = this.state.files[index];
        this.setState({
            currentFile: file,
        });
        document.getElementById('textarea').value = file.value;
    }

    saveCurr = () => {
        let currVal = document.getElementById('textarea').value;
        let newFiles = [...this.state.files];
        newFiles[this.state.currentFile.index].value = currVal;
        this.setState({
            files: newFiles
        });
    }

    sendFileToApi(name, fileVal) {
        name = name.replace(".", "00000");
        let sess = localStorage.getItem("session-key");
        fetch('https://scripterapi.pythonanywhere.com/save/'+this.state.scriptId+"/"+name+"/?session-key="+sess, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: fileVal
            })
        })
        .then(response => response.json())
        .then((response) => {
            if (response.data.success === true) {
                if (response.data.saved === true) {
                    
                }
                else {
                    alert('now im just f***ing confused the response says successful and not saved')
                }
            } else {
                alert('unknown error')
            }

        }).catch((err) => {
            alert("error: "+err);
        });
    }

    saveScript = () => {
        let files = this.state.files;
        
        files.map(file => {
            let name = file.name;
            let fileVal = file.value;

            this.sendFileToApi(name, fileVal);
        });
    }

    getFile = () => {
        let sess = localStorage.getItem("session-key");
        fetch('https://scripterapi.pythonanywhere.com/get/'+this.state.scriptId+"?session-key="+sess)
        .then(response => response.json())
        .then(response => {
            if (response.data.success) {
                let f = response.data.files;
                for(let i=0; i<f.length; i++) {
                    f[i].index = i;
                }
                this.setState({
                    files: response.data.files,
                    scriptName: response.data.name,
                })
            } else {
                alert("unknown error")
            }
            this.changeCurr(0);
        }).catch(err => {
            alert("error:"+err)
        })
    }

    componentDidMount() {
        this.getFile();
    }

    popup() {
        let chars = "/|{}[]+=".split("")
        chars.push("00000")

        let name = prompt("Enter the name of the file: ")

        chars.map(char => {
            if (char in name.split("")) {
                alert("May not include "+char)
                return
            }
        })

        this.sendFileToApi(name, "")
        this.setState({
            files: [...this.state.files, {
                name: name,
                value: "",
                index: this.state.files.length,
            }]
        })
    }

    del = index => {
        if (this.state.files.length > 1) {
            const current = this.state.files[index];
            let name = current.name;
            name = name.replace(".", "00000");
            let sess = localStorage.getItem("session-key");
            fetch('https://scripterapi.pythonanywhere.com/delete/'+this.state.scriptId+"/"+name+"/?session-key="+sess, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then((response) => {
                if (response.data.success === true) {
                    if (response.data.deleted === true) {
                        const retFiles = [];
                        this.state.files.map(file => {
                            if (file.index !== index) retFiles.push(file)
                        })
                        this.setState({
                            files: retFiles
                        })
                        if (this.state.currentFile.index === index) {
                            this.setState({
                                currentFile: this.state.files[0]
                            })
                        }
                    }
                    else {
                        alert('now im just f***ing confused the response says successful and not saved')
                    }
                } else {
                    alert('unknown error')
                }

            }).catch((err) => {
                alert("error: "+err);
            });
        }
        else {
            alert("Cannot remove all files in a script try making another file before continuing")
        }

    }

    change = index => {
            const file = this.state.files[index];
            
            let name = file.name;
            let newName = prompt("New Name: ")
            if (newName === '' || newName === ' ' || newName === null) {
                return
            }

            let sess = localStorage.getItem("session-key");
            fetch('https://scripterapi.pythonanywhere.com/change/filename/?session-key='+sess, {
                method: "PUT",
                body:JSON.stringify({
                    scriptId: this.state.scriptId,
                    oldName: name,
                    newName: newName,
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.data.success === true) {
                    let nFiles = [];
                    this.state.files.map(file => {
                        if(file.index === index) {
                            file.name = newName
                        }
                        nFiles.push(file)
                    })
                    this.setState({
                        files: nFiles
                    })
                }
            })
            .catch(err => {
                alert("error:"+err);
            })

    }

    handleRunResponse = (response) => {
        if (response.data.success) {
            alert("Success! \n"+response.data.output)
        }
        else {
            alert("Fail \n"+response.data.output)
        }
    }

    runScript = () => {
        this.saveScript();
        
        let sess = localStorage.getItem("session-key");
        fetch("https://scripterapi.pythonanywhere.com/run/"+this.state.scriptId+"/?session-key="+sess)
        .then(response => response.json())
        .then(response =>  this.handleRunResponse(response))
    }

    render() {
        return (
            <div className="editor">                                         
                    <h1 className="display-4" style={{margin: .5+"em"}}>
                        {this.state.scriptName}
                    </h1>
                    <div className="side-bar">
                        <ul>
                            <li>
                                <ul>
                                    <li onClick={() => this.popup()}>
                                        <span>+</span>
                                    </li>
                                </ul>
                            </li>
                            {this.state.files.map(file => (
                                <ListFile file={file} changeCurr={this.changeCurr} del={this.del} change={this.change} />
                            ))}
                        </ul>
                    </div>

                <div id="currentFile">

                    <div class="currentFileHeader">
                        <span className="currentFileName">{this.state.currentFile.name}</span>
                        <button className="btn btn-secondary" onClick={() => {this.saveScript()}}>Save</button>
                        <button className="btn btn-secondary" onClick={() => {this.runScript()}} >Run</button>
                    </div>
                    <div>
                        <textarea autoComplete="off"
                            spellCheck="false"
                            wrap="logical"
                            type="code" 
                            placeholder="code goes here..." 
                            className="tabSupport"
                            id="textarea"
                            onChange={() => this.saveCurr()}
                            >{this.state.currentFile.value}</textarea>
                    </div>
                </div>

            </div>
        )
    };
    
}

export default Editor;