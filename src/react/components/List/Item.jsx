import React from "react";

function Item (props) {

    const {name, price, picture, focus, id} = props;

    const action = () => {
        if (id === focus) return false;
        props.action({id, name, price, picture})
    };

    return (
        <div className={focus === id ? "item active" : "item" } onClick={action}>
            <div className="name"> {name} </div>
            <div className="price"> {price} $ </div>
            <img className="picture" src={picture}  alt={name}/>
        </div>
    )

}

export default Item