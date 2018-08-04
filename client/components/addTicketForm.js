import React from 'react'

const AddTicketForm = props => {
  const {handleSubmit, handleChange} = props

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} name="taskName" placeholder="Task Name" />
      <input name="description" />
      {/* MAP */}
      <button>Current Location</button>
      <button type="submit">Add Task</button>
    </form>
  )
}

export default AddTicketForm
