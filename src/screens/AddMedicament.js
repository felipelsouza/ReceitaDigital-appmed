import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native'

import api from '../services/api'

import commonStyles from '../commonStyles'

const initialState = {
    name: '',
    dosage: '',
    obs: '',
    text: '',
    suggestions: []
}

export default class AddMedicament extends Component {
    state = {
        ...initialState,
        items: null
    }

    async componentDidMount() {
        await api.get('/medicamentos')
            .then(res => this.setState({ items: res.data }))
        const arr = this.state.items
        var items = arr.map(function (prods) {
            return prods.PRODUTO
        })
        console.log(items)
        this.setState({items: items})
    }

    save = () => {
        const newMedicament = {
            name: this.state.name,
            dosage: this.state.dosage,
            obs: this.state.obs
        }

        this.props.onSave && this.props.onSave(newMedicament)
        this.setState({ ...initialState })
    }

    onTextChanged = (e) => {
        const value = e
        let suggestions = []
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i')
            suggestions = this.state.items.sort().filter(v => regex.test(v))
        }
        this.setState(() => ({ suggestions, name: value }))
    }

    suggestionsSelected(value) {
        this.setState(() => ({
            name: value,
            suggestions: []
        }))
    }

    renderSuggestions() {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        }
        return (
            <ScrollView style={styles.autoCompleteList}>
                {suggestions.map((item) => <Text style={styles.suggestions} key={item} onPress={() => this.suggestionsSelected(item)}>{item}</Text>)}
            </ScrollView>
        )
    }

    render() {
        console.log(this.state.items)
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Adicionar Medicamento</Text>
                    <View style={styles.body}>
                        <Text style={styles.title}>Medicamento</Text>
                        <TextInput style={styles.inputAC}
                            placeholder='Ex: Dipirona'
                            onChangeText={(name) => this.onTextChanged(name)}
                            value={this.state.name}
                        />
                        <View>{this.renderSuggestions()}</View>
                        <Text style={styles.title}>Dosagem</Text>
                        <TextInput style={styles.input}
                            placeholder='Ex: 300 mg de 8 em 8 horas por 3 dias'
                            onChangeText={dosage => this.setState({ dosage })}
                            value={this.state.dosage}
                        />
                        <Text style={styles.title}>Observações</Text>
                        <TextInput style={styles.input}
                            placeholder='Ex: Tomar por mais 3 dias caso a dor persista'
                            onChangeText={obs => this.setState({ obs })}
                            value={this.state.obs}
                        />
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={this.props.onCancel}
                                style={styles.button}
                                activeOpacity={0.8}>
                                <Text style={styles.regularText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}
                                activeOpacity={0.8}
                                onPress={this.save}>
                                <Text style={styles.regularText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
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
        flex: 1,
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
        marginTop: 20
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
        height: 38,
    },
    inputAC: {
        borderWidth: 1,
        borderColor: commonStyles.colors.primary,
        borderRadius: 10,
        height: 38
    },
    regularText: {
        color: commonStyles.colors.secondary,
        fontSize: 15
    },
    title: {
        fontWeight: 'bold',
        color: commonStyles.colors.primary,
        fontSize: 15,
        marginTop: 10
    },
    body: {
        padding: 10
    },
    autoCompleteList: {
        width: '96%',
        marginHorizontal: '2%',
        marginBottom: 3,
        height: 123
    },
    suggestions: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: '#f7fff7',
        borderColor: commonStyles.colors.primaryDark,
        fontSize: 14
    }
})
