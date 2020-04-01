import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './screens/Login'
import Home from './screens/Home'
import NewRecipe from './screens/NewRecipe'
import SeekRecipe from './screens/SeekRecipe'

const mainRoutes = {
    Login: {
        name: 'Login',
        screen: Login
    },
    Home: {
        name: 'Home',
        screen: Home
    },
    NewRecipe: {
        name: 'NewRecipe',
        screen: NewRecipe
    },
    SeekRecipe: {
        name: 'SeekRecipe',
        screen: SeekRecipe
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'NewRecipe'
})

export default createAppContainer(mainNavigator, mainRoutes)