import * as React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../Styles';
import SelectDropdown from 'react-native-select-dropdown'


export default function Dropdown() {
    const categories = ["Trending", "Reccomended", "Highest Climbers", "New"]
    return (
        <View style={styles.header_medium}>
            <SelectDropdown 
            data={categories} 
            buttonStyle={{backgroundColor:'grey', borderRadius: 20}} 
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            />
            
        </View>
    )
}