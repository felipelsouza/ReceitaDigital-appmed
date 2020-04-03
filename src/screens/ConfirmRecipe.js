import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput
} from 'react-native'

import commonStyles from '../commonStyles'

const initialState = { password: '' }

export default class AddMedicament extends Component {
    state = {
        ...initialState
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Digite sua Senha</Text>
                    <View style={styles.body}>
                        <TextInput style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}
                            style={styles.button}
                            activeOpacity={0.8}>
                            <Text style={styles.regularText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            activeOpacity={0.8}
                            onPress={this.save}>
                            <Text style={styles.regularText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF',
    },
    header: {
        backgroundColor: commonStyles.colors.primaryDark,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 15,
        fontSize: 15
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 12
    },
    button: {
        flexDirection: 'row',
        borderColor: commonStyles.colors.primaryDark,
        borderWidth: 1.8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
        height: 40,
        width: 90,
        borderRadius: 15,
        marginLeft: 15
    },
    input: {
        borderWidth: 1,
        borderColor: commonStyles.colors.primary,
        borderRadius: 10,
        height: 50,
        marginBottom: 10,
        textAlign: 'center'
    },
    body: {
        padding: 10
    },
    regularText: {
        color: commonStyles.colors.secondary,
        fontSize: 15
    }
})