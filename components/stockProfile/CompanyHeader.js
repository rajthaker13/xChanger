import React from "react";
import {
    Text,
    Image,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { styles } from '../../Styles';

const CompanyHeader = (props) => {
    const data = props.data;
    return (
        <View>
            {data != null &&
                <View>
                    <View >
                        <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 30 }}>
                            <Image source={{ uri: data.logo }} style={{ width: 128, height: 128, borderRadius: '50%' }}></Image>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'right' }}>
                                <Text style={{ color: 'white', fontSize: 28 }}>{data.name} ({data.ticker})</Text>
                                <Text style={{ color: 'white', fontSize: 12 }}>{data.address}, {data.city}, {data.state}, {data.country}</Text>
                                <Text style={{ color: 'white', fontSize: 12 }}>{data.phone}</Text>
                                <Text style={{ color: 'white', fontSize: 12 }}>{data.weburl}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </View >
    )
}

//<Image source={{ uri: data.logo }} style={{ width: 128, height: 128, borderRadius: '50%' }}></Image>

export default CompanyHeader;