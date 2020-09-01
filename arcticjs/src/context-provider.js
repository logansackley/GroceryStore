import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.actions = {
        }
        this.state = {
            categories: {},
            products: {},
        }

    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        // load the categories
        const cat_resp = await axios.get('http://localhost:8000/api/category')
        const categories = {}
        for (const cat of cat_resp.data) {
            categories[cat.id] = cat
        }

        // load the products
        const prod_resp = await axios.get('http://localhost:8000/api/product')
        const products = {}
        for (const prod of prod_resp.data) {
            products[prod.id] = prod
        }

        // set in state
        this.setState({
            categories: categories,
            products: products,
        })
    }

}
