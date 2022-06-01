import Country from "./Country";

const FilteredCountries = ({ filteredCountries }) => {
    const match = filteredCountries.length;
    if (match > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } if (match <= 10 && match > 1) {
        return (
            <ul>
                {filteredCountries.map(c => <li key={c.ccn3}> {c.name.common}</li>)}
            </ul>
        )
    } if (match === 1) {
        return (
            <Country country={filteredCountries[0]} />
        )
    }
}

export default FilteredCountries