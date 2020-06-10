import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'

import { TextInputMask } from 'react-native-masked-text'

import bg from '../../assets/imgs/med-bg.jpg'
import logo from '../../assets/imgs/logo-dark.png'
import commonStyles from '../commonStyles'

class Login extends Component {
    login = () => {
        const { userCpf, userPassword } = this.state;
        fetch('http://198.50.130.238/login/login.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                // Passar os inputs para o server
                cpf: userCpf,
                password: userPassword
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == "Login feito com sucesso!") {
                    // redirecionar para a criação de receitas
                    Alert.alert('Login realizado com sucesso!')
                    this.props.onLogin({ ...this.state })
                    this.props.navigation.navigate('Home')
                } else {
                    Alert.alert('Login invalido!', 'CPF ou SENHA incorretos, tente novamente.')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    constructor(props) {

        super(props)

        this.state = {

            UserCpf: '',
            UserPassword: ''

        }

    }
    render() {
        console.log(this.state.userCpf)

        return (
            <View style={styles.container}>
                <ImageBackground source={bg}
                    style={styles.bgImg}>
                    <View style={styles.background}>
                        <Image source={logo} style={styles.logo}>

                        </Image>
                            <TextInputMask
                                type={'cpf'}
                                value={this.state.userCpf}
                                onChangeText={text => { this.setState({ userCpf: text.replace(/[^0-9]/g, "") }) }}
                                style={styles.loginUS}
                                autoCorrect={false}
                                placeholder="Digite seu CPF"
                            />
                            <TextInput
                                onChangeText={userPassword => this.setState({ userPassword })}
                                secureTextEntry={true}
                                placeholder="Senha"
                                style={styles.loginUS}
                                autoCorrect={false}
                            />
                        <TouchableOpacity style={styles.pressButton} onPress={this.login}>

                            <Text style={styles.textBtn}>Acessar</Text>
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
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    bgImg: {
        flex: 1,
    },
    logo: {
        width: '100%'
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
        color: commonStyles.colors.secondary,
        fontSize: 18
    },
})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)