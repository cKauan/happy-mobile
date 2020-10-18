import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapMarker from "../assets/map-marker.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import Api from "../services/Api";

interface Orphanage {
    id: number;
    latitude: string;
    longitude: string;
    name: string;
}
const OrphanagesMap = () => {
    const navigation = useNavigation();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate("OrphanageDetails", { id });
    }
    function handleNavigateToCreateOrphanage() {
        navigation.navigate("SelectMapPosition");
    }
    useFocusEffect(() => {
        Api.get("orphanages").then(({ data }) => {
            setOrphanages(data);
        });
    });

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
                {orphanages.map((orphanage) => (
                    <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        coordinate={{
                            latitude: parseFloat(orphanage.latitude),
                            longitude: parseFloat(orphanage.longitude),
                        }}
                        calloutAnchor={{
                            x: 2.75,
                            y: 0.9,
                        }}
                    >
                        <Callout
                            tooltip
                            onPress={() =>
                                handleNavigateToOrphanageDetails(orphanage.id)
                            }
                        >
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>
                                    {orphanage.name}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {orphanages.length} orfanato(s) encontrados
                </Text>
                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={handleNavigateToCreateOrphanage}
                >
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
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
