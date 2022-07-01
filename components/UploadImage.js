import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as ImagePicker from 'react-native-image-picker';
//import { launchImageLibrary } from 'react-native-image-picker'
//import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function UploadImage() {

    launchImageLibrary = async () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        console.log("inside function")

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });

    }

    return (
        <View>
            <Button onPress={() => { console.log("pressed") }} title="Upload Profile" />
            <Button style={{}} onPress={launchImageLibrary} title="Take A Profile Pic" />
        </View>
    );
}

export default UploadImage;

/*
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const cameraRollStatus =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (
                    cameraRollStatus.status !== "granted" ||
                    cameraStatus.status !== "granted"
                ) {
                    alert("Sorry, we need these permissions to make this work!");
                }
            }
        })();
    }, []);

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: "Images",
            aspect: [4, 3],
        });

        this.handleImagePicked(result);
    };

    const pickImage = async () => {
        console.log("button pressed in PickImage")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "photo",
            aspect: [4, 3],
            quality: 1,
        });
        this.handleImagePicked(result);
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            console.log("Handling Imge")
            if (pickerResult.cancelled) {
                alert("Upload cancelled");
                return;
            } else {
                setPercentage(0);
                const img = await fetchImageFromUri(pickerResult.uri);
                const uploadUrl = await uploadImage("demo.jpg", img);
                downloadImage(uploadUrl);
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed");
        }
    };

    const uploadImage = async (filename, img) => {
        console.log("Uploading to S3 Bucket")
        Auth.currentCredentials();
        return Storage.put(filename, img, {
            level: "private",
            contentType: "image/jpeg",
            progressCallback(progress) {
                setLoading(progress);
            },
        })
            .then((response) => {
                return response.key;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            });
    };

    const setLoading = (progress) => {
        const calculated = parseInt((progress.loaded / progress.total) * 100);
        updatePercentage(calculated); // due to s3 put function scoped
    };

    const updatePercentage = (number) => {
        setPercentage(number);
    };

    const downloadImage = (uri) => {
        Storage.get(uri)
            .then((result) => setImage(result))
            .catch((err) => console.log(err));
    };

    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };
    */