import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import commonStyles from '../commonStyles'
import bg from '../../assets/imgs/med-bg.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'

export default class Home extends Component {
    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
        const doctor = "Felipe" //BUSCAR NOME DO MÉDICO DB
        return (
            <View style={styles.container}>
                <ImageBackground source={bg}
                    style={styles.backgroud}>
                    <View style={styles.titleBar}>
                        <Text style={styles.subtitle}>{today}</Text>
                        <Text style={styles.title}>Bem-vindo, Dr(a) {doctor}!</Text>
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
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.buttons}>
                            <Text style={styles.regularText}>Sair</Text>
                        </View>
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
        flex: 3
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
    subtitle: {
        fontSize: 24,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
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