import { memo } from 'react';

const SearchBar = memo(function SearchBar({ value, onChange }) {
    console.log('SearchBar rendered'); // trainees can see this in devtools

    return (
        <div className="relative">
            Search Bar
        </div>
    );
});

export default SearchBar;