import { View, Text, Pressable,FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, addEnglish, addVietnamese } from '../rtk/userSlice';
import store from '../rtk/store';

const Home = ({navigation, route}) => {
    console.log('Store: ',store.getState())
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [thongTin, setThongTin] = useState(route.params)
    const {english} = route.params;
    
    const handleUpdateViet = () => {
        if(inputV===''){
            console.log("Vui lòng nhập")
            return;
        }
        const updatedUserData = {
            id: user.id,
            username: user.username,
            password: user.password,
            english: user.english,
            vietnamese: user.vietnamese,
        };
        dispatch(addVietnamese({value: inputV}))
        setInputV('')
    };

    fetch(`https://6540bd5245bedb25bfc27ba1.mockapi.io/api/lab7/apiTakeNote/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
    })
    .then(() => {
            
    })
    .catch((error) => console.error(error));

    
    const handleUpdateEnglish = () => {
        const updatedUserData = {
            id: user.id,
            username: user.username,
            password: user.password,
            english: user.english, // Updated array with the new English word
            vietnamese: user.vietnamese,
        };
        dispatch(addEnglish({value: inputE}))
        fetch(`https://6540bd5245bedb25bfc27ba1.mockapi.io/api/lab7/apiTakeNote/${updatedUserData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        })
        .then(() => {
            
        })
        .catch((error) => console.error(error));

        setInputE('')
    };

    const [inputE, setInputE] = useState('')
    const [inputV, setInputV] = useState('')
    return (
        <View style={{flex:1}}>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <View style={{borderWidth:1, height:400, width:'40%', alignItems:'center'}}>
                    <Text>Từ điển tiếng anh</Text>
                    <FlatList 
                        data={user.english}
                        renderItem={({item})=>{
                            return (
                                <Text>{item.value}</Text>
                            )
                        }}
                    />
                </View>
                <View style={{borderWidth:1, height:400, width:'40%', alignItems:'center'}}>
                    <Text>Từ điển tiếng việt</Text>
                    <FlatList 
                        data={user.vietnamese}
                        renderItem={({item})=>{
                            return (
                                <Text>{item.value}</Text>
                            )
                        }}
                    />
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <TextInput
                    placeholder="Nhập english"
                    style={{fontSize:15, borderWidth:1, padding:10, marginVertical:20, width: 150}}
                    value={inputE}
                    onChangeText={(text)=>{setInputE(text)}}
                />
                <TextInput
                    placeholder="Nhập vietnamese"
                    style={{fontSize:15, borderWidth:1, padding:10, marginVertical:20, width: 150}}
                    value={inputV}
                    onChangeText={(text)=>{setInputV(text)}}
                />
            </View>
            <View style={{justifyContent:'space-around', alignItems: 'center', flexDirection:'row'}}>
                <Pressable 
                    onPress={()=>{handleUpdateEnglish()}}
                    style={{width:100, height:40, justifyContent:'center', alignItems:'center', backgroundColor:'green'}}>
                    <Text>Thêm English</Text>
                </Pressable>
                <Pressable 
                    onPress={()=>{handleUpdateViet()}}
                    style={{width:100, height:40, justifyContent:'center', alignItems:'center', backgroundColor:'green'}}>
                    <Text>Thêm Việt</Text>
                </Pressable>
            </View>
            <View style={{justifyContent:'center', alignItems: 'center', marginTop: 40}}>
                <Pressable 
                    onPress={()=>{
                        dispatch(logoutUser());
                        navigation.navigate('Login');
                    }}
                    style={{width:100, height:40, justifyContent:'center', alignItems:'center', backgroundColor:'red'}}>
                    <Text>Đăng xuất</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Home