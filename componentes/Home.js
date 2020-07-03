import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import {
    View, Text,
    TextInput, StyleSheet,
    TouchableOpacity,
    NativeModules
} from 'react-native';

import RegistrarsePantallaUno from './RegistrarsePantallaUno';
import RegistrarsePantallaDos from './RegistrarsePantallaDos';
import RegistrarsePantallaTres from './RegistrarsePantallaTres';


export default class RegistarseHome extends Component {

    constructor() {
        super();
        this.state = {
            visiblePantalla1: false,
            visiblePantalla2: false,
            visiblePantalla3: false,
        }
    };


    render() {
        return (
            <View style={styles.container}>



                {this.state.visiblePantalla1 ? <RegistrarsePantallaUno></RegistrarsePantallaUno> : null}
                {this.state.visiblePantalla2 ? <RegistrarsePantallaDos></RegistrarsePantallaDos> : null}
                {this.state.visiblePantalla3 ? <RegistrarsePantallaTres></RegistrarsePantallaTres> : null}

                {!this.state.RegistrarsePantallaUno ?

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                              visiblePantalla1: true,
                              visiblePantalla2: false,
                              visiblePantalla3: false,
                            });
                        }}
                        style={styles.btn}>
                        <Text style={styles.btntext}>Siguiente</Text>
                    </TouchableOpacity>
                    : null}

                {!this.state.visibleRegistrarse ?
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                visibleLogin: false,
                                visibleRegistrarse: true,
                                visibleRegistrarseFacebook: false
                            });
                        }}
                        style={styles.btn}>
                        <Text style={styles.btntext}>Registrarse con LaburApp</Text>
                    </TouchableOpacity>
                    : null}

                {!this.state.visibleLogin ?
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                visibleLogin: true,
                                visibleRegistrarse: false,
                                visibleRegistrarseFacebook: false
                            });
                        }}
                        style={styles.btn}>
                        <Text style={styles.btntext}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    : null}


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60
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
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 10,
        marginBottom: 10,
    },
    btnFacebook: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3b5998',
        marginTop: 15,
        marginBottom: 15,
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
    }
})
