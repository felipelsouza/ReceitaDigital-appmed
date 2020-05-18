import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'

import commonStyles from '../commonStyles'

export default class AutoCompleteText extends Component {
    constructor(props) {
        super(props)
        this.items = [
            'Dipirona',
            'Clororquina',
            'Maconha da boa',
            'Anador',
            'Novalgina',
            'Doril'
        ]
        this.state = {
            suggestions: [],
            text: ''
        }
    }

    onTextChanged = (e) => {
        const value = e
        let suggestions = []
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i')
            suggestions = this.items.sort().filter(v => regex.test(v))
        }
        this.setState(() => ({ suggestions, text: value }))
    }

    suggestionsSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: []
        }))
    }

    renderSuggestions() {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        }
        return (
            <ScrollView>
                {suggestions.map((item) => <Text key={item} onPress={() => this.suggestionsSelected(item)}>{item}</Text>)}
            </ScrollView>
        )
    }

    render() {
        const { text } = this.state

        return (
            <View>
                <TextInput
                    value={text}
                    placeholder={'Ex: Dipirona'}
                    onChangeText={(text) => this.onTextChanged(text)}
                />
                {this.renderSuggestions()}
            </View>
        )
    }
}

const styles = StyleSheet.create({

})