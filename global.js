import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

global.width = width;
global.height = height;
global.apiKey = 'fKJlZTpGdnaIYVpOdnEIz3vRw3qikdZz8Hp6HI8W';
global.baseURL = 'https://yfapi/net';