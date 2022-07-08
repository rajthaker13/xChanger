import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button } from 'react-native';
import { styles } from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadImage from '../UploadImage';
//import { S3Image } from 'aws-amplify-react-native';
import { AmplifyS3Image } from '@aws-amplify/ui-react/legacy';
import { Storage } from 'aws-amplify';

//const imgKey = "https://xchangerprojectprofilepictures135732-prod.s3.us-east-2.amazonaws.com/private/us-east-2%3A8eff2a0a-350b-4685-8c21-fda3fa6fff97/demo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4KV5WWP7RSAB6MEA%2F20220706%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220706T171450Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJGMEQCICH2AI1FAGWAuUpOdfX%2F3zU6jC00VnQnbo7CHHp0NPdOAiBaobkGQQY2%2FD5ehg4P7zZTKMZAtBKeEaQBTp4pbnnZMSrNBAjC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg0NzU4MDE0ODczNSIMRz%2Fr7InLmy7PuWi%2FKqEEsRuf1vP7razn9EH40xgLoAJ8mvRLShZWZ0tTv4ZVuVOgx%2BAWxQYZ89%2FOkFgXjjEJyBnNlRq%2BJMIT8G%2F%2BKCxG0sohrptZTpgPPFKBezZiRj1bFHVqhsONxw65kBBPTsEcMtlw0YmsWFMJ9R7utFu4IwqEOsKvLdtao%2BKXgRM81HAy%2FdGsdUrQ5Pd4LcjNbwdFSrE7P2StRkBEfVYs%2BrxqRopxz9LUm1P5gTYZV3s6BCJ%2F5Wct6g%2Bw%2B1oiU2TJgxoF78MBax81i3uN8K0ltlYo74B1uvHC%2F8zIRfPQswF7Xw7Y0v10skr8TK01WJl9cPUGrIzS3FEOXdzbtDPZ23s8O6RXQkutqvGJJZh9q%2FUB8P0PVAZsvMNdvdZcc9zUR99UIiGKuJQm66lyNxVhDaulpdfK3VqH2YN4ishQpiVS7v1d4OYm1JhCLL1VpYqnk4WMX8W%2BLpnYZ9VF0JPnzjyc35LkT9UAY44VI65owgaGqZAOutxALWalxoco4Hw8DFhzoo9ldOyocYSa3J445zHcuzawJ9UKpkLIbklHjSlJWyFDs069fit7sTNLcK2vM7qNOrwUxVZ9512oTyFieBgGqt63Mc%2FdFaUS4LYO6MDcntNQrQ2TSFBf3dtxRfU6RAANJqP8Hswo2EJgUQFhaFUB3TcQ19gmBZtGoGoy03zPK4XSqjU1kMrRoTipTDvIpGG1SCOxb2wtNF%2BN610P1gwxZMswh4aXlgY6hgJXzqoUXZaviIdvjs%2BBFhgMWwJ7pNMgWgqGaIBzBYa4FO9CUwRRS6puJRV%2BsZZPv%2FBEXkYPe4edWHXiDqlN81%2BOyYA48C6s0Ff%2FgWXVNGOYygr%2Bp1n90Fl1CuhdEwEcJKyLeAtDV2ihQbcI3sNv9MfKP4FNfp9p8%2BdXNnW6bN58l7dfwlZyl%2FRoATNRDlQbK8kjCnABV1nlok6n%2FI%2B%2Blqc4zZ4A203AAwhPRLH4tQ6LQ1EjBPhyaaX9JE8oqpGLSo7Y0Gy4dsvJWs0QQ%2B5gKx5t1oJQiYXQdxpimrmyUTEFrQb9VAHTGfa1zOP4FBbhHT4Ct1KPAm461dgsmBhRqM4nJrjRn1kU&X-Amz-Signature=617628548d6c369f25d11c0cd0493583f879eebe5ce67a161e2885e0e481a40f&X-Amz-SignedHeaders=host";

export default function ProfilePicture() {
    const [profile, setProfile] = useState('');

    useEffect(() => {
        fetchImage();
    }, [])

    function fetchImage() {
        const profilePics = [];

        Storage.list('')
            .then(result => {
                console.log("Storage List: " + result)
                result.forEach(item => profilePics.push(item));
                console.log(profilePics)
                processStorageList(result);
            })
            .catch(err => console.log(err));
    }

    function processStorageList(result) {
        let files = []
        let folders = new Set()
        console.log("Storage List Intake: " + result)
        result.forEach(res => {
            if (res.size) {
                files.push(res)
                // sometimes files declare a folder with a / within then
                let possibleFolder = res.key.split('/').slice(0, -1).join('/')
                if (possibleFolder) folders.add(possibleFolder)
            } else {
                folders.add(res.key)
            }
        })
        //setProfile(files[0].key)
        const key = files[0].key;
        getProfile(key);
        console.log("Key: " + files[0].key)
    }

    function getProfile(key) {
        console.log("Get Profile Key: " + key)
        const file = Storage.get(key, {
            level: "public"
        });
        console.log("File: " + file)
        setProfile(profile)
    }

    /*
    <AmplifyS3Image
        imgKey={profile}
    />
    */

    return (
        <View style={styles.profilePictureProfile}>
            <Image source={{ profile }} resizeMode='contain' style={styles.stockCardLogo}></Image>
            <UploadImage></UploadImage>
        </View >
    )
}
//
//<Image src={require('../../assets/images/joesmith.jpeg')} resizeMode='contain' style={styles.stockCardLogo}></Image>