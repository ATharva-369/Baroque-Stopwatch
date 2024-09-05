import React, {useState, useEffect, useRef} from 'react';
import styles from './Stopwatch.module.css'

function Stopwatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startButtonState, setStartButtonState] = useState(false);
    const [stopButtonState, setStopButtonState] = useState(false);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() =>{
                setElapsedTime(Date.now() - startTimeRef.current)
            },10);
        }

        return () =>{
            clearInterval(intervalIdRef.current);
        }
    },[isRunning]);

    function start(){
        if(!isRunning){
            setStartButtonState(true);
            setStopButtonState(false);
        }

        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;

    }

    function stop(){
        if(isRunning){
            setStartButtonState(false);
            setStopButtonState(true);
        }
        setIsRunning(false);
    }

    function reset(){
        if(!isRunning){
        setElapsedTime(0);
        setStartButtonState(false);
        setStopButtonState(false);
        }

    }

    function formatTime(){
       
        let hours = Math.floor(elapsedTime / (1000 * 60 *60));
        let minutes = Math.floor(elapsedTime / (1000 * 60)%60);
        let seconds = Math.floor(elapsedTime / (1000)%60);
        let milliseconds = Math.floor((elapsedTime % 1000)/10);

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");

        return `${hours}:${minutes}:${seconds}`
    }

    return(        
    <div className={styles.clockContainer}>
        <div className={styles.clock}>
            <span>{formatTime()}</span>
        </div>
        <div className={styles.controls}>
            <button onClick = {start} className={startButtonState ? styles.startButtonPressed : styles.startButton}>Start</button>
            <button onClick = {stop} className={stopButtonState ? styles.stopButtonPressed : styles.stopButton}>Stop</button>
            <button onClick = {reset} className={styles.resetButton}>Reset</button>

        </div>
    </div>);

}

export default Stopwatch;