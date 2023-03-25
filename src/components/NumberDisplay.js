const SinglePersonDisplay = ({ person, handleDelete }) => {

    const handleDelButton = (person) => {
        if (window.confirm(`Do you want to delete ${person.name}'s info?`)) {
            handleDelete(person.id)
        }
    }
    return (
        <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelButton(person)}>Delete</button>
        </li>
    )
}

const NumberDisplay = ({ persons, nameFilter, handleDelete }) => {
    //console.log('persons and nameFilter are: ', persons, nameFilter)
    if (nameFilter !== '') {
        //debugger
        const personsFilter = persons.filter(person => person.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
        //console.log('personsFilter is: ', personsFilter)
        if (personsFilter.length > 0) {
            return (
                <ul>
                    {personsFilter.map((person) => {
                        return (
                            <SinglePersonDisplay person={person} handleDelete={handleDelete} />
                        )
                    })}
                </ul>
            )
        }
    } else {
        return (
            <ul>
                {persons.map((person) => {
                    return (
                        <SinglePersonDisplay person={person} handleDelete={handleDelete} />
                    )
                })}
            </ul>
        )
    }
}

export default NumberDisplay;