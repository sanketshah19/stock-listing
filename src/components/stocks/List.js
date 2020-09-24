import React from 'react';
import swal from 'sweetalert';
import {Form, Table, Dropdown, DropdownButton} from 'react-bootstrap';

import axios from '../../config/axios';
import Stocks from './Stocks';
import Pagination from './Pagination';

class List extends React.Component {
    constructor(){
        super()
        this.state = {
            stocks: [],
            dupStocks: [],
            loading: false,
            currentPage: 1,
            stocksPerPage: 15
        }
    }

    componentDidMount(){
        axios.get('/StockList.json')
            .then((response) => {
                const stocks = response.data
                this.setState({stocks, dupStocks: stocks})
            })
            .catch((err) => {
                swal ("Oops", `${err}` ,"error") 
            })
    }

    handleSearch = (e) => {
        const value = e.target.value
        if(value === ""){
            this.setState({stocks: this.state.dupStocks})
        }else{
            this.setState({stocks: this.state.dupStocks.filter(stock => stock.CATEGORY.toLowerCase().slice(0, value.length) === value.toLowerCase())})
        }
    }

    
    handleSortByCategory = () => {
        this.setState({
           stocks: this.state.dupStocks.sort(
            function(a, b) {
                if(a.CATEGORY.toLowerCase() < b.CATEGORY.toLowerCase()) return -1;
                if(a.CATEGORY.toLowerCase() > b.CATEGORY.toLowerCase()) return 1;
                return 0;
               }
           )
        });
    }

    handleSortByLOC = () => {
        this.setState({
            stocks: this.state.dupStocks.sort(
                function(a, b) {
                if(a.LOC.toLowerCase() < b.LOC.toLowerCase()) return -1;
                if(a.LOC.toLowerCase() > b.LOC.toLowerCase()) return 1;
                return 0;
               })
         });
    }

    handleSortByMIN = () => {
        this.setState({
            stocks: this.state.dupStocks.sort((a, b) => (a.DIA_MN - b.DIA_MN))
         });
    }

    handleSortByMAX = () => {
        this.setState({
            stocks: this.state.dupStocks.sort((a, b) => (a.DIA_MX - b.DIA_MX))
         });
    }

    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    render() {
        const {state} = this
        const indexOfLastPost = this.state.currentPage * this.state.stocksPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.stocksPerPage;
        const currentPosts = this.state.stocks.slice(indexOfFirstPost, indexOfLastPost);
      
        return (
            <div className="container-fluid mt-5">
                <div className="d-flex p-2 col-example">
                    <h2 className="text-primary text-center mb-3">Stocks List</h2>
                    <span className="mx-auto mt-1">
                        <Form.Control type="text" placeholder="&#128269; Search by Category..." onChange={this.handleSearch}/>
                    </span>
                    <DropdownButton id="dropdown-basic-button" title="Sort By">
                        <Dropdown.Item href="#" onClick={this.handleSortByCategory}>Category</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.handleSortByLOC}>LOC</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.handleSortByMIN}>DIA_MIN</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={this.handleSortByMAX}>DIA_MAX</Dropdown.Item>
                    </DropdownButton>
                </div><hr/>
                <div className="row">
                    <div className="text-center mx-auto">
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Shape</th>
                                    <th>DIA_MIN</th>
                                    <th>DIA_MAX</th>
                                    <th>Girdle</th>
                                    <th>Comment</th>
                                    <th>LOC</th>
                                    <th>COL</th>
                                    <th>CUT</th>
                                    <th>Origin</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts.map((stock, i) => {
                                        return <Stocks key={i} stocks={stock}/>
                                    })
                                }
                            </tbody>
                        </Table>
                    <Pagination className="text-center mx-auto" stocksPerPage={state.stocksPerPage} totalStocks={state.stocks.length} paginate={this.paginate}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;