import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'

import bg from '../../assets/imgs/med-bg.jpg'
import commonStyles from '../commonStyles'

const pressButton = () => {
    Alert.alert('Realizando login...');
}
const lostPassword = () => {
    Alert.alert('Informe seu e-mail para recuperar senha...');
}

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={bg}
                    style={styles.bgImg}>
                    <View style={styles.background}>
                        <TextInput
                            placeholder="User"
                            style={styles.loginUS}
                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder="Senha"
                            style={styles.loginUS}
                            autoCorrect={false}
                        />
                        <TouchableOpacity style={styles.pressButton}>
                            <Text style={styles.textBtn}>Acess</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lostPassword}>
                            <Text style={styles.lostBtn}>Recuperar Senha</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },  
    bgImg: {
        flex: 1
    },
    loginUS: {
        backgroundColor: commonStyles.colors.secondary,
        width: '90%',
        marginBottom: 15,
        color: '#000',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
    },
    pressButton: {
        backgroundColor: '#4F4F4F',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    textBtn: {
        color: '#FFF',
        fontSize: 18
    },
    lostPassword: {
        marginTop: 10,

    },
    lostBtn: {
        color: '#FFF',
    }
});