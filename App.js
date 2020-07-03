import React from 'react';
import {
    StyleSheet, Text, View,
    TextInput, Button,TouchableOpacity, Image
} from 'react-native';

// Importar navigation
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
// Importar componentes
import RegistrarFacebook from './componentes/RegistrarFacebook';
import RegistrarsePantallaUno from './componentes/RegistrarsePantallaUno';
import IniciarSesion from './componentes/IniciarSesion';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';

// Los 3 botones ...
function HomeScreen ({navigation}) {
  return(
        <View style={styles.container}>
          
          <Image
          style={styles.logo}
          source={require('./assets/logo.png')}
          />

          <View style={styles.body}>

            <TouchableOpacity
                onPress={() => navigation.navigate('IniciarSesion')}
                style={styles.btn}>
                <Text style={styles.btntext}>Iniciar Sesion</Text>
            </TouchableOpacity>

            
            <TouchableOpacity
                onPress={() => navigation.navigate('Registrarse')}
                style={styles.btn}>
                <Text style={styles.btntext}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('RegistrarseFacebook')}
                style={styles.btnFacebook}>
                <Text style={styles.btntext}>Iniciar con Facebook</Text>
            </TouchableOpacity>
            
          </View>
        </View>
  )
}

// Si se elige Facebook ...
function RegisterFacebookScreen () {
  return(
    <View style={styles.container}>
        <RegistrarFacebook></RegistrarFacebook>
    </View>
  )
}

// Si se elige registarse con Laburapp ...
function RegisterScreen () {
  return(
        <RegistrarsePantallaUno></RegistrarsePantallaUno>
  )
}

// Si se elige Iniciar Sesion ...
function LoginScreen () {
  return(
    <View style={styles.container}>
        <IniciarSesion></IniciarSesion>
    </View>
  )
}


// Navegacion
const Stack = createStackNavigator()
export default function App() {

    return (
      <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Registrarse" component={RegisterScreen} />
              <Stack.Screen name="RegistrarseFacebook" component={RegisterFacebookScreen} />
              <Stack.Screen name="IniciarSesion" component={LoginScreen} />
            </Stack.Navigator>
      </NavigationContainer>
    )
}


// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%",
        paddingBottom: "2%",
        paddingLeft: '2%',
        paddingRight: '2%',
        backgroundColor: '#256898',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        width: '100%',
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: '#199187',
        borderBottomWidth: 1
    },
    logo: {
      marginBottom: '5%',
      width: 200,
      height: 200,
    },
    btn: {
        width: '60%',
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#A2BECA',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
        marginRight: '20%',
        marginLeft:'20%',
    },
    btnFacebook: {
        width: '60%',
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#3b5998',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
        marginRight: '20%',
        marginLeft:'20%',
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
})
