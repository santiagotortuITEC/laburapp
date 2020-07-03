import React, { Component } from 'react';
import { Base64 } from 'js-base64';

import {
    View, Text,
    TextInput, StyleSheet,
    TouchableOpacity,
    NativeModules
} from 'react-native';

// Importar navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Stack para la navegacion
const Stack = createStackNavigator();



export default class RegistrarsePantallaUno extends Component {


    constructor() {
        super();
        this.state = {
            name: '',
            lastname: '',
            dni: '',
            phone: '',
            email: '',
            address: '',
            password: '',
            confirmPassword: '',
            camposVacios: '',
            errorNombre: '',
            errorDni: '',
            errorApellido: '',
            errorTelefono: '',
            errorEmail: '',
            errorPassword: '',
            errorDireccion: '',
            correcto: '',
            validarEmail: false,
            visiblePantalla1: true,
            visiblePantalla2: false,
            visiblePantalla3: false,
            emailsUso: []
        }
    }

    // Validacion email

    validarEmail() {

        fetch('http://localhost:3030/usuarios')
            .then((response) => response.json())
            .then((json) => {
                json.data.forEach(element => {
                    this.state.emailsUso.push(element.email);
                });
            })
            .catch((error) => {
                console.log(error)
            })


        return this.state.emailsUso

    }






    // Validacion password
    validarPassword() {

        let passwordValida = false
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;

        if (password.length > 5 && password.length < 15) {

            if (password == confirmPassword) {
                passwordValida = true
                this.setState({ errorPassword: '' })
            } else {
                passwordValida = false
                this.setState({ errorPassword: 'Las contraseñas no coinciden' })
            }

        } else {
            passwordValida = false
            this.setState({ errorPassword: 'Contraseña inválida' })
        }

        return passwordValida

    }

    // Validar nombre
    validarNombre() {

        let nombreValido = false
        let rjx = /^[a-zA-Z]+$/;

        nombreValido = rjx.test(this.state.name);
        if (!nombreValido || this.state.name.length < 2) {
            nombreValido = false
            this.setState({ errorNombre: "Dato inválido." })
        } else {
            nombreValido = true
            this.setState({ errorNombre: "" })
        }

        return nombreValido

    }

    // Validar apellido
    validarApellido() {

        let apellidoValido = false
        let rjx = /^[a-zA-Z]+$/;

        apellidoValido = rjx.test(this.state.lastname);
        if (!apellidoValido || this.state.lastname.length < 2) {
            apellidoValido = false
            this.setState({ errorApellido: "Dato inválido." })
        } else {
            apellidoValido = true
            this.setState({ errorApellido: "" })
        }

        return apellidoValido

    }

    // Validar telefono
    validarTelefono() {

        let telefono = this.state.phone
        let validarTelefono = false

        if (telefono.length > 5 || telefono.length < 12) {
            validarTelefono = true
            this.setState({ errorTelefono: "" })
        } else {
            validarTelefono = false
            this.setState({ errorTelefono: "Dato inválido." })

        }

        return validarTelefono

    }

    // Validar dni
    validarDni() {

        let dni = this.state.dni
        let validarDni = false

        if (dni.length == 8 || dni.length == 7) {
            validarDni = true
            this.setState({ errorDni: "" })
        } else {
            validarDni = false
            this.setState({ errorDni: "Dato inválido." })

        }

        return validarDni

    }


    // Validar direccion
    validarDireccion() {

        let direccion = this.state.address
        let direccionValida = false

        if (direccion.length > 4) {
            direccionValida = true
            this.setState({ errorDireccion: "" })
        } else {
            direccionValida = false
            this.setState({ errorDireccion: "Dato inválido." })

        }

        return direccionValida

    }


    validarPantallaUno() {
        if (this.validarApellido() && this.validarNombre() && this.validarDni()) {
            this.setState({
                visiblePantalla1: false,
                visiblePantalla2: true,
                visiblePantalla3: false,
            });
        }
    }

    validarPantallaDos() {
        if (this.validarTelefono() && this.validarDireccion()) {
            this.setState({
                visiblePantalla1: false,
                visiblePantalla2: false,
                visiblePantalla3: true,
            });
        }
    }

    submitRegistrarse() {


        if (this.validarPassword()) {

            let continuar = true 

            let emailsRegistrados = this.validarEmail();
            console.log('emailsRegistrados', emailsRegistrados)

            emailsRegistrados.forEach(email => {

                console.log('email-->', email)
                console.log('this.state.email-->', this.state.email)
                if (email == this.state.email) {
                    this.setState({ validarEmail: false })
                    console.log('ENTRO USO')

                    this.setState({ errorEmail: 'Email en uso' })
                    continuar = false
                    return
                }
            });


            if (continuar) {
                if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(this.state.email)) {
                    this.setState({ errorEmail: '' })
                    this.setState({ validarEmail: true })
    
    
                    this.setState({ correcto: "Bienvenido" })
                    this.setState({ camposVacios: "" })
    
                    let collection = {}
                    collection.name = this.state.name,
                        collection.lastname = this.state.lastname,
                        collection.phone = this.state.phone,
                        collection.password = this.state.password,
                        collection.email = this.state.email
                    console.log(collection);
    
                    var url = 'http://localhost:3030/usuarios';
                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(collection),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    }).then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => console.log('Success', response));
    
                    // setTimeout(function () {
                    //      window.location.reload(1);
                    // }, 2000);
    
    
    
                } else {
                    this.setState({ validarEmail: false })
                    this.setState({ errorEmail: 'Email inválido' })
                }
    
        
            }
            





        } else {

            this.setState({ camposVacios: "Algo anduvo mal." })

        }


    }


    render() {
        return (
            <View style={styles.container}>

                {this.state.visiblePantalla1 ?

                    <View>
                        <Text style={styles.header}> Paso 1</Text>

                        <TextInput
                            placeholder="Nombre"
                            maxLength={20}
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                            onBlur={e => this.validarNombre()}

                        />
                        <Text style={styles.msgError}>{this.state.errorNombre}</Text>

                        <TextInput
                            placeholder="Apellido"
                            style={styles.input}
                            maxLength={20}
                            onChangeText={(text) => { this.setState({ lastname: text }) }}
                            onBlur={e => this.validarApellido()}

                        />
                        <Text style={styles.msgError}>{this.state.errorApellido}</Text>

                        <TextInput
                            placeholder="DNI"
                            keyboardType="numeric"
                            style={styles.input}
                            maxLength={8}
                            onChangeText={(text) => { this.setState({ dni: text }) }}
                            onBlur={e => this.validarDni()}

                        />
                        <Text style={styles.msgError}>{this.state.errorDni}</Text>

                        <TouchableOpacity
                            onPress={() => this.validarPantallaUno()}
                            style={styles.btn}>
                            <Text style={styles.btntext}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>

                    : null}

                {this.state.visiblePantalla2 ?


                    <View>
                        <Text style={styles.header}> Paso 2</Text>

                        <TextInput
                            placeholder="Telefono"
                            keyboardType="numeric"
                            maxLength={12}
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ phone: text }) }}
                            onBlur={e => this.validarTelefono()}
                        />
                        <Text style={styles.msgError}>{this.state.errorTelefono}</Text>

                        <TextInput
                            placeholder="Direccion. Ej: San Juan 70"
                            maxLength={25}
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ address: text }) }}
                            onBlur={e => this.validarDireccion()}
                        />
                        <Text style={styles.msgError}>{this.state.errorDireccion}</Text>

                        <TouchableOpacity
                            onPress={() => this.validarPantallaDos()}
                            style={styles.btn}>
                            <Text style={styles.btntext}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>

                    : null}

                {this.state.visiblePantalla3 ?

                    <View>
                        <Text style={styles.header}> Paso 3</Text>
                        <Text style={styles.msgSuccess}>{this.state.correcto}</Text>

                        <TextInput
                            placeholder="Email"
                            maxLength={55}
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            onBlur={e => this.validarEmail()}
                        />
                        <Text style={styles.msgError}>{this.state.errorEmail}</Text>

                        <TextInput
                            placeholder="Contraseña"
                            style={styles.input}
                            maxLength={15}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ password: Base64.encode(text) }) }}
                        />

                        <TextInput
                            placeholder="Confimar contraseña"
                            style={styles.input}
                            maxLength={15}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ confirmPassword: Base64.encode(text) }) }}
                            onBlur={e => this.validarPassword()}

                        />
                        <Text style={styles.msgError}>{this.state.errorPassword}</Text>

                        <TouchableOpacity
                            onPress={() => this.validarEmail()}
                            onPress={() => this.submitRegistrarse()}
                            style={styles.btn}>
                            <Text style={styles.btntext}>Registarse</Text>
                        </TouchableOpacity>
                    </View>

                    : null}


            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#256898',
        paddingLeft: 60,
        paddingRight: 60
    },
    header: {
        fontSize: 24,
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
        borderBottomColor: '#f8f8f8',
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
