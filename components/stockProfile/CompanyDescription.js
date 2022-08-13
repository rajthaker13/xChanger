import React from "react";
import { View, Text } from "react-native";

const CompanyDescription = (prop) => {

    const data = prop.data

    return (
        <View>{data != null &&
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 14, color: 'rgb(160,160,160)' }}>{data.description}</Text>
            </View>}
        </View>
    )
}

export default CompanyDescription;