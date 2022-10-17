
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import DeviceService from "../../service/DeviceService";

const Device = () => {
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [message, setMessage] = useState("");
    const { id, gatewayId } = useParams();
    const navigate = useNavigate();

    const getDevice = async (id) => {
        try {
            let response = await DeviceService.get(id)
            console.log(response.data)
            setCurrentDevice(response.data);
            // setError(null);
        } catch (err) {
            // setError(err.message);
            setCurrentDevice(null);
        } finally {
            // setLoading(false);
        }
    }

    const updateDevice = async () => {
        try {
            let response = await DeviceService.update(gatewayId, currentDevice.id, currentDevice)
            console.log(response.data)
            setMessage("The Device was updated successfully!");
            // setError(null);
        } catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }

    const deleteDevice = async () => {
        try {
            let response = await DeviceService.delete(currentDevice.id)
            console.log(response.data)
            // setError(null);          
            navigate(`/gateway/${gatewayId}/devices`);

        } catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }
    const onChangeUID = (e) => {
        setCurrentDevice({
            ...currentDevice,
            uui: e.target.value
        });
    }

    const onChangeVendor = (e) => {
        setCurrentDevice({
            ...currentDevice,
            vendor: e.target.value
        });
    }

    const onChangeStatus = (e) => {
        setCurrentDevice({
            ...currentDevice,
            status: e.target.value
        });
    }

    useEffect(() => {
        getDevice(id)
    }, [])

    return (
        <div>
            {currentDevice ? (
                <div className="edit-form">
                    <h4>Device</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="uid">UID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="uid"
                                value={currentDevice.uid}
                                onChange={onChangeUID}

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vendor">UUID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vendor"
                                value={currentDevice.vendor}
                                onChange={onChangeVendor}
                            />
                        </div>
                        <div className="form-group">
                            <select className="form-select" value={currentDevice.status}  onChange={onChangeStatus}>
                                <option value="OFFLINE">OFFLINE</option>
                                <option value="ONLINE">ONLINE</option>
                            </select>
                        </div>

                        {/* <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div> */}
                    </form>

                    {/* {currentTutorial.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updatePublished(true)}
                        >
                            Publish
                        </button>
                    )} */}

                    <button
                        className="btn btn-danger mr-2"
                        onClick={deleteDevice}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updateDevice}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on Gateway...</p>
                </div>
            )}
        </div>
    );
}

export default Device;
