import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName , setNewName ] = useState('')
  const [ newNumber , setNewNumber ] = useState('')
  const [ filterWord , setNewFilterWord ] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const person = persons.find( person => person.name=== newName)
    if(person){
      alert(`${person.name} is already added to phonebook`)
    } else {
      const personsNew = persons.concat({
        name:newName,
        number:newNumber
      })
      setPersons(personsNew)
    }
  }

  const handleOnChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleOnChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleChangeFilterWord = (e) => {
    setNewFilterWord(e.target.value)
  }

  const filterPersons = persons.filter( person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1 )
  
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleChangeFilterWord}/>
      <h2>add a new</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={ handleOnChangeName }/>
        </div>
        <div>
          number: <input onChange={ handleOnChangeNumber }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPersons.map(({ name, number }) => <p key={ name }>{ name } { number }</p>)}
    </div>
  );
}

export default App;
