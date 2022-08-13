import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import CompanyHeader from "../components/stockProfile/CompanyHeader";
import CompanyDescription from "../components/stockProfile/CompanyDescription";
import { styles } from "../Styles";
import { ScrollView } from "react-native-gesture-handler";

export default function StockProfileScreen({ route, navigation }) {
    const [companyProfile, setCompanyProfile] = useState();
    const [quote, setQuote] = useState();
    //const { stockName } = route.params;
    useEffect(() => {
        const getData = () => {
            const finnhub = require('finnhub');
            const api_key = finnhub.ApiClient.instance.authentications['api_key'];
            api_key.apiKey = "cbpmtp2ad3ieg7fassc0"
            const finnhubClient = new finnhub.DefaultApi()

            //COMPANY PROFILE
            finnhubClient.companyProfile({ 'symbol': 'AAPL' }, (error, data, response) => {
                console.log(data)
                setCompanyProfile(data);
            });

            //STOCK QUOTE
            finnhubClient.quote("AAPL", (error, data, response) => {
                console.log(data)
                setQuote(data);
            });

        }
        getData();
    }, []);

    return (
        <SafeAreaView style={styles.stockProfilePage}>
            <ScrollView>
                <View>
                    <CompanyHeader data={companyProfile} quote={quote} />
                    <CompanyDescription data={companyProfile} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}