import DeviceService from "../../service/DeviceService";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const { gatewayId } = useParams();

    const getAllDevice = async () => {
        try {
            let response = await DeviceService.getByGateway(gatewayId)
            console.log(response.data)
            setDevices(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setDevices(null);
        } finally {
            setLoading(false);
        }
    }
    const refreshList = async () => {
        try {
            let data = await getAllDevice()
            console.log(data);
            setDevices(data)
        } catch (err) {
            console.log(err);
        }
    }

    const removeAllDevice = async () => {
        try {
            let response = await DeviceService.deleteAll()
            console.log(response.data);
            await refreshList()
        } catch (err) {
            console.log(err);
        }
    }

    const setActiveDevice = (device, index) => {
        setCurrentDevice(device)
        setCurrentIndex(index)
    }

    useEffect(() => {
        getAllDevice()
    }, [])

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Device List</h4>
                {loading && <div>A moment please...</div>}
                {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                <ul className="list-group">
                    {devices &&
                        devices.map((device, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveDevice(device, index)}
                                key={index}
                            >
                                {device.vendor}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllDevice}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentDevice ? (
                    <div>
                        <h4>Device</h4>
                        <div>
                            <label>
                                <strong>UID:</strong>
                            </label>{" "}
                            {currentDevice.uid}
                        </div>
                        <div>
                            <label>
                                <strong>Vendor:</strong>
                            </label>{" "}
                            {currentDevice.vendor}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentDevice.status}
                        </div>
                            <Link to={`${currentDevice.id}`}
                                className="btn btn-warning"
                            >
                                Edit
                            </Link>                       

                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Gateway...</p>
                    </div>
                )}
            </div>
        </div>
    );

}

export default DeviceList;