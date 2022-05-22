import React from 'react'
import Achivments from '../achviments/achviments';
import ExpBar from '../expBar/expBar';
import UserInfos from '../userInfos/userInfos';
import { ScrollView, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StyleSheet } from 'react-native';

const User = (props) => {


    return (


        <View style={styles.container}>
            <ScrollView>
                <UserInfos logout={props.logout} user={props.user}></UserInfos>
                <ExpBar></ExpBar>
                <Achivments></Achivments>
            </ScrollView>
        </View>


    );

};


const styles = StyleSheet.create({
   
    container:{
        paddingTop: getStatusBarHeight(),
        backgroundColor: 'snow'
    }
    
    
    
})


export default User;