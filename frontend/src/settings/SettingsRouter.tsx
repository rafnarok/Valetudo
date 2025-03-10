import {Route, Switch} from "react-router";
import {useRouteMatch} from "react-router-dom";
import MapManagement from "./MapManagement";
import EditMapPage from "../map/EditMapPage";
import {useCapabilitiesSupported} from "../CapabilitiesProvider";
import {Capability} from "../api";
import MQTTConnectivity from "./connectivity/MQTTConnectivity";
import Connectivity from "./connectivity/Connectivity";
import NTPConnectivity from "./connectivity/NTPConnectivity";
import AuthSettings from "./connectivity/AuthSettings";
import WifiConnectivity from "./connectivity/WifiConnectivity";

const SettingsRouter = (): JSX.Element => {
    const {path} = useRouteMatch();

    const [
        wifiConfigurationCapabilitySupported,

        combinedVirtualRestrictionsCapabilitySupported,

        mapSegmentEditCapabilitySupported,
        mapSegmentRenameCapabilitySupported
    ] = useCapabilitiesSupported(
        Capability.WifiConfiguration,

        Capability.CombinedVirtualRestrictions,

        Capability.MapSegmentEdit,
        Capability.MapSegmentRename
    );


    return (
        <Switch>
            <Route exact path={path + "/map_management"}>
                <MapManagement/>
            </Route>

            {
                (mapSegmentEditCapabilitySupported || mapSegmentRenameCapabilitySupported) &&
                <Route exact path={path + "/map_management/segments"}>
                    <EditMapPage
                        mode={"segments"}
                    />
                </Route>
            }
            {
                combinedVirtualRestrictionsCapabilitySupported &&
                <Route exact path={path + "/map_management/virtual_restrictions"}>
                    <EditMapPage
                        mode={"virtual_restrictions"}
                    />
                </Route>
            }
            <Route exact path={path + "/connectivity"}>
                <Connectivity/>
            </Route>
            <Route exact path={path + "/connectivity/auth"}>
                <AuthSettings/>
            </Route>
            <Route exact path={path + "/connectivity/mqtt"}>
                <MQTTConnectivity/>
            </Route>
            <Route exact path={path + "/connectivity/ntp"}>
                <NTPConnectivity/>
            </Route>
            {
                wifiConfigurationCapabilitySupported &&
                <Route exact path={path + "/connectivity/wifi"}>
                    <WifiConnectivity/>
                </Route>
            }
            <Route path="*">
                <h3>Unknown route</h3>
            </Route>
        </Switch>
    );
};

export default SettingsRouter;
