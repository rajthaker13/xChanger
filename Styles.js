import {StyleSheet} from 'react-native';
import './global';

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    start_screen_wrapper: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'column'
    },
    start_screen_logo: {
        maxWidth: 100,
        width:100,
        height:100,
        marginTop: height * .1
    },
    start_screen_description_text: {
        letterSpacing:3,
        color: '#f4f4f4',
        textAlign:'center',
        textTransform: 'uppercase',
        marginTop: height * .01
    },
    start_screen_button_wrapper: {
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        marginTop:100
    },
    start_screen_logo_text: {
        color:'#f4f4f4',
        fontSize:30,
        textAlign:'center',
        fontWeight:'300',
        textTransform:'uppercase',
        letterSpacing:3,
        marginTop: height * .12,
        right: width * .06
    },
    start_screen_title: {
        color:'#f4f4f4',
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
        textTransform:'uppercase',
        letterSpacing:3,
        marginTop: height * .12,
    },
    start_screen_styled_button_normal: {
        width: 250,
        backgroundColor:'#f3f8ff',
        padding:15,
        justifyContent:'center',
        marginBottom:20,
        borderRadius:24,
    },
    start_screen_styled_button_transparent: {
        width: 250,
        backgroundColor:'transparent',
        padding:15,
        borderWidth:1,
        borderColor:'#f3f8ff',
        justifyContent:'center',
        marginBottom:20,
        borderRadius:24,
    },
    start_screen_styled_title_normal: {
        textTransform:'uppercase',
        textAlign:'center',
        fontWeight:"bold",
        letterSpacing:3,
        color:'#666'
    },
    start_screen_styled_title_transparent: {
        textTransform:'uppercase',
        textAlign:'center',
        fontWeight:"bold",
        letterSpacing:3,
        color:'#f3f8ff'
    },


    background: {
        height: height,
        width: width,
        flex: 1,
        alignItems: 'center',
    },
    view: {
        flex: 1, 
        height: height,
        width: width,
        justifyContent:'center',
        alignItems: 'center',
    },
    stockTickerTextUp: {
        fontSize: 15, 
        color:'white',
        fontWeight:'200',
    },
    stockTickerTextDown: {
        fontSize: 15, 
        color:'red',
        fontWeight:'200',
    },
    stockCard: {
        marginTop: height*.2,
        width: width * .9,
        height: height * .62,
        backgroundColor: '#0A0909',
        borderRadius: 20,
        flexDirection: 'column',
        position:'absolute',
        left: -width*.45,
        bottom: -height*.05
    },
    header_large: {
        marginTop: 0,
        height: height * .1,
        width: width,
        backgroundColor: '#0A0909',
        flexDirection: 'row',
        alignItems:'center'
    },
    header_medium: {
        marginTop: 0,
        height: height * .06,
        width: width,
        backgroundColor: '#0A0909',
        alignContent:'center',
        alignItems:'center'
    },
    header_medium_black: {
        marginTop: 0,
        height: height * .06,
        width: width,
        backgroundColor: 'black',
        alignContent:'center',
        alignItems:'center'
    },
    headerText: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center',
        fontWeight: '200',
        marginTop: '3%',
        marginLeft:'35%'
    },
    stockCardLogoContainer: {
        marginTop: 10,
        backgroundColor: '#0A0909',
        width: height * .2,
        height: height * .2,
        borderRadius: height,
        marginLeft: '25%'
    },
    stockCardLogo: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: height,
    },
    stockCardName: {
        marginTop: '2%',
        fontSize: 30,
        color: 'white',
        fontWeight: '200',
        textAlign:'center'
    },
    stockCardPrice: {
        textAlign:'center',
        marginTop: '2%',
        fontSize: 45,
        color: 'white',
        fontWeight: '200',
    },
    container: {
        margin: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "95%",
    
      },
      searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
      },
      searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
      },
      list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
      },
      list_item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
      },
      list_title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
      },
      searchbar_title: {
        width: "100%",
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "10%",
      },
      news_header: {
        marginTop: 0,
        height: height * .06,
        width: width,
        backgroundColor: '#0A0909',
        flexDirection:'row',
        borderColor: 'white',
        borderBottomWidth: 1,
        alignItems: 'center'
      },
      news_header_logo: {
        width: height*.04, 
        height: height*.04,
        marginLeft: width * .05,
      },
      news_header_text: {
          fontSize: 20,
          color: 'white',
          fontWeight:'200',
          right: width * .02
      },
      button_sel: {
        backgroundColor:'grey', 
        height:'15%', 
        width:'20%', 
        alignItems:'center', 
        borderRadius:10
      },
      button_unSel: {
        height:'15%', 
        alignItems:'center', 
        borderRadius:10
      },
      news_slide: {
        marginTop: 0,
        height: height * .15,
        width: width,
        backgroundColor: 'black',
        flexDirection:'row',
        borderColor: 'white',
        borderBottomWidth: 1,

      },
      news_slide_text_view: {
          flexDirection: 'column'

      },
      news_slide_title: {
          color: 'white',
          fontWeight:'bold',
          fontSize: 20,
          textAlign:'center',
          width: undefined,
          marginTop: height * .02
      },
      news_slide_text: {
        color: 'white',
        fontSize: 15,
        textAlign:'center',
        width: width * .6,
        flex:1,
        marginTop: height * .02
    },
    news_slide_pic_container: {
        backgroundColor: 'black',
        width: width * .3,
        height: width * .3,
        marginLeft: width * .1,
        borderRadius:20
    },
      button_text: {
          color:'white',
          fontWeight:'bold',
      },
      stockSlideContainer: {
        backgroundColor:'black', 
        width: '100%', 
        height: 70, 
        borderColor: 'white',
        borderTopWidth:2, 
        borderBottomWidth: 2,
        flex: 1,
        flexDirection: 'row',
    },
      stockSlideLogoContainer: {
        backgroundColor: '#0A0909',
        width: height * .06,
        height: height * .06,
        borderRadius: height,
        marginLeft: '5%',
        marginTop: '2%'
    },
    stockSlideText: {
        marginTop: '5%',
        fontSize: 20,
        color: 'white',
        fontWeight: '200',
        marginLeft: '5%'
    },
    viewSlideText: {
        marginTop: '5%',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '5%'
    },
    xChangerLogoHub: {
        height: '100%',
        width: '20%',
        backgroundColor: '#0A0909',
    },
    hubHeaderText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        right: '30%',
        top: '1%'
    },
    tournamentsHeader: {
        color:'white',
        fontWeight: '600',
        fontSize: 25,
        marginTop: '5%',
        marginLeft: width * .02
    },
    tournamentCards: {
        backgroundColor: '#0A0909',
        height: height * .2,
        width: width * .4, 
        marginRight: width * .1, 
        marginTop: height * .01,
        marginLeft:width * .02,
        marginBottom: height * .02
    },
    tournamentCardLogo: {
        flex:1,
        height: null,
        resizeMode: 'contain',
        width: null,
    },
    tournamentCardName: {
        color: 'white',
        fontSize: 13,
        fontWeight:'bold'
    },
    tournamentCardInfo: {
        color: '#18FE04',
        fontSize: 15,
        fontWeight:'200',
        marginTop: height * .005,
        marginLeft: width * .01
    },
    tournamentCardNumUsers: {
        color: 'white',
        fontSize: 15,
        fontWeight:'200',
        marginTop: height * .005,
        marginLeft: width * .01
    },
    hubPostHeader: {
        marginTop: 0,
        height: 55,
        width: width * .96,
        backgroundColor: '#0A0909',
        alignContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    hubPost: {
        height: 640,
        backgroundColor:'black',
        marginBottom: height * .03
    },
    hubPostImage: {
        height: '70%',
        resizeMode: 'contain',
        width: width * .96,
    },
    hubPostProfilePic: {
        width: 40,
        height: 40,
        backgroundColor:'black',
        borderRadius:40,
        marginTop: 5,
        marginLeft: 10
    },
    profilePicImage: {
        flex:1,
        height: null,
        resizeMode: 'cover',
        width: null,
        borderRadius: 40
    },
    profileNamePost: {
        color:'white',
        fontWeight:'bold',
        fontSize:15,
        marginLeft: 10
    },
    levelContainerPost: {
        backgroundColor: '#18FE04',
        marginLeft:width*.05,
        width: width*.2,
        height:height*.03,
        borderRadius:20,
        alignItems:'center',
    },
    levelTextPost: {
        color:'black',
        fontSize:15,
        marginTop: height * .005
    },
    hubPostProfilePicSmall: {
        width: width * .05,
        height: height*.025,
        backgroundColor:'black',
        borderRadius:40,
        marginTop: 5,
        marginLeft: 10
    },
    hubPostLikedByText: {
        color:'white',
        fontSize:10,
        marginTop: 8,
        fontWeight:'400',
        marginLeft: width * .003
    },
    hubPostLikedByTextBold: {
        color:'white',
        fontSize:10,
        fontWeight:'bold',
        marginTop: 8,
        marginLeft: width * .003
    },
    commentPostHeader: {
        marginTop: 0,
        height: height * .045,
        width: width* .96,
        backgroundColor: '#0A0909',
        marginTop: height * .01,
        flexDirection: 'row'
    },
    hubPostProfilePicMedium: {
        width: 25,
        height: 25,
        backgroundColor:'black',
        borderRadius:40,
        marginTop: 5,
        marginLeft: width * .05
    },
    addCommentTextPost: {
        color:'white',
        fontSize: 15,
        fontWeight:'100',
        marginLeft: width * .03,
        marginTop: 10,
    },
    postTimeText: {
        color:'white',
        fontSize: 9,
        fontWeight:'200',
        marginLeft: width * .03,
    },
    profile_header: {
        marginTop: 0,
        height: height * .06,
        width: width,
        backgroundColor: '#0A0909',
    },
    profileHeaderText: {
        color:'white',
        fontWeight:'bold',
        fontSize:25,
        marginLeft:width*.05,
        marginTop: height * .01
    },
    trophyButtonProfile: {
        marginLeft: width * .72,
        marginTop: -height * .04
    },
    menuButtonProfile: {
        marginLeft: width * .85,
        marginTop: -height * .062
    },
    profilePictureProfile: {
        width: '50%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: height,
        marginLeft:width*.25,
        marginTop: height * .03
    },
    profileStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileStatsText: {
        color:'white',
        fontWeight:'bold',
        fontSize: 20,
        marginHorizontal: width * .2
    },
    profileStatsLabelText: {
        color:'white',
        fontWeight:'200',
        fontSize: 20,
        marginHorizontal: width * .15
    },
    profileLevelContainer: {
        marginTop: 20,
        width: width * .45,
        height: height * .12,
        marginLeft: width *.26,
        backgroundColor: '#0A0909',
        borderRadius:30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileLevelLabelText: {
        color:'white',
        fontWeight:'200',
        fontSize: 15,
        marginTop: height * .025
    },
    profileLevelNumberText: {
        color:'#18FE04',
        fontWeight:'200',
        fontSize: 30,
        marginTop: height * .01
    },
    profilePortfolioHeader: {
        marginTop: height * .02,
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: height * .025,
    },
    profilePortfolioHeaderText: {
        color:'white',
        fontWeight:'400',
        fontSize: 30,
        marginLeft: width * .1
    },
    profilePortfolioViewAllContainer: {
        backgroundColor: "#0E6ACE",
        opacity:74,
        height: height * .04,
        width: width * .3,
        marginRight: width * .1,
        borderRadius: 20
    },
    profilePortfolioSelection: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginHorizontal: '2%', 
        height: height * .05
    },
    profilePortfolioButtonTextSelected: {
        color:'white',
        fontWeight:'300',
        fontSize: 20
    },
    profilePortfolioButtonTextUnselected: {
        color:'white',
        fontWeight:'100',
        fontSize: 20
    },
    profilePortfolioSlideContainer: {
        backgroundColor:'#0A0909',
        width: width,
        height: height*.1,
        borderBottomWidth: 1,
        borderColor:'white',
        flexDirection:'row',
    },
    profilePortfolioSlideInfo: {
        height: height*.1,
        width: width * .3,
        marginLeft: width *.01,
        alignContent: 'center',
        alignItems:'center',
        textAlign:'center'
    },
    profilePortfolioSlideTradeName: {
        color:'white',
        fontSize: 20,
        fontWeight: '400',
        marginTop: height * .02
    },
    profilePortfolioSlideNumShares: {
        color:'white',
        fontSize: 15,
        fontWeight: '200',
    },
    profilePortfolioSlideChartContainer: {
        marginTop: height * .01
    },
    profilePortfolioSlidePriceContainer: {
        backgroundColor: "#18FE04",
        height: height * .04,
        width: width * .25,
        borderRadius: 20,
        marginLeft: width * .04,
        marginTop: height * .025,
        alignItems:'center'
    },
    profilePortfolioSlidePriceText: {
        fontWeight:'bold',
        fontSize: 18,
        marginTop: height *.005
    },
    walletHeader: {
        marginTop: 0,
        height: height * .06,
        width: width,
        backgroundColor: 'black',
        flexDirection:'row'
    },
    walletHeaderText: {
        color:'white',
        fontSize: 25,
        fontWeight:'300',
        marginLeft:width * .05,
        marginTop: height * .01
    },
    walletHeaderAddFundsButton: {
        backgroundColor: "#0E6ACE",
        borderRadius: 20,
        height: height * .035,
        width: width * .25,
        marginTop: height * .013,
        marginLeft: width * .05,
        alignItems:'center',
    },
    walletHeaderAddFundsButtonText: {
        color:'white',
        fontWeight:'bold',
        marginTop:height * .007
    },
    walletChartTotalAmountText: {
        color:'#18FE04',
        fontSize:30,
        fontWeight:'300',
        marginLeft:width * .05,
        marginTop: height * .01
    },
    walletChartTotalAmountArrow: {
        left:width * .055,
        top: height * .01
    },
    walletChartTotalAmountDetailsText: {
        color:'#18FE04',
        fontSize:15,
        fontWeight:'300',
        marginLeft:width * .07,
        marginTop: height * .01
    },
    walletChartTotalAmountTimeText: {
        color:'white',
        fontSize:15,
        fontWeight:'100',
        marginLeft:width * .02,
        marginTop: height * .01
    },
    walletChartLabelContainer: {
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-between',
         marginHorizontal: '15%',
         marginHorizontal: width * .1,
         height: height * .15,
         marginTop: -height * .04
    },
    walletButton_sel: {
        backgroundColor:'grey', 
        height:'15%', 
        width:'15%', 
        alignItems:'center', 
        borderRadius:10
      },
    walletTourneyHeader: {
        marginTop: 0,
        height: height * .08,
        width: width,
        backgroundColor: '#0A0909',
        flexDirection: 'row',
        marginTop:-height*.1,
        alignItems:'center'
    },
    walletTourneyHeaderText: {
        color:'white',
        fontSize: 20,
        marginLeft:width * .2,
        fontSize: 30,
        fontWeight: '200'
    },
    walletTournySlideLogoContainer: {
        marginTop: 10,
        backgroundColor: '#0A0909',
        width: height * .08,
        height: height * .08,
        borderRadius: height,
        marginLeft: width * .05,
        backgroundColor:'white'
    },
    walletTournySlideNameText: {
        color:'white',
        fontSize:15,
        fontWeight:'bold'
    },
    walletTournySlideBuyInText: {
        color:'#18FE04',
        fontSize:15,
        fontWeight:'200',
        marginTop: height * .005
    },
    walletTournySlideWinningsPosText: {
        color:'#18FE04',
        fontSize:15,
        fontWeight:'200',
        marginTop: height * .005,
        marginLeft: width * .02
    },
    walletTournySlideWinningsNegText: {
        color:'red',
        fontSize:15,
        fontWeight:'200',
        marginTop: height * .005,
        marginLeft: width * .02,
    },
    walletTournySlideArrow: {
        marginLeft:width * .15,
        marginTop:height * .04

    },
    textInputContainer: {
        width: '100%',
        marginVertical: 12,
    },
    textInputDescription: {
        fontSize: 13,
        color: '#414757',
        paddingTop: 8,
    },
    textInputError: {
        fontSize: 13,
        color: '#f13a59',
        paddingTop: 8,
      },
      registerRow: {
        flexDirection: 'row',
        marginTop: 4,
      },
      registerLink: {
        fontWeight: 'bold',
        color: '#560CCE',
      }



});

export {styles}