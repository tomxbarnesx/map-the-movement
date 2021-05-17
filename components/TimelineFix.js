import { PureComponent } from 'react'
import { Timeline } from 'react-twitter-widgets'

export default class TimelineFix extends PureComponent {
  render () {
    return <Timeline {...this.props} />
  }
}