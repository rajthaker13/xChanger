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
    const quote = props.quote;
    return (
        <View>
            {data != null &&
                <View >
                    <View >
                        <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20 }}>
                            <View>
                                <Image source={{ uri: data.logo }} style={{ width: 100, height: 100, borderRadius: '50%' }}></Image>
                                <Text style={{ color: 'rgb(178,228,114)', fontSize: 24, padding: 10 }}>${quote.c}0</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'right', padding: 10 }}>
                                <Text style={{ color: 'white', fontSize: 28, marginBottom: 10 }}>{data.name} ({data.ticker})</Text>
                                <Text style={{ color: 'white', fontSize: 12, marginBottom: 8 }}>{data.address}, {data.city}, {data.state}, {data.country}</Text>
                                <Text style={{ color: 'white', fontSize: 12, marginBottom: 8 }}>+1 ({data.phone.slice(1, 4)})-{data.phone.slice(4, 7)}-{data.phone.slice(7, 11)}</Text>
                                <Text style={{ color: 'white', fontSize: 12 }}>{data.weburl}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: 'rgb(160,160,160)', borderBottomWidth: 1, padding: 5, width: '90%', alignSelf: 'center' }} />
                </View>
            }
        </View >
    )
}

//<Image source={{ uri: data.logo }} style={{ width: 128, height: 128, borderRadius: '50%' }}></Image>

export default CompanyHeader;