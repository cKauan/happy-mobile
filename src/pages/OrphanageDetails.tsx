import React from "react";
import { Text, View, StyleSheet } from "react-native";

const OrphanageDetails = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello world</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "#0f0f0f",
        letterSpacing: 1,
    },
});
export default OrphanageDetails;
