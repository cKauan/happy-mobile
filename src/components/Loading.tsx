import React from "react";
import { View, ActivityIndicator, Image, StyleSheet } from "react-native";
import HappyImage from "../assets/map-marker.png";

const Loading = () => {
    return (
        <View style={styles.container}>
            <Image source={HappyImage} style={{ marginBottom: 20 }} />
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#15C9D6",
    },
});


export default Loading;
