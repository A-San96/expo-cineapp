import React, { Component } from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {fetchMovieInfo} from '../Api'


const styles= StyleSheet.create({
    row : {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    img : {
        alignItems:'center',
        marginTop: 10,
    },
    title: {
        fontSize: 35,
        fontWeight: '700'
    },


})

export default class ScreenMovieInfo extends Component {

    state = {
        movieInfo: "" ,
    }
    async componentDidMount() {
        const data = await fetchMovieInfo(this.props.navigation.getParam('id', 'NO'))
        this.setState({movieInfo: data})

    }

    getTitle = () => {
        const movieTitle = JSON.stringify(this.props.navigation.getParam('title', 'Movie Info'))
        return movieTitle
    }

    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            title: navigation.getParam('title', 'Movie Info')  ,
            headerStyle: {
            backgroundColor: navigationOptions.headerTintColor,
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000',
            headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20

            },
        }
    }

    



    render() {
        console.log(this.props.navigation.getParam('title', 'NO'))
        console.log(this.state.movieInfo)
        return(
            <View>
                <View style={styles.img}>
                    <Image
                    style={{width: 300, height: 300}}
                    source={{uri: this.state.movieInfo.poster}}
                    /> 
                </View>
        
                <View style={styles.row}>
                    <Text style = {styles.title}>{this.state.movieInfo.title}</Text>                  
                </View>
                <View style={styles.row}>
                    <Text style = {styles.year}>({this.state.movieInfo.year}) </Text>
                    <Text>{this.state.movieInfo.rated} | {this.state.movieInfo.runtime}</Text>
                </View>
                <View style={styles.row}>
                    <Text>{this.state.movieInfo.description}</Text>
                </View>
        </View>

        )
    }
}