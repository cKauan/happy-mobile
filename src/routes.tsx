import React from "react";
import { NavigationContainer as Router } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
const Routes = () => {
    return (
        <Router>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="OrphanagesMap" component={OrphanagesMap} />
                <Screen name="OrphanageDetails" component={OrphanageDetails} />
            </Navigator>
        </Router>
    );
};
export default Routes;
