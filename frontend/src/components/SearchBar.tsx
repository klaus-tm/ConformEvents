// SearchBar.tsx

import React, { useState } from 'react';
import '../style/searchBar.css';

// Define the SearchBarProps interface
interface SearchBarProps {
    onSearch: (searchTerm: string, searchFields: (keyof any)[]) => void;
}

// Use the SearchBarProps interface to type the component
function SearchBar({ onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value, []);
    };

    return (
        <div className="input-container">
            <input
                className="searchInput"
                type="text"
                name=""
                placeholder="Search something"
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;
