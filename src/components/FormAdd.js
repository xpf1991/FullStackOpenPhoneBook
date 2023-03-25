const FormAdd = ({ handleSubmit, newName, handleNameInput, newNumber, handleNumberInput }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameInput} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberInput} />
            </div>
            <div>debugs-newName: {newName}</div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default FormAdd;