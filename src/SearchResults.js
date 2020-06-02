import React from 'react';
import Button from 'react-bootstrap/Button';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        let input = document.querySelector("input");
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
            <div className="row">
                <div className="col ">
                    <h2>Explore</h2>
                </div>
                <div className="col">
                    <div className="search-results">
                        <form onSubmit={this.props.data} action="">
                            <input onKeyUp={(e) => { this.setState({ searchVal: e.target.value }) }} type="text" placeholder="Search" />
                            <Button onClick={this.submitSearch.bind(this)} variant="primary btn-sm" id="search-button" type="submit">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </Button>{' '}

                        </form>
                    </div>
                </div>
                <div className="col">
                    <select defaultValue="Sort" onChange={this.props.handleSort}>
                        <option disabled value="Sort">Sort</option>
                        <option value="MostPage">Most Pages</option>
                        <option value="LeastPages">Least Pages</option>
                    </select>
                </div>
            </div>

        );
    }
}
export default SearchResults;