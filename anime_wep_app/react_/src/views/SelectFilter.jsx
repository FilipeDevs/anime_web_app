import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SelectFilter({ name, options, sort, type }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectValue, setSelectValue] = useState("Any");

    // Persist Filter on select box from url parameter
    useEffect(() => {
        const selectedValue = searchParams.get(type);
        if (selectedValue) {
            setSelectValue(selectedValue);
        } else {
            setSelectValue("Any");
        }
    }, [searchParams, type]);

    // Selected option will update url (add filter parameter)
    const handleChange = (event) => {
        const selectedOption = event.target.value;

        if (selectedOption === "Any") {
            setSearchParams((params) => {
                params.delete(type);
                return params;
            });
        } else {
            setSearchParams((params) => {
                setSelectValue(selectedOption);
                params.set(
                    type,
                    type === "season"
                        ? selectedOption.toUpperCase()
                        : selectedOption
                );
                return params;
            });
        }
    };

    return (
        <div>
            <label
                htmlFor="filter"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {name}
            </label>
            <select
                defaultValue={selectValue}
                id="filter"
                value={selectValue}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {!sort && <option value="Any">Any</option>}
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectFilter;
