import React from 'react';




let Navbar;
export default Navbar = props => {
    let loggedIn = localStorage.getItem("logged-in")
    let navItems = [
        "Login",
        "Signup"
    ]
    
    if (loggedIn === "true") {
        navItems = [
            "Dashboard",
            "Logout"
       ]
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/Home" style={{color:'#61dafb',}}>GitScript</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/Home">Home <span className="sr-only">(current)</span></a>
                    </li>
                    {navItems.map(item => (
                        <li className="nav-item">
                            <a className="nav-link" href={"/"+item}>{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
};