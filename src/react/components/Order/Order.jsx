import React from "react";
import { connect } from "react-redux";
import { purchase } from '../../actions/actions.js'


function Order (props) {
    const {currProduct, purchase} = props;

    function action (e) {
        e.preventDefault();
        purchase(currProduct);
    }

    return (
        <form onSubmit={action} className="order">
            <input type="hidden" defaultValue={currProduct.id} />
            <button className={`but ${currProduct.id ? '' : 'disabled'}`}>Заказать</button>
        </form>
    )

}

export default connect(
    store => ({currProduct: store.currProduct}),
    dispatch => ( { purchase: purchase(dispatch)} ),
)(Order)
