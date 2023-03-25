const NumberDisplay = ({ persons, nameFilter }) => {
    //console.log('persons and nameFilter are: ', persons, nameFilter)
    if (nameFilter !== '') {
        //debugger
        const personsFilter = persons.filter(person => person.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
        //console.log('personsFilter is: ', personsFilter)
        if (personsFilter.length > 0) {
            return (
                <ul>
                    {personsFilter.map((person) => {
                        return (<li key={person.name}>{person.name} {person.number}</li>)
                    })}
                </ul>
            )
        }
    } else {
        return (
            <ul>
                {persons.map((person) => {
                    return (<li key={person.name}>{person.name} {person.number}</li>)
                })}
            </ul>
        )
    }
}

export default NumberDisplay;