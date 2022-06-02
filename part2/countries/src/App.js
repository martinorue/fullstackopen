import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import FilteredCountries from './components/FilteredCountries'

function App() {

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleFilterChange = (event) => {
    setFiltered(event.target.value);
    const regex = new RegExp(filtered, 'i');
    const filteredCountries = countries.filter(c => c.name.common.match(regex));
    setFilteredCountries(filteredCountries);
  }

  return (
    <div>
      <Filter value={filtered} onChange={handleFilterChange} />
      <FilteredCountries filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries}/>
    </div>

  );
}

export default App;
