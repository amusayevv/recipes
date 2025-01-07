import React from "react";

function Search(props) {
    return (
        <input
            onChange={props.handleSearch}
            id="search"
            type="text"
            placeholder="Search recipes..."
        />
    );
}

export default Search;
