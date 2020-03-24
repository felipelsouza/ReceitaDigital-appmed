import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatList
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

import AddMedicament from './AddMedicament'
import Medicament from '../components/Medicament'

import moment from 'moment'
import 'moment/locale/pt-br'

export default class NewRecipe extends Component {
    state = {
        Medicaments: [{
            id: Math.random(),
            name: 'Dipirona',
            dosage: '100mg de 8 em 8 horas durante 10 dias',
            obs: 'Tomar apenas em caso de dor'
        }],

        showAddMedicament: false,
        medicament: ''
    }

    addMedicament = newMedicament => {
        if (!newMedicament.name || !newMedicament.name.trim()) {
            Alert.alert('Não foi possível adicionar!', 'Nome inválido')
            return
        }
        if (!newMedicament.dosage || !newMedicament.dosage.trim()) {
            Alert.alert('Não foi possível adicionar!', 'Dosagem Inválida')
            return
        }
        const medicaments = [ ...this.state.medicaments ]
        medicaments.push({
            id: Math.random(),
            name: newMedicament.name,
            dosage: newMedicament.dosage,
            obs: newMedicament.obs
        })

        this.setState({ medicaments, showAddMedicament: false })
    }

    render() {
        const today = moment().locale('pt-br').format('DD/MM/YYYY')
        const hospital = "Hospital Regional de Patos de Minas" //BUSCAR NOME DO HOSPITAL NO DB
        return (
            <View style={styles.container}>
                <AddMedicament isVisible={this.state.showAddMedicament}
                    onCancel={() => this.setState({ showAddMedicament: false })}
                    onSave={this.AddMedicament}
                />
                <View style={styles.header}>
                    <Text style={styles.title}>{today}</Text>
                    <Text style={styles.title}>{hospital}</Text>
                </View>

                <View style={styles.body}>
                    <ScrollView>
                        <Text style={styles.title}>Nome do Paciente</Text>
                        <TextInput style={styles.input}
                            placeholder="Ex: João da Silva"
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomWidth: 0.5,
                            borderBottomColor: commonStyles.colors.primary
                        }}>
                            <View>
                                <Text style={styles.title}>CPF</Text>
                                <TextInput style={{
                                    borderWidth: 1,
                                    borderColor: commonStyles.colors.primary,
                                    borderRadius: 10,
                                    height: 38,
                                    marginBottom: 7,
                                    width: 150
                                }}
                                    placeholder="Ex: 66666666666"
                                />
                            </View>
                            <View>
                                <Text style={styles.title}>Cartão do SUS</Text>
                                <TextInput style={{
                                    borderWidth: 1,
                                    borderColor: commonStyles.colors.primary,
                                    borderRadius: 10,
                                    height: 38,
                                    marginBottom: 7,
                                    width: 180
                                }}
                                    placeholder="Ex: 000000000000000"
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.addButton}>
                                <TouchableOpacity style={styles.addIcon}
                                    activeOpacity={0.8}
                                    onPress={() => this.setState({ showAddMedicament: true })}
                                >
                                    <Icon name="plus" size={15}
                                        color={commonStyles.colors.secondary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 5 }}
                                    activeOpacity={0.8}
                                    onPress={() => this.setState({ showAddMedicament: true })}
                                >
                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: commonStyles.colors.primary,
                                        fontSize: 18.5
                                    }}>Adicionar Medicamento</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}></View>
                        <View style={styles.containerMed}>
                            <FlatList data={this.state.medicaments}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) => <Medicament {...item} />}
                            />
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={styles.buttons}>
                            <Text style={styles.regularText}>Voltar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.buttons}>
                            <Text style={styles.regularText}>Emitir</Text>
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
    header: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: commonStyles.colors.primaryDark,
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        color: commonStyles.colors.primary,
        fontSize: 15
    },
    footer: {
        flex: 0.9,
        paddingHorizontal: 40,
        paddingTop: 12,
        flexDirection: 'row',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: commonStyles.colors.primaryDark
    },
    body: {
        flex: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    buttons: {
        flexDirection: 'row',
        borderColor: commonStyles.colors.primaryDark,
        borderWidth: 1.8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
        height: 40,
        width: 70,
        borderRadius: 15
    },
    regularText: {
        color: commonStyles.colors.secondary,
        fontSize: 15
    },
    input: {
        borderWidth: 1,
        borderColor: commonStyles.colors.primary,
        borderRadius: 10,
        height: 38,
        marginBottom: 7
    },
    addIcon: {
        flexDirection: 'row',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: commonStyles.colors.primaryDark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: 250,
        height: 30,
        borderWidth: 1,
        borderColor: commonStyles.colors.primary,
        borderRadius: 20
    },
    containerMed: {
        borderWidth: 0.5,
        borderColor: commonStyles.colors.primary,
        paddingHorizontal: 15,
        borderRadius: 15,
        height: 290
    }
})