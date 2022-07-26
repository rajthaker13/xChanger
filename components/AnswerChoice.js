import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';


export default function AnswerChoice(props) {
    let isSelected = false;
    return (
        <TouchableOpacity
            style={{
                borderWidth: 3,
                height: 60, borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10
            }}
        >
            <Text style={{ fontSize: 20, color: COLORS.white }}>{option}</Text>
        </TouchableOpacity>
    );
}