import React from 'react'

export default function(props) {
    let display = 'none'
    if (props.loading) {
        display = 'block'
    }
    return (
        <div>
            <div class="spinner-border m-5" role="status" style={{display: display}}>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}