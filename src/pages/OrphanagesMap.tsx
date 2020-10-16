import React from "react";
import {
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapMarker from "../assets/map-marker.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const OrphanagesMap = () => {
    const navigation = useNavigation();
    function handleNavigateToOrphanageDetails() {
        navigation.navigate("OrphanageDetails")
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -4.1285321,
                    longitude: -38.2387858,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
                <Marker
                    icon={mapMarker}
                    coordinate={{
                        latitude: -4.1285321,
                        longitude: -38.2387858,
                    }}
                    calloutAnchor={{
                        x: 2.75,
                        y: 0.9,
                    }}
                >
                    <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Lar do amor</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>2 orfanatos encontrados</Text>
                <TouchableOpacity
                    style={styles.createOrphanageButton}
                    onPress={() => {}}
                >
                    <Feather name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 14,
        justifyContent: "center",
    },
    calloutText: {
        color: "#0089a5",
        fontFamily: "Nunito_700Bold",
        fontSize: 14,
    },
    footer: {
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 32,
        backgroundColor: "#FFF",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
    },
    footerText: {
        color: "#8fa7b3",
        fontFamily: "Nunito_700Bold",
    },
    createOrphanageButton: {
        height: 56,
        width: 56,
        backgroundColor: "#15c3d6",
        justifyContent: "center",
        borderRadius: 20,
        alignItems: "center",
    },
});

export default OrphanagesMap;
