import { createPathComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet.markercluster';

// Define loose props to allow all cluster options
const MarkerClusterGroup = createPathComponent<L.MarkerClusterGroup, any>(
    ({ children: _c, ...props }, ctx) => {
        const clusterProps: Record<string, any> = {};
        const clusterEvents: Record<string, any> = {};

        // Splitting props and events to different objects
        Object.entries(props).forEach(([propName, prop]) => {
            if (propName.startsWith('on')) {
                clusterEvents[propName] = prop;
            } else {
                clusterProps[propName] = prop;
            }
        });

        const instance = new L.MarkerClusterGroup(clusterProps);

        // Initializing event listeners
        Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
            const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
            // @ts-ignore
            instance.on(clusterEvent, callback);
        });

        return { instance, context: { ...ctx, layerContainer: instance } };
    }
);

export default MarkerClusterGroup;
