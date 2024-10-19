import React from 'react'

const Card = ({ icon, text, number, color}) => {
    return (
        <div className={`card w-full ${color} shadow-xl`}>
            <div className="card-body">
                {icon}
                <h2 className="card-title">{text}</h2>
                <p>{number}</p>

            </div>
        </div>
    )
}

export default Card
