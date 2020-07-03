import React, {Component} from 'react';
import { View } from 'react-native';

export default class ErrorMessage extends Component {
    render() {
        return <View className="errorbox">
            {this.props.texto}
        </View>
            
    }

}

