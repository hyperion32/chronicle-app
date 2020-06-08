import React from 'react';
import Button from 'react-bootstrap/Button';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        let input = document.querySelector("input");

        if (input === null) {
            input = "";
        }

        this.state = {
            searchVal: input.value
        }
    }

    submitSearch = (event) => {
        event.preventDefault();
        this.props.updateResults(this.state.searchVal);
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex w-100">
                                    <h2 className="page-title">Explore</h2>
                                </div>
                            </div>
                            <div className="col">
                                <div className="search-results">
                                    <form onSubmit={this.props.data} action="" className="mt-3">
                                        <input onKeyUp={(e) => { this.setState({ searchVal: e.target.value }) }} type="text" placeholder="Search" />
                                        <Button onClick={this.submitSearch.bind(this)} variant="primary btn-sm" id="search-button" type="submit">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </Button>{' '}
                                    </form>
                                </div>
                            </div>
                            <div className="col">
                                <SortDropdown handleSort={this.props.handleSort} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SortDropdown extends React.Component {
    render() {
        return (
            <select defaultValue="Sort" onChange={this.props.handleSort} className="mt-4">
                <option disabled value="Sort">Sort</option>
                <option value="oldest">Oldest</option>
                <option value="newest">Newest</option>
            </select>
        );
    }
}

export default SearchResults;