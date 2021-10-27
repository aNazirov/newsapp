import React from 'react'
import Swiper from 'react-native-web-swiper'
import {Text, View, TouchableOpacity} from "react-native";

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Swiper
                        vertical
                        controlsProps={{
                            prevTitle: ' ',
                            nextTitle: ' ',
                            dotProps: {
                                badgeStyle: {backgroundColor: 'transparent'}
                            }
                        }}
                        loop
                        timeout={-2.5}
                    >
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(20,20,200,0.3)"
                        }}>
                            <Text>Slide 1</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(20,200,20,0.3)"
                        }}>
                            <Text>Slide 2</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(200,20,20,0.3)"
                        }}>
                            <Text>Slide 3</Text>
                        </View>
                    </Swiper>
                </View>
            </View>
        )
    }
}