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
import Autocomplete from 'react-native-autocomplete-input';
const API = 'http://198.50.130.238:8080';
const initialState = { name: '', dosage: '', obs: '' }

export default class AddMedicament extends Component {
    constructor(props) {
        super(props);
        //Initialization of state
        //medicamentos will contain the array of suggestion
        //query will have the input from the autocomplete input
        this.state = {
          medicamentos: [],
          query: '',
        };
      }
      componentDidMount() {
        //First method to be called after components mount
        //fetch the data from the server for the suggestion
        fetch(`${API}/medicamentos/`)
          .then(res => res.json())
          .then(json => {
            const { results: medicamentos } = json;
            this.setState({ medicamentos });
            //setting the data in the medicamentos state
          });
      }
      findMed(query) {
        //method called everytime when we change the value of the input
        if (query === '') {
          //if the query is null then return blank
          return [];
        }
    
        const { medicamentos } = this.state;
        //making a case insensitive regular expression to get similar value from the medicamentos json
        const regex = new RegExp(`${query.trim()}`, 'i');
        //return the filtered medicamentos array according the query from the input
        return medicamentos.filter(medicamentos => medicamentos.produto.search(regex) >= 0);
      }


    render() {
        const { query } = this.state;
        const medicamentos = this.findMed(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    //data to show in suggestion
                    data={medicamentos.length === 1 && comp(query, medicamentos[0].produto) ? [] : medicamentos}
                    //default value if you want to set something in input
                    defaultValue={query}
                    /*onchange of the text changing the state of the query which will trigger
                    the findmedicamentos method to show the suggestions*/
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Enter the medicamentos produto"
                    renderItem={({ produto, release_date }) => (
                        //you can change the view you want to show in suggestion from here
                        <TouchableOpacity onPress={() => this.setState({ query: produto })}>
                        <Text style={styles.itemText}>
                            {produto} ({release_date})
                        </Text>
                        </TouchableOpacity>
                    )}
                    />
                    <View style={styles.descriptionContainer}>
                    {medicamentos.length > 0 ? (
                        <Text style={styles.infoText}>{this.state.query}</Text>
                    ) : (
                        <Text style={styles.infoText}>Enter The medicamentos produto</Text>
                    )}
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
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        padding: 16,
        marginTop: 40,
      },
      autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
      },
      descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
      },
      infoText: {
        textAlign: 'center',
        fontSize: 16,
      },
    
})
