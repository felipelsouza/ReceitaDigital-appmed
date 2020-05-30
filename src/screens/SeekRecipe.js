import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import commonStyles from '../commonStyles'
import api from '../services/api'
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

export default class SeekRecipe extends Component { 
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
      async componentDidMount() {
        await api.get('/receitas')
            .then(res => this.setState({ items: res.data }))
        const arr = this.state.items
        var items = arr.map(function (prods) {
            return prods
        })
        var meds = arr.map(function (prods) {
          return prods.MEDICAMENTO_RECEITA
      })
        console.log(items)
        this.setState({data: items, meds: meds})
    }   
    state = {
        search: '',
        data: null
      }

      updateSearch = search => {
        this.setState({ search });
      }
      
      renderItem = ({ item }) => (
        <View style={styles.listItem}>
          <Text>{item.NOME_PACIENTE_RECEITA}</Text>
          <Text>{item.MEDICAMENTO_RECEITA}</Text>
        </View>
      );
        
      render() {
        const { search } = this.state;
        const today = moment().locale('pt-br').format('DD/MM/YYYY')
        const hospital = "Receita Digital"

        return (
            <View style={styles.container}>
              <View style={styles.header}>
                    <TouchableOpacity style={styles.addIcon} activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name="angle-left" size={15}
                                color={commonStyles.colors.secondary}
                            />
                    </TouchableOpacity>
                    <Text style={styles.title}>{hospital}</Text>
                    <Text style={styles.title}>{today}</Text>
                </View>
                <SearchBar
                    style={styles.search}
                    round
                    inputContainerStyle={{backgroundColor: 'white', color: 'black'}}
                    containerStyle={{backgroundColor: commonStyles.colors.primaryDark}}
                    placeholder="Busque Aqui"
                    onChangeText={this.updateSearch}
                    value={search}
                    onChangeText={text => {
                        this.filterList(text);
                      }}
                      onPressCancel={() => {
                        this.filterList("");
                      }}
                      onPress={() => alert("onPress")}
                />
                <FlatList
                    style={{ marginTop: 30 }}
                    contentContainerStyle={styles.list}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    onEndReached={this.loadRepositories}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        );
      }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyles.colors.primaryDark,
        flex: 1
    },
    header: {
      backgroundColor: 'white',
      flexDirection: 'row',
      padding: 15,
      borderBottomWidth: 1,
      borderColor: commonStyles.colors.primaryDark,
      justifyContent: 'space-between'
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
    listItem: {
      backgroundColor: '#FFF',
      margin: 6,
      padding: 6,
      borderRadius: 5
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
        borderRadius: 15,
        marginBottom: 50
    }
  });