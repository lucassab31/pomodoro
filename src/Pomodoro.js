import { useState, useEffect } from "react";

const red = '#f54e4e';
const green = '#4aec8c';

const Pomodoro = () => {
    const [workTimer, setWorkTimer] = useState(600);
    const [breakTimer, setBreakTimer] = useState(150);
    const [timer, setTimer] = useState(workTimer);
    const [minutes, setMinutes] = useState("10");
    const [secondes, setSecondes] = useState("00");
    const [status, setStatus] = useState("Stop");
    const [active, setActive] = useState(false);

    useEffect(() => {
        let intervalId;

        if (timer < 0) {
            if (status == "Work") {
                setTimer(breakTimer);
                setStatus("Break");
            } else if (status == "break") {
                setTimer(workTimer);
                setStatus("Work");
            }
        } else {
            if (active) {
                intervalId = setInterval(() => {
                    setTimer(timer - 1);
                }, 1000);
            }
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [active, timer]);
    
    const playTimer = () => {
        if (workTimer > 0 && breakTimer > 0) {
            setActive(true);
            setStatus("Work");
        } else {
            alert("Les temps de travail ou de repos sont null");
        }
    }
    
    const pauseTimer = () => {
        setActive(false);
        setStatus("Pause");
    }

    const stopTimer = () => {
        setActive(false);
        setStatus("Stop");
        setTimer(workTimer);
    }

    const formatTimer = (timer) => {
        let min = Math.floor(timer / 60);
        let sec = timer - min * 60;
        min = (min < 10 ? "0" + min : min);
        sec = (sec < 10 ? "0" + sec : sec);
        return min + ":" + sec;
    }
    const [valWork, setValWork] = useState(formatTimer(workTimer));
    const [valBreak, setValBreak] = useState(formatTimer(breakTimer));

    const unFormartTimer = (timer) => {
        let time = timer.split(':');
        let min = parseInt(time[0]);
        let sec = parseInt(time[1]);
        return min*60 + sec;
    }

    const changeTimers = () => {
        const regex = new RegExp('[0-9]{2}:{1}[0-9]{2}');

        if (!active && status == "Stop") {
            if (valWork != "" && valBreak != "") {
                if (regex.test(valWork) && regex.test(valBreak)) {
                    setWorkTimer(unFormartTimer(valWork));
                    setBreakTimer(unFormartTimer(valBreak));
                    setTimer(workTimer);
                } else {
                    alert("Les valeurs ne respectent pas le patterne : 00:00");
                }
            } else {
                alert("Tous les champs doivent être remplit")
            }
        } else {
            alert("You are working");
        }
    }

    return (
        <div>
            <div className="timer">
                {formatTimer(timer)}
            </div>
            <h1>{status}</h1>
            <div className="buttons">
                <button pattern disabled={active} onClick={playTimer}>Play</button>
                <button onClick={stopTimer}>Reset</button>
                <button disabled={!active} onClick={pauseTimer}>Pause</button>
            </div>
            <div className="params">
                <div>
                    <h4>Work timer</h4>
                    <input value={valWork} onChange={e => setValWork(e.target.value)} placeholder="10:00"></input>
                </div>
                <div>
                    <h4>Break timer</h4>
                    <input value={valBreak} onChange={e => setValBreak(e.target.value)} placeholder="05:00"></input>
                </div>
            </div>
            <button onClick={changeTimers}>Appliquer</button>
        </div>
    );
}

export default Pomodoro;