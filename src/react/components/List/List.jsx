import React from "react";
import { connect } from "react-redux";
import { getList } from "../../actions/actions.js";
import { setCurrProduct } from "../../actions/actions.js";
import {hash} from "../../../utils/utils.js"




import Item from "./Item.jsx"

class List extends React.Component {

    constructor(props) {
        super(props);
        this.props.getList();

        this.state = {
            sort: 'name',
            filterStock: false,
            reverse: false,
            search: '',
        }

    }

    changeSort = (event) => {
        const sortType = event.currentTarget.getAttribute('data-sort');

        if (sortType === this.state.sort) {
            this.setState({reverse: !this.state.reverse})
        } else {
            this.setState({sort: sortType})
        }
    };

    changeSearch = (event) => {
        this.setState({search: event.target.value})
    };


    sortByName = (a,b) => {
        return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    };
    sortByPrice = (a,b) => {
        return a.price - b.price
    };
    filterByStock = () => {
        this.setState({ filterStock: !this.state.filterStock })
    };


    render = () => {
        const {list, setCurrProduct, currProduct} = this.props;
        const {sortByName, sortByPrice, filterByStock, changeSort, changeSearch, search} = this;
        const {sort, filterStock, reverse} = this.state;

        return (
            <div className="list">

                <div className="list-header">
                    <input className="search" autoComplete="off" type="text" value={search} onChange={changeSearch} name={'name'}/>
                    <div className="name" data-sort="name" onClick={changeSort}>
                        <span className="text">Имя</span>
                        <span className={`symbol ${sort === 'name' ? 'active' : ''} ${reverse ? 'reverse' : ''} `}  />
                    </div>
                    <div className="price" data-sort="price" onClick={changeSort}>
                        <span className="text">Цена</span>
                        <span className={`symbol ${sort === 'price' ? 'active' : ''} ${reverse ? 'reverse' : ''} `}  />
                    </div>
                    <div className="stock" onClick={filterByStock}>
                        <span className={`elem ${filterStock ? 'active' : ''} `} >✓</span>
                        <span className="text">В наличии</span>
                    </div>
                </div>
                {
                    list.filter( (currValue) => ( !( filterStock && !currValue.inStock) ))
                        .sort( (a, b) => ( sort === 'name' ? sortByName(a,b) : sortByPrice(a,b) ) )
                        .reverseCustom(reverse)
                        .map( (currValue, index) => (
                            <Item key={index} action={setCurrProduct}
                                  focus={currProduct.id} name={currValue.name}
                                  price={currValue.price} picture={currValue.picture} id={currValue.id} />
                              )
                        )
                }
            </div>
        )
    }
}

export default connect(
    store => ({list: store.list, currProduct: store.currProduct}),
    dispatch => ( {getList: getList(dispatch), setCurrProduct: setCurrProduct(dispatch) } ),
)(List)
