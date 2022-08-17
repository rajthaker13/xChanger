import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


const DropdownItem = ({ category }) => {
    return (
        <View style={{ width: '100%', borderColor: 'rgb(121, 191, 96)', borderWidth: 1 }}>
            <TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Category Name
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const CompanyInfoDropdown = (props) => {

    const categories = ["News", "Financials"]

    return (
        <View style={{ width: '80%', backgroundColor: '#000000', borderColor: 'rgb(121, 191, 96)', borderWidth: 1, alignSelf: 'center' }}>
            <View>
                {
                    categories.map(() => (
                        <TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                {categories}
                            </Text>
                        </TouchableOpacity>
                    )
                    )}
            </View>
        </View>
    )
}

export default CompanyInfoDropdown;