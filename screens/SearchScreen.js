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
export default function SearchScreen() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);
    return (
      <ScrollView style={{backgroundColor:'#0A0909'}}>
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
            data={fakeData}
            setClicked={setClicked}
          />

      }
      <Dropdown/>
      <StockSlide/>
      <XChangerNews/>
      </ScrollView>
    )
  }