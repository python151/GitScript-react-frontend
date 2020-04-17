import React from 'react';

let Input;
export default Input = props => (
    <div>
        <input placeholder={props.name.toUpperCase()}
            id={props.name}
            type={props.type} className="form-control"/>
    </div>
);