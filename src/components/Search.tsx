import React, {ChangeEvent, FC, useState} from 'react';
import Input from "./UI/Input/Input";


interface SearchProps {
    setSearch: (searchValue: string) => void;
}

const Search: FC<SearchProps> = ({setSearch}) => {

    const [searchValue, setSearchValue] = useState<string>('');

    const search = (e: ChangeEvent<HTMLInputElement>): void => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
        setSearch(searchValue);
    };

    return (
        <Input
            placeholder="Search . . ."
            value={searchValue}
            onChange={search}
        />
    );
};

export default Search;