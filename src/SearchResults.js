import React from 'react';
import Button from 'react-bootstrap/Button';

const SearchResults = (props) => {
    return (
        <div className="search-results">
            <form onSubmit={props.data} action="">
                <input onChange={props.handleSubmit} type="text" placeholder="Search"/>
                <Button variant="primary " size="md" id="search-button" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </Button>{' '}
            </form>
        </div>
    );
}

export default SearchResults;