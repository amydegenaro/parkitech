import React from 'react'

const defaultContainer = ({children}) => (
  <div className="control-panel">{children}</div>
)

const ControlPanel = props => {
  const Container = props.containerComponent || defaultContainer

  return (
    <Container>
      <h3>Task Filters</h3>
      <p>Select below to view by status and priority.</p>
      <hr />
      <form>
        <div className="col-auto">
          <label htmlFor="status">Status</label>
          <select
            onChange={props.handleChange}
            name="status"
            className="form-control"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="col-auto">
          <label htmlFor="priority">Priority</label>
          <select
            onChange={props.handleChange}
            name="priority"
            className="form-control"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </form>
    </Container>
  )
}

export default ControlPanel
