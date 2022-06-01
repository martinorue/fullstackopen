
const Country = ({ country }) => {
    const country_values = Object.values(country.languages);
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {country_values.map(c => <li key={c}>{c}</li>)}
            </ul>
            <img src={country.flags.png} alt={`flag of ${country.name.common}`}></img>
        </>
    )
}

export default Country