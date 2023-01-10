import React, { useEffect, useState, useRef } from "react";

const divSTYLE = {
    background: "#3c4d5c",
    padding: "8px",
    paddingBottom: "3px",
    height: "57px",
    textAlign: "center",
    fontSize: "1.6em",
    lineHeight: "1.428571429",

    borderRadius: "3px",
    color: "white",
    width: "93px",
    //float: "left",
    marginRight: " 7px",
    marginLeft: "17px",
    cursor: "pointer",
}
//let minutes = 0;
const Timer = (props) => {

    const { startCounting, setTimeUp } = props
    const countRef = useRef(null);
    const [timeElapsed, setTimeElapsed] = useState(60);
    // const [open, setOpen] = useState(true);


    const TimeOut = () => {
        if (startCounting) {
            countRef.current = setInterval(() => {
                setTimeElapsed(oldSpeed => oldSpeed - 1)
            }, 1000);
        }
    }

    useEffect(() => {
        if (timeElapsed > 0) return;
        clearInterval(countRef.current);

        const timeOut = setTimeout(() => {
            setTimeUp(true);
        }, 3000);

        return () => {
            clearTimeout(timeOut)
        }

    }, [timeElapsed])

    useEffect(() => {
        TimeOut();
    }, [startCounting])
    return (
        <div
            style={divSTYLE}
        >{timeElapsed === 60 ? '1:00' : '00:' + timeElapsed}</div>

    )

}

export default Timer;

