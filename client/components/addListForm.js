import React from 'react'

const AddListForm = props => {
  const {handleSubmit, handleChange} = props

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="add-list"
        onChange={handleChange}
        name="listName"
        placeholder="List Name"
      />
      <a type="submit">+</a>
    </form>
  )
}

export default AddListForm
