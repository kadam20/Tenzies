import React from "react";

export default function Die(props){
    
    return(
        <div onClick={props.holdDice} className="die-face" style={props.isHeld ? {background:'#ccffcc'} : {}}>{props.value}</div>
    )
}