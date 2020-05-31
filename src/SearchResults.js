import React from 'react';
import Button from 'react-bootstrap/Button';

const SearchResults = (props) => {
    return (
        <div className="search-results">
            <form onSubmit={props.data} action="">
                <input onChange={props.handleSubmit} type="text" placeholder="Search"/>
                {/*<button type="submit">Search</button>*/}
                <Button variant="primary" id="search-button" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </Button>{' '}
            </form>
        </div>
    );
}

export default SearchResults;