import React from 'react'
import { View, Text } from 'react-native'
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createPicture } from '../graphql/mutations';
import awsExports from "../aws-exports";

function UploadImage() {

    return (
        <View className="UploadImage">
            <View>
                <Text>Upload a Profile Picture</Text>
            </View>
        </View>
    )
}

export default UploadImage;