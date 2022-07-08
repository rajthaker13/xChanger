import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import * as Clipboard from "expo-clipboard";
//import { styles } from '../../Styles';
import Constants from "expo-constants";
//import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function UploadImage() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const cameraRollStatus =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
            }
        })();
    }, []);

    //PICK IMAGE FUNCTION
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            aspect: [4, 3],
            quality: 1,
        });

        handleImagePicked(result);
    };

    const handleImagePicked = async (pickerResult) => {
        console.log("Handling Picked Image")
        try {
            if (pickerResult.cancelled) {
                alert("Upload cancelled");
                return;
            } else {
                const img = await fetchImageFromUri(pickerResult.uri);
                const uploadUrl = await uploadImage("demo.jpg", img);
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed");
        }
    };

    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const uploadImage = (filename, img) => {
        Auth.currentCredentials();
        return Storage.put(filename, img, {
            level: "public",
            contentType: "image/jpeg",
        })
            .then((response) => {
                return response.key;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            });
    };

    return (
        <View>
            <Button onPress={pickImage} title="Pick Image from Camera Roll" />
        </View>
    );
}

//

/*
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

<Pressable style={styles.button} onPress={pickImage}>
                <Text stlye={styles.text}>
                    Upload Picture
                </Text>
            </Pressable>
*/

export default UploadImage;