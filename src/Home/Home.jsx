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

        setInterval(() => {
            const languages = ['Hallo', 'Helo', 'Merhaba', 'Здравей', 'Hello', 'Nnọọ', 'Hola', 'Olà', 'Nǐ hǎo', 'Ciao', 'Здраво'];
            let randomInt = getRandomInt(11);
            let textNode = document.getElementById('greeting');
            let previous = textNode.innerText;
            textNode.innerHTML = (languages[randomInt] + '!');
            if (previous.trim() !== languages[randomInt] + '!') animateCss('.hero-text', 'pulse');
        }, 3000);
    }

    render () {
        return (
            <main className="container-fluid landingPage">
                <div className="hero-text flash">
                    <span id="greeting">Hello!</span><br/>
                    <a className="clearTag" href="/register">
                        <span style={{fontSize: "20px"}}>
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