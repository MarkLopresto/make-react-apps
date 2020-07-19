import React, { useState, useRef }  from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0')
}

export default function App() {
  // state
  const startTime = (25 * 60)
  const [title, setTitle] = useState('Let the countdown begin!')
  const [timeLeft, setTimeLeft] = useState(startTime)
  const [isRunning, setIsRunning] = useState(false)
  // keep data between renders
  const intervalRef = useRef(null)

  // functions
  function startTimer() {
    // keep from doubling countdown timer if clicking start more than once
    if (intervalRef.current !== null) return

    setTitle('Timer Has Started')
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      // look at the previous value and update another value
      setTimeLeft(timeLeft => {
        // if to keep timer from going negative
        if (timeLeft >= 1) return timeLeft - 1

        // reset the timer optional
        // resetTimer()

        return 0
      })
    }, 1000);

    console.log(intervalRef.current)
  }

  function stopTimer() {
    if (intervalRef.current === null) return
    console.log(intervalRef.current)
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTitle('You\'re Stopped')
    setIsRunning(false)
  }

  function resetTimer() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTitle('Start When Ready')
    setTimeLeft(startTime)
    setIsRunning(false)
  }

  // compute
  const minutes = padTime(Math.floor(timeLeft / 60))
  const seconds = padTime(timeLeft - minutes * 60)

  // render
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {timeLeft < (startTime) && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
