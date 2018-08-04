import React from 'react'

const AddListForm = props => {
  const {handleSubmit, handleChange} = props

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} name="listName" placeholder="List Name" />
      <button type="submit">Add List</button>
    </form>
  )
}

export default AddListForm
