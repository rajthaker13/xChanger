import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../../Styles';
import axios from 'axios';
import '../../global';

export default class XChangerNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        this.getNews()
    }
    getNews() {
        axios.get(`https://stocknewsapi.com/api/v1/category?section=general&items=50&token=${newsAPI}`).then((response) => {
            const responseArray = response.data.data
            let articlesArray = []
            responseArray.forEach((res,index) => {
                if(res.title != null) {
                    const title = res.title
                    const src = res.image_url
                    const source = res.source_name
                    const newArticle = {title: title, src: src, source: source}
                    articlesArray.push(newArticle)

                }

            })
            this.setState((state) => {
                return {
                    articles: articlesArray
                }
            })
        })
    }
    render() {
        return (
            <View>
                <View style={styles.news_header}>
                    <Image source={require('../../assets/images/XChanger.png')} style={styles.news_header_logo}></Image>
                    <Text style={styles.news_header_text}>Changer News</Text>
                </View>
                {this.state.articles.map((article) => {
                    console.log(article.src)
                    return (
                        <View style={styles.news_slide}>
                            <View style={styles.news_slide_text_view}>
                                <Text style={styles.news_slide_title}>{article.source}</Text>
                                <Text style={styles.news_slide_text}>{article.title}</Text>
                            </View>
                            <View style={styles.news_slide_pic_container}>
                                <Image source={{uri: `${article.src}`}} resizeMode='contain' style={styles.stockCardLogo}></Image>
                            </View>
                        </View>
                    );
                })}
            </View>

        )

    }
}
