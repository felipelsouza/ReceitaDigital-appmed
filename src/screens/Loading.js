import React, { Component } from "react"
import { ActivityIndicator} from "react-native"

import commonStyles from '../commonStyles'

export default class Loading extends Component {
    render() {
        return (
            <ActivityIndicator size="large" color={commonStyles.colors.primaryDark} />
        )
    }
}
