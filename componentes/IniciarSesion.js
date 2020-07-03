import React, { Component } from 'react';

import {
    View, Text,
    TextInput, StyleSheet,
    TouchableOpacity,
    NativeModules, Image
} from 'react-native';


export default class IniciarSesion extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            validarLogin: false,
            mensaje: '',
            mensajeOK: ''
        }
    }


    submit() {

        let collection = {}
        collection.password = this.state.password,
            collection.email = this.state.email




        fetch('http://localhost:3030/usuarios')
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.data.forEach(element => {
                    if (element.email == this.state.email && element.password == this.state.password) {
                        console.log('Adentro')
                        this.setState({
                            mensajeOK: 'Bienvenido.',
                            mensaje: '',
                            validarLogin: true
                        })

                        // Lo mando a HOME
                        setTimeout(function(){
                            window.location.reload(1);
                         }, 2000);
        
                    } else {
                        console.log('Afuera')
                        this.setState({
                            mensaje: 'Datos inválidos.',
                            mensajeOK: '',
                            validarLogin: false
                        })
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            })





    }


    render() {
        return (
            <View  >
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />    
                <View  >

                    <Text style={styles.header}> Iniciar Sesion </Text>


                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        maxLength={55}
                        onChangeText={(text) => { this.setState({ email: text }) }}
                    />

                    <TextInput
                        placeholder="Contraseña"
                        style={styles.input}
                        maxLength={15}
                        secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ password: Base64.encode(text) }) }}
                    />

                    <Text style={styles.msgError}>{this.state.mensaje}</Text>
                    <Text style={styles.msgSuccess}>{this.state.mensajeOK}</Text>

                    <TouchableOpacity
                        onPress={() => this.submit()}
                        style={styles.btn}>
                        <Text style={styles.btntext}>Iniciar Sesion</Text>
                    </TouchableOpacity>



                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({

    logo: {
        width: 200,
        height: 200,
        marginBottom: 50,

    },
    header: {
        fontSize: 24,
        alignItems: 'center',
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1
    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#A2BECA',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        placeholderTextColor: '#fff',
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },
    msgError: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'red',
    },
    msgSuccess: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green',
    }
})

