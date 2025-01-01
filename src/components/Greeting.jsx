import React from "react"

function Greeting () {
    const hours = new Date().getHours();
    let greeting;

    if (hours >= 0 && hours < 6) {
      greeting = 'Night';
    } else if (hours >= 6 && hours < 12) {
      greeting = 'Morning';
    } else if (hours >= 12 && hours < 18) {
      greeting = 'Day';
    } else {
      greeting = 'Evening';
    }

    return <h1>Good {greeting}</h1>
}

export default Greeting;