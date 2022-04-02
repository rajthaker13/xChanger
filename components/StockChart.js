import React, { useEffect, useState } from "react";
import { View,Button } from "react-native";
import axios from 'axios'
import '../global';
import {
    LineChart,
  } from "react-native-chart-kit";

const StockChart = (props) => {
    const [stockData, setStockData] = useState([1,3]);
    function getStockData() {
        console.log(props.range);
        var options = {
            method: 'GET',
            url: `https://yfapi.net/v8/finance/chart/${props.stockName}?range=${props.range}&region=US&interval=${props.interval}&lang=en`,
            params: {modules: 'defaultKeyStatistics,assetProfile'},
            headers: {
              'x-api-key': apiKey,
            }
          };
          axios.request(options).then(function (response) {
              const apiResponse = response.data.chart.result;
              if(Array.isArray(apiResponse)) {
                  apiResponse.forEach(stockData => {
                      const data = stockData['indicators']['quote'];
                      setStockData(data[0].close);
                  })
              }
        }).catch(function (error) {
            console.error(error);
        });
    }
    useEffect(() => {
         getStockData();
    }, [props.range])
  return (
    <View>
    <LineChart
    data={{
      datasets: [
        {
          data:stockData
        }
      ]
    }}
    width={props.width} // from react-native
    height={props.height}
    yAxisLabel="$"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#0A0909",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => "#18FE04",
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "0",
        strokeWidth: "20",
        stroke: "red",
      }
    }}
    bezier
    style={{
      borderRadius: 16,
    }}
  />
  </View>
  );
};
export default StockChart;