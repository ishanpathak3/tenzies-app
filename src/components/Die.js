import React from 'react'

function Die(props) {
    return (
        <div onClick={()=> props.holdDice(props.id)} className={props.isHeld === false? 'die-face' : 'die-face held'}>
            <h2 className='die-name' >{props.value}</h2>
        </div>
    )
}

export default Die
