import React from 'react';

const SearchResults = (props) => {
    return (
        <div className="search-results">
            <form onSubmit= { props.data }action="">
                <input onChange={props.handleSubmit} type="text" placeholder="Search"/>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchResults;