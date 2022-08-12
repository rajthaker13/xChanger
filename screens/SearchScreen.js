import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import Background from '../components/Background';
import SearchHeader from '../components/search/SearchHeader';
import SearchBar from '../components/search/SearchBar';
import List from '../components/search/List';
import Dropdown from '../components/search/Dropdown';
import StockSlide from '../components/search/StockSlide';
import '../global';
import XChangerNews from "../components/search/XChangerNews";
import Button from "react-native";
import { ComponentPropsToStylePropsMapKeys } from "@aws-amplify/ui-react";

export default function SearchScreen() {

  //STATES
  const [searchPhrase, setSearchPhrase] = useState("AAPL");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const getData = () => {
      const finnhub = require('finnhub');
      const api_key = finnhub.ApiClient.instance.authentications['api_key'];
      api_key.apiKey = "cbpmtp2ad3ieg7fassc0"
      const finnhubClient = new finnhub.DefaultApi()

      finnhubClient.symbolSearch(searchPhrase, (error, data, response) => {
        const symbols = data.result
        //console.log(symbols)
        setData(symbols)
      });
    };
    getData();
  }, []);

  return (
    <ScrollView horizontal={false} style={{ backgroundColor: '#0A0909' }}>
      <SearchHeader />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {clicked &&
        <List
          searchPhrase={searchPhrase}
          data={data}
          setClicked={setClicked}
        />
      }
      <Dropdown />
      <StockSlide />
      <XChangerNews />
    </ScrollView>
  )
}