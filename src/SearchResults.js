import React from 'react';
import Button from 'react-bootstrap/Button';

// const SearchResults = (props) => {
//     var input = document.querySelector("input");
//     var searchVal = input.value;

//     const submitSearch = (event) => {
//         event.preventDefault();
//         props.handleSubmit(searchVal);
//     };

//     return (
//         <div className="search-results">
//             <form onSubmit={props.data} action="">
//                 <input onKeyUp={submitSearch} type="text" placeholder="Search"/>
//                 <Button variant="primary btn-sm" id="search-button" type="submit">
//                     <i className="fa fa-search" aria-hidden="true"></i>
//                 </Button>{' '}
//             </form>
//         </div>
//     );
// }

// 

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        let input = document.querySelector("input");
        this.state = {
            searchVal: input.value
        }

    }

    submitSearch(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.searchVal);
    }

    // this.state.searchVal

    render() {
        return (
            <div className="search-results">
                <form onSubmit={this.props.data} action="">
                    <input onKeyUp={this.submitSearch} type="text" placeholder="Search" />
                    <Button variant="primary btn-sm" id="search-button" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>{' '}
                </form>
            </div>
        );
    }
}

export default SearchResults;