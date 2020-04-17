import React from 'react';
import Input from './Input';

let script = {
    id: 32,
    name: "Calculator",
    description: "this is a cool algebra calculator app. Scrapes dictionary.com with a given url and returns json for the word and all its definitions. Scrapes documentation with a given url and returns json for the components (methods and attributes).",
    user: {
        name: "python151",
    },
    inputs: [
        {
            name: "equation"
        }
    ]
}

function runApiCall() {
    let inputs = script.inputs;
    let inputVals = [];
    inputs.map((input) => {
        inputVals.push(document.getElementById(input.name));
    })
    alert(inputVals);
}

let Script;
export default Script = props => (
    <div className="script-page">
        <div className="container-fluid script-head text-center">
            <span className="display-4">{script.name}</span>
            <div className="container lead">
                 {script.description}
            </div>
        </div>

        <div className="container">
           {script.inputs.map((input) => (
               <Input placeholder={input.name} name={input.name} type={String("text")} />
           ))}

           <button onclick={runApiCall()} className="btn btn-secondary">Run</button>
           <a href={"/editor/"+script.id}><button className="btn btn-secondary">Edit</button></a>
        </div>


        
    </div>

);