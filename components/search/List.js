import React from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from '../../Styles';

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.list_item}>
    <TouchableOpacity>
      <Text style={styles.list_title}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
    </TouchableOpacity>
  </View>
);

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return null;
    }
    else {
      return <Item name={item.symbol} details={item.description}></Item>
    }
  };

  return (
    <SafeAreaView horizontal={true} style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <ScrollView horizontal={true}>
          <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.symbol}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default List;