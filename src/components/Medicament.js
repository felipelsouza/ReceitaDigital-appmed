import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import commonStyles from '../commonStyles'

export default props => {
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.name}>{props.name}</Text>
                <Text>{props.dosage}</Text>
                <Text>{props.obs}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: commonStyles.colors.primary,
        alignItems: 'center',
        paddingVertical: 10
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: commonStyles.colors.primaryDark
    }
})