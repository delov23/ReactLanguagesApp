import React, { Component } from 'react';

class Home extends Component {
    componentDidMount() {
        function animateCss(element, animationName, callback) {
            const node = document.querySelector(element);
            node.classList.add('animated', animationName);

            function handleAnimationEnd() {
                node.classList.remove('animated', animationName);
                node.removeEventListener('animationend', handleAnimationEnd);

                if (typeof callback === 'function') callback();
            }

            node.addEventListener('animationend', handleAnimationEnd);
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        this.interval = setInterval(() => {
            const languages = ['Hallo', 'Helo', 'Merhaba', 'Здравей', 'Hello', 'Nnọọ', 'Hola', 'Olà', 'Nǐ hǎo', 'Ciao', 'Здраво', 'Ahoj'];
            let randomInt = getRandomInt(12);
            let textNode = document.getElementById('greeting');
            if (textNode) {
                let previous = textNode.innerText;
                textNode.innerHTML = (languages[randomInt] + '!');
                if (previous.trim() !== languages[randomInt] + '!') animateCss('.hero-text', 'pulse');
            }
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        return (
            <main className="container-fluid landingPage">
                <div className="hero-text flash">
                    <span id="greeting">Hello!</span><br/>
                    <a className="clearTag" href="/register">
                        <span style={{fontSize: "30px"}}>
                            Start learning a new language today...
                        </span>
                    </a>
                </div>
                <script></script>
            </main>
        )
    }
}

export default Home;