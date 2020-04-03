import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import commonStyles from '../commonStyles'

export default props => {
    return(
        <View>
            <Text>{props.pacient}</Text>
            <Text>{props.cpf}</Text>
            <Text>{props.sus}</Text>
        </View>
    )
}