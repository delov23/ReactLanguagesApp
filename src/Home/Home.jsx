import React, { Component } from 'react';

class Home extends Component {
    render () {
        return (
            <main className="container-fluid landingPage">
                <div className="hero-text flash">
                    Hello!<br/>
                    <a className="clearTag" href="/register">
                        <span style={{fontSize: "20px"}}>
                            Start learning a new language today...
                        </span>
                    </a>
                </div>
            </main>
        )
    }
}

export default Home;