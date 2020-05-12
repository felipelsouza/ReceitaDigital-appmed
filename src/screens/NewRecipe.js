import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
    Platform,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

import { TextInputMask } from 'react-native-masked-text'

import AddMedicament from './AddMedicament'
import Medicament from '../components/Medicament'
import ConfirmRecipe from './ConfirmRecipe'

import api from '../services/api'

import moment from 'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'

const initialState = {
    showMedicaments: true,
    showAddMedicament: false,
    showConfirmRecipe: false,
    medicaments: [],
    visibleMedicaments: [],
    date: new Date(),
    showDatePicker: false,
    recipe: [],
    cartaoSus: '',
    cpf: '',
    name: ''
}

export default class NewRecipe extends Component {
    state = {
        ...initialState
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />

        const dateString = moment(this.state.date).locale('pt-br').format('DD/MM/YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.title}>Data de Vencimento</Text>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}
                        activeOpacity={0.8}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
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
        const medicaments = [...this.state.medicaments]
        medicaments.push({
            id: Math.random(),
            name: newMedicament.name,
            dosage: newMedicament.dosage,
            obs: newMedicament.obs
        })

        this.setState({ medicaments, showAddMedicament: false })
    }

    showMedicaments = () => {
        let visibleMedicaments = null
        visibleMedicaments = [...this.state.medicaments]
        this.setState({ visibleMedicaments })
    }

    deleteMedicament = id => {
        const medicaments = this.state.medicaments.filter(medicament => medicament.id !== id)
        this.setState({ medicaments }, this.showMedicaments)
    }

    handleConfirmPress = async () => {
        if (this.state.name === '' ||
            this.state.cpf === '' ||
            this.state.cartaoSus === '' ||
            this.state.medicaments == '') {
            Alert.alert('Não foi possível emitir a Receita', 'É necessário preencher todos os dados!')
            return
        } else {
            try {
                //this.setState({ showConfirmRecipe: true })
                const cpfParsed = this.state.cpf.replace(/[^0-9]/g, "")
                const arr = this.state.medicaments
                const namesJSON = JSON.stringify(arr)
                const response = await api.post('/receitas', {
                    NOME_PACIENTE_RECEITA: this.state.name,
                    CPF_PACIENTE_RECEITA: cpfParsed,
                    CARTAO_SUS_PACIENTE: this.state.cartaoSus,
                    MEDICAMENTO_RECEITA: namesJSON,
                    DOSAGEM: this.state.medicaments.dosage,
                    DATA_RECEITA: this.state.date,
                    OBS_RECEITA_PACIENTE: this.state.medicaments.obs
                })

                Alert.alert('Receita enviada!')
            } catch (e) {
                Alert.alert('Erro ao enviar receita!', `${e}`)
            }
        }
    }

    render() {
        const today = moment().locale('pt-br').format('DD/MM/YYYY')
        const hospital = "Receita Digital"

        return (
            <View style={styles.container}>
                <AddMedicament isVisible={this.state.showAddMedicament}
                    onCancel={() => this.setState({ showAddMedicament: false })}
                    onSave={this.addMedicament}
                />
                <ConfirmRecipe isVisible={this.state.showConfirmRecipe}
                    onCancel={() => this.setState({ showConfirmRecipe: false })}
                />
                <View style={styles.header}>
                    <Text style={styles.title}>{hospital}</Text>
                    <Text style={styles.title}>{today}</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.title}>Nome do Paciente</Text>
                    <TextInput style={styles.input}
                        placeholder="Ex: João da Silva"
                        value={this.state.name}
                        onChangeText={text => { this.setState({ name: text }) }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 0.5,
                        borderBottomColor: commonStyles.colors.primary
                    }}>
                        <View>
                            <Text style={styles.title}>CPF</Text>
                            <TextInputMask
                                type={'cpf'}
                                value={this.state.cpf}
                                onChangeText={text => { this.setState({ cpf: text }) }}
                                style={{
                                    borderWidth: 1,
                                    borderColor: commonStyles.colors.primary,
                                    borderRadius: 10,
                                    height: 38,
                                    marginBottom: 7,
                                    width: 150
                                }}
                                placeholder="Ex: 000.000.000-00"
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>Cartão do SUS</Text>
                            <TextInput
                                keyboardType='number-pad'
                                maxLength={15}
                                placeholder="Ex: 000000000000000"
                                value={this.state.cartaoSus}
                                onChangeText={text => { this.setState({ cartaoSus: text }) }}
                                style={{
                                    borderWidth: 1,
                                    borderColor: commonStyles.colors.primary,
                                    borderRadius: 10,
                                    height: 38,
                                    marginBottom: 7,
                                    width: 180
                                }}
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
                            renderItem={({ item }) => <Medicament {...item} onDelete={this.deleteMedicament} />}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        {this.getDatePicker()}
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={styles.buttons}>
                            <Text style={styles.regularText}>Voltar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={this.handleConfirmPress}
                    //onPress={() => this.setState({ showConfirmRecipe: true })}
                    >
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
        borderColor: commonStyles.colors.primaryDark,
        backgroundColor: '#FFF'
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
    },
    date: {
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.colors.primaryDark,
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 5,
        width: 128,
        borderColor: commonStyles.colors.primary,
        padding: 8
    }
})