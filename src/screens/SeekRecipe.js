import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import commonStyles from '../commonStyles'
export default class SeekRecipe extends Component {    
    state = {
        search: '',
        data: [
            { id: 0, full_name: 'Adilson Junior', med: 'Omeprazol' },
            { id: 1, full_name: 'Adriano Castro', med: 'Dipirona' },
            { id: 2, full_name: 'Felipe Lima', med: 'Azitromicina' },
            { id: 3, full_name: 'Samuel Ximenes', med: 'Metformina' },
            { id: 4, full_name: 'Sandro Matias', med: 'Metformina' },
            { id: 5, full_name: 'Lelipe Fima', med: 'Losartana' },
            { id: 6, full_name: 'X-menes', med: 'Xelocaína' },
            { id: 7, full_name: 'Acriando Dastro', med: 'Cloroquina' },
        ],
      }

      updateSearch = search => {
        this.setState({ search });
      }
      
      renderItem = ({ item }) => (
        <View style={styles.listItem}>
          <Text>{item.full_name}</Text>
          <Text>{item.med}</Text>
        </View>
      );
        
      render() {
        const { search } = this.state;
    
        return (
            <View style={styles.container}>
                <SearchBar
                    style={styles.search}
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