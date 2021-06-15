import React, { Component } from 'react'
import {View, FlatList, TextInput, Text, StyleSheet,Button} from 'react-native'
import {Row} from '../components/row'
import {fetchResults, fetchMovieInfo} from '../Api'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:10,
    },
    searchBar: {
        borderColor: '#141414',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft:10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        
    },
    
})
export default class ScreenHome extends Component {
    state = {
        movieSearched : "",
        movies: [], 
        page: 1,
        loadmore: "Load More",
        disableButtonLoad: false,
    }
     
    
    setSearchBarValue = (movieSearched) => {
        this.setState({movieSearched})
    }
    searchButton = async () => {
        this.setState({loadmore: "Load More"})
        this.setState({disableButtonLoad: false})
        this.setState({movies: []})
        await this.setState({page : 1})
        let data = await fetchResults( this.state.page , String(this.state.movieSearched))
        if (data === "No data") {
            this.setState({disableButtonLoad: true})
            this.setState({movies : [{title: "Sorry !!!", poster:"https://www.propertyexpo.com/themes/front_end/images/no-results.jpg",yea:"", type: "No Results",imdbID: ""}]})
        } else {
            this.setState({movies : data})
        }
            
        //}
        //var slt = fetchResults("ava")
        console.log(this.state.movies)
    }

    handleLoadMore = async () => {
        //console.log(this.state.movies)
        //this.setState(prevState => ({page : prevState.page + 1}))
        await this.setState({page : (this.state.page + 1)})
        let data = await fetchResults( this.state.page , String(this.state.movieSearched))
        if ( data=="No data") {
            this.setState({loadmore: "Finished"})
            this.setState({disableButtonLoad: true})
        } else {
           this.setState(prevState => ({movies : [...prevState.movies, ...data]}))
           console.log(this.state.page) 
        }
        console.log(data)
        
    }
    /*fetcha = async (val) => {
        const result = await fetchResults(val)
        return result
    }*/
    info = (val) => {
        let dataMovie = fetchMovieInfo(val)
        return dataMovie
    }

    static navigationOptions = {
        title: 'Movie Browser',
        headerStyle: {
          backgroundColor: '#fff',
          
        },
        headerTintColor: '#000',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize:20,
        },
      };
    
    render() {
         return (
         <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <TextInput style={styles.searchBar} onSubmitEditing={this.searchButton} onChangeText={this.setSearchBarValue} placeholder="Search Your Movie Or Serie" />
                <Button title="Search" onPress={this.searchButton}/>
            </View>
            <FlatList  data={this.state.movies}
            //onEndReached={this.handleLoadMore}
            keyExtractor={(item, index) => index.toString()}
            //onEndReachedThreshold={0.5}
            initialNumToRender={10}
            renderItem= {({item}) => (
                    <Row OnPress={()=>this.props.navigation.navigate('MovieInfo', {id: item.imdbID , title: item.title})} 
                    ImgUrl={item.poster} 
                    Title={item.title} 
                    Year={item.year} 
                    Type={item.type}/>
                    )
            }/>
            <View>
            <Button title={this.state.loadmore} onPress={this.handleLoadMore} disabled={this.state.disableButtonLoad}/>
            </View>  
            
            
        </View>
         )
    }
}
