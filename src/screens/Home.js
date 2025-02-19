import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../store/actions/user'

import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import bg from '../../assets/imgs/med-bg.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'

class Home extends Component {
    logout = () => {
        this.props.onLogout()
        this.props.navigation.navigate('Login')
    }
    
    render() {
        console.log(this.props.userCpf)
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={bg}
                    style={styles.backgroud}>
                    <View style={styles.titleBar}>
                        <Text style={styles.subtitle}>{today}</Text>
                        <Text style={styles.title}>Bem-vindo, Dr(a)!</Text>
                    </View>
                </ImageBackground>

                <View style={styles.home}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('NewRecipe')}>
                        <View style={styles.buttons}>
                            <Text style={styles.regularText}>Nova Receita</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('SeekRecipe')}>
                        <View style={styles.buttons}>
                            <Text style={styles.regularText}>Consultar Receitas</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={styles.footer}>
                        
                    <TouchableOpacity style={styles.addIcon} activeOpacity={0.8}
                            onPress={() => this.props.navigation.navigate('Perfil')}>
                            <Icon name="user" size={20}
                                    color={commonStyles.colors.secondary}
                                />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addIcon} activeOpacity={0.8}
                            onPress={this.logout}>
                            <Icon name="sign-out" size={20}
                                    color={commonStyles.colors.secondary}
                                />
                    </TouchableOpacity>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroud: {
        flex: 4
    },
    home: {
        flex: 7,
        justifyContent: 'center'
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
        borderBottomWidth: 1.8
    },
    title: {
        fontSize: 28,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
        fontWeight: "bold"
    },
    regularText: {
        color: commonStyles.colors.secondary,
        fontSize: 15
    },
    subtitle: {
        fontSize: 24,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
    },
    footer: {
        flex: 0.9,
        paddingHorizontal: 60,
        padding: 12,
        flexDirection: 'row',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: commonStyles.colors.primaryDark,
        backgroundColor: '#FFF'
    },
    addIcon: {
        flexDirection: 'row',
        width: 35,
        height: 35,
        borderRadius: 12,
        backgroundColor: commonStyles.colors.primaryDark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        borderColor: commonStyles.colors.primaryDark,
        borderWidth: 1.8,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
        marginBottom: 50,
        height: 65,
        width: 280,
        borderRadius: 40
    },
    regularText: {
        color: commonStyles.colors.secondary,
        fontSize: 20
    }
})

const mapStateToProps = ({ user }) => {
    return {
        userCpf: user.userCpf
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)