import React, {PureComponent} from 'react'

const defaultContainer = ({children}) => (
  <div className="control-panel">{children}</div>
)

const status = ['open', 'assigned', 'closed']

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer

    return (
      <Container>
        <h3>Task Filters</h3>
        <p>Select below to view by status and priority.</p>
        <hr />
      </Container>
    )
  }
}
