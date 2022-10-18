import GatewayService from "../../service/GatewayService";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const GatewaysList = () => {
    const [gateways, setGateways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentGateway, setCurrentGateway] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const getAllGateway = async () => {
        try {
            let response = await GatewayService.getAll()
            console.log(response.data)
            setGateways(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setGateways(null);
        } finally {
            setLoading(false);
        }
    }
    const refreshList = async () => {
        try {
            let data = await getAllGateway()
            console.log(data);
            setGateways(data)
        } catch (err) {
            console.log(err);
        }
    }

    const removeAllGateway = async () => {
        try {
            let response = await GatewayService.deleteAll()
            console.log(response.data);
            await refreshList()
        } catch (err) {
            console.log(err);
        }
    }

    const setActiveGateway = (gateway, index) => {
        setCurrentGateway(gateway)
        setCurrentIndex(index)
    }

    useEffect(() => {
        getAllGateway()
    }, [])

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Gateway List</h4>
                {loading && <div>A moment please...</div>}
                {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                <ul className="list-group">
                    {gateways &&
                        gateways.map((gateway, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveGateway(gateway, index)}
                                key={index}
                            >
                                {gateway.gatewayName}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllGateway}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentGateway ? (
                    <div>
                        <h4>Gateway</h4>
                        <div>
                            <label>
                                <strong>Gateway Name:</strong>
                            </label>{" "}
                            {currentGateway.gatewayName}
                        </div>
                        <div>
                            <label>
                                <strong>Address IPv4:</strong>
                            </label>{" "}
                            {currentGateway.addressIPv4}
                        </div>
                        <div>
                            <label>
                                <strong>UUID:</strong>
                            </label>{" "}
                            {currentGateway.uuid}
                        </div>
                            <Link to={`${currentGateway.id}`}
                                className="btn btn-warning"
                            >
                                Edit
                            </Link>

                            <Link to={`${currentGateway.id}/device`}
                                className="btn btn-warning"
                            >
                                Add Device
                            </Link>

                            <Link to={`${currentGateway.id}/devices`}
                                className="btn btn-warning"
                            >
                                List Device
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

export default GatewaysList;