import React from 'react';

let popScripts = [
    {
        name: "Algebra Calculator",
        id: 32,
        description: "its a cool algebra calculator that i made",
        lang: "Python",
        user: {
            name: "snoopdogg8181",
            id: 2,
        }
    },
    {
        name: "Compression script",
        id: 30,
        description: "its a simple huffman compression script that takes an input",
        lang: "C++",
        user: {
            name: "emily747",
            id: 3,
        }
    },
    {
        name: "Dictionary word scaper",
        id: 52,
        description: "Scrapes dictionary.com with a given url and returns json for the word and all its definitions",
        lang: "Javascript",
        user: {
            name: "python151",
            id: 1,
        }
    },
    {
        name: "Algebra Calculator",
        id: 32,
        description: "its a cool algebra calculator that i made",
        lang: "Python",
        user: {
            name: "snoopdogg8181",
            id: 2,
        }
    },
    {
        name: "Quick Sort",
        id: 30,
        description: "its a simple quick sort script that takes an input",
        lang: "Python",
        user: {
            name: "emily747",
            id: 3,
        }
    },
    {
        name: "Documentation scaper",
        id: 52,
        description: "Scrapes documentation with a given url and returns json for the components (methods and attributes)",
        lang: "Javascript",
        user: {
            name: "python151",
            id: 1,
        }
    },
    {
        name: "Algebra Calculator",
        id: 32,
        description: "its a cool algebra calculator that i made",
        lang: "Python",
        user: {
            name: "snoopdogg8181",
            id: 2,
        }
    },
    {
        name: "Compression script",
        id: 30,
        description: "its a simple huffman compression script that takes an input",
        lang: "C++",
        user: {
            name: "emily747",
            id: 3,
        }
    },
]

let Home;
export default Home = props => (
    <div>
            <h1 className="display-5" className={{
                margin: .5+'em'
            }}>Home</h1>
            
            <div className="popular-scripts">
                <div className="display-4">Popular Scipts</div>
                <div className="row text-center" style={{
                    margin: 1+'em'
                }}>
                    {popScripts.map((script) => (
                    <div className="col">
                        <div class="card" style={{width: 18+'em'}}>
                            <div class="card-body">
                                <h5 class="card-title">{script.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{script.lang}</h6>
                                <p class="card-text">{script.description}</p>
                                <a href={"/script/"+script.id} class="card-link">See script</a> 
                                <a href={"/user/"+script.user.id} class="card-link">{script.user.name}</a>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
    </div>
);
