import React, {Component} from 'react';
import { View } from 'react-native';

export default class OkMessage extends Component {
    render() {
        return <View className="okbox">
            {this.props.texto}
        </View>
            
    }

}

