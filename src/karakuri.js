import { StackNavigator } from 'react-navigation'

import Connection from './components/Connection'
import Home from './components/Home'

export default StackNavigator({
  Connection: { screen: Connection },
  Home: { screen: Home },
}, { headerMode: 'none' })
