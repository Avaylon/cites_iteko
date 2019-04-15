import React from 'react'

class Col extends React.Component {

    render() {

        const {val} = this.props;
        return (
            <div className='td'>
                {typeof val === 'boolean' && val ? 'Да' : typeof val === 'boolean' && !val ? 'Нет' : val}
            </div>
        )
    }
}

export default Col;