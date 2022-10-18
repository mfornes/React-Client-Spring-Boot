import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./components/error-page";
import AddGateway from "./components/gateway/add-gateway.component";
import GatewayList from "./components/gateway/gateway-list.component";
import Gateway from "./components/gateway/gateway.component";

import AddDevice from "./components/device/add-device.component";
import DeviceList from "./components/device/device-list.component";
import Device from "./components/device/device.component";



import App from "./App"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [          
            {
                path: "gateway",
                element: <GatewayList />,
                errorElement: <ErrorPage />,
            },
            {
                path: "gateway/:id",
                element: <Gateway />,
                errorElement: <ErrorPage />,
            },
            {
                path: "add",
                element: <AddGateway />,
                errorElement: <ErrorPage />,
            },
            {
                path: "gateway/:gatewayId/device",
                element: <AddDevice />,
                errorElement: <ErrorPage />,
            },
            {
                path: "gateway/:gatewayId/devices",
                element: <DeviceList />,
                errorElement: <ErrorPage />,
            },            
            {
                path: "gateway/:gatewayId/devices/:id",
                element: <Device />,
                errorElement: <ErrorPage />,
            },
            
        ],
    },   
   
]);

export default router;