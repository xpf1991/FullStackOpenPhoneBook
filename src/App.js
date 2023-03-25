import { useEffect, useState } from 'react'
import FilterPart from './components/FilterPart'
import FormAdd from './components/FormAdd'
import NumberDisplay from './components/NumberDisplay'
import Services from './services/Services'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('useEffect is on going')
    Services
      .getAll()
      .then(personsAll => {
        setPersons(personsAll)
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
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const found = persons.find((person) => person.name === newName)
    console.log('exist person is: ', found)
    if (found === undefined) {
      //console.log('nwePerson object,', newPerson)
      //console.log('persons object,', persons)
      Services
        .addPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
        })

      setMessage(`${newName}'s info is added`)
      setTimeout(() => { setMessage(null) }, 5000)

      setNewName('')
      setNewNumber('')
      setNameFilter('')
    } else {
      const id = found.id
      if (window.confirm(`${newName} is already added to the phoneBook, replace the old number with the new one?`)) {
        Services
          .changeInfo(id, newPerson)
          .then(response => {
            setPersons(persons.map(person => {
              return person.id !== id ? person : response
            }))
          })
          .catch(errror => {
            setMessage(`${newName}'s info is deleted`)
            setTimeout(() => { setMessage(null) }, 5000)
          })

        setMessage(`${newName}'s info is updated`)
        setTimeout(() => {
          setMessage(null)
          setPersons(persons.filter(person => {
            return person.id !== id
          }))
        }, 5000)

        // 接受修改就删除文本框内容，不接受保留
        setNewName('')
        setNewNumber('')
        setNameFilter('')
      }
    }

  }

  const handleDelete = (id) => {
    Services
      .deletePerson(id)
      .then(deletedPerson => {
        console.log('deletedPerson is', deletedPerson)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook filter</h2>
      <Notification message={message} />
      <FilterPart nameFilter={nameFilter} handleNameFilter={handleNameFilter} />

      <h2>Add a new</h2>
      <FormAdd
        handleNameInput={handleNameInput} newNumber={newNumber}
        handleNumberInput={handleNumberInput}
        handleSubmit={handleSubmit} newName={newName} />

      <h2>Numbers</h2>
      <NumberDisplay
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />

    </div>
  )
}

export default App