import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

export default props => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.name}>{props.name}</Text>
                <Text>{props.dosage}</Text>
                <Text>{props.obs}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                <TouchableOpacity style={styles.addIcon}
                    activeOpacity={0.8}
                    onPress={() => props.onDelete && props.onDelete(props.id)}>
                    <Icon name="minus" size={15} color={commonStyles.colors.secondary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 8,
        borderBottomWidth: 0.5,
        borderColor: commonStyles.colors.primary,
        alignItems: 'center',
        paddingVertical: 10
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: commonStyles.colors.primaryDark
    },
    addIcon: {
        flexDirection: 'row',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fa2f2f',
        justifyContent: 'center',
        alignItems: 'center'
    }
})