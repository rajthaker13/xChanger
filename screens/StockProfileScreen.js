import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import CompanyHeader from "../components/stockProfile/CompanyHeader";
import { styles } from "../Styles";

export default function StockProfileScreen({ route, navigation }) {
    const [companyProfile, setCompanyProfile] = useState();
    //const { stockName } = route.params;
    useEffect(() => {
        const getData = () => {
            const finnhub = require('finnhub');
            const api_key = finnhub.ApiClient.instance.authentications['api_key'];
            api_key.apiKey = "cbpmtp2ad3ieg7fassc0"
            const finnhubClient = new finnhub.DefaultApi()
            finnhubClient.companyProfile({ 'symbol': 'AAPL' }, (error, data, response) => {
                console.log(data)
                setCompanyProfile(data);
            });
        }
        getData();
    }, []);

    return (
        <SafeAreaView style={styles.stockProfilePage}>
            <View>
                <CompanyHeader data={companyProfile} />
            </View>
        </SafeAreaView>
    )
}