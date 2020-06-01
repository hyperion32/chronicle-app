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
            <div className="search-results">
                <form onSubmit={this.props.data} action="">
                    <input onKeyUp={(e) => {this.setState({searchVal: e.target.value})}} type="text" placeholder="Search" />
                    <Button onClick={this.submitSearch.bind(this)} variant="primary btn-sm" id="search-button" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>{' '}
                </form>
            </div>
        );
    }
}
export default SearchResults;