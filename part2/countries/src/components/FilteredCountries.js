import Country from "./Country";

const Button = ({text, handleClick}) => {
    return (
      <>
        <button onClick={handleClick}>
          {text}
        </button>
      </>
    )
  }

const FilteredCountries = ({ filteredCountries, setFilteredCountries }) => {
    
    let match = filteredCountries.length;
    
    if (match > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } if (match <= 10 && match > 1) {
        return (
            <div>
                <ul>
                    {filteredCountries.map(c => <li key={c.cca2+c.ccn3}> {c.name.common}
                    <Button text='show' handleClick={() => setFilteredCountries([c])}/></li>)}
                </ul>
            </div>
        )
    } if (match === 1) {
        return (
            <Country country={filteredCountries[0]} />
        )
    }
}

export default FilteredCountries