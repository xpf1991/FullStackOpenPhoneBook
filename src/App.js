import { useEffect, useState } from 'react'
import FilterPart from './components/FilterPart'
import FormAdd from './components/FormAdd'
import NumberDisplay from './components/NumberDisplay'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('useEffect is on going')
    axios
      .get('http://localhost:3001/Persons')
      .then(response => {
        console.log('axios is on going')
        setPersons(response.data)
      })
  }, [])
  console.log(`gets ${persons.length} person`)

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
    console.log('nameFilter content is: ', nameFilter)
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    if (found === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      console.log('nwePerson object,', newPerson)
      setPersons(persons.concat(newPerson))
      console.log('persons object,', persons)
      setNewName('')
      setNewNumber('')
      setNameFilter('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>

      <h2>Phonebook filter</h2>
      <FilterPart nameFilter={nameFilter} handleNameFilter={handleNameFilter} />

      <h2>Add a new</h2>
      <FormAdd
        handleNameInput={handleNameInput} newNumber={newNumber}
        handleNumberInput={handleNumberInput}
        handleSubmit={handleSubmit} newName={newName} />

      <h2>Numbers</h2>
      <NumberDisplay persons={persons} nameFilter={nameFilter} />

    </div>
  )
}

export default App