import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

const styles = StyleSheet.create(
    {
        container: {
            padding:20,
            flexDirection: 'row',
            alignItems:'center'
        }
    }
)
export const Row = props => (
    <TouchableOpacity style={styles.container} onPress={props.OnPress} >
        <View>
           <Image
          style={{width: 60, height: 60}}
          source={{uri: props.ImgUrl}}
        /> 
        </View>
        
        <View style={{paddingLeft: 10}}>
            <Text>{props.Title}</Text>
            <Text>{props.Year} ({props.Type})</Text>
        </View>
    </TouchableOpacity>
)