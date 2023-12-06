import { View, Text, Pressable, TextInput, Alert  } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../rtk/userSlice';

const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        fetch('https://6540bd5245bedb25bfc27ba1.mockapi.io/api/lab7/apiTakeNote')
          .then((response) => response.json())
          .then((userData) => {
            const foundUser = userData.find(user => user.username === username && user.password === password);
            if (foundUser) {
              dispatch(loginUser(foundUser)); // Dispatch the loginUser action with user data
              //navigation.navigate('Home', {userTimDuoc: foundUser})
              navigation.navigate('Home', {foundUser})
            } else {
              Alert.alert("Thông báo", "Sai mật khẩu")
              console.log("Sai mat khau")
            }
          })
          .catch((error) => {
            console.error(error);
            console.log("Lỗi rồi")
          });
      };


    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor:'#53B5A6'}}>
            <Text style={{fontSize:50, color:"#ffff"}}>Login</Text>
            <TextInput 
                placeholder="Username"
                style={{fontSize:20, borderWidth:1, marginTop:20, padding:10}}
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput 
                placeholder="Password"
                style={{fontSize:20, borderWidth:1, marginVertical:20, padding:10}}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Pressable 
                onPress={handleLogin}
                style={{width:"64%", height:40, justifyContent:'center', alignItems: 'center', backgroundColor:'#ffff'}}>
                    <Text style={{fontSize:20, color:"#53B5A6"}}>Login</Text>
            </Pressable>
        </View>
    )
}

export default Login