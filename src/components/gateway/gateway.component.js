
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import GatewayService from "../../service/GatewayService";

const Gateway = () => {
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [currentGateway, setCurrentGateway] = useState(null);
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const getGateway = async (id) => {
        try {
            let response = await GatewayService.get(id)
            console.log(response.data)
            setCurrentGateway(response.data);
            console.log(currentGateway)
            // setError(null);
        } catch (err) {
            // setError(err.message);
            setCurrentGateway(null);
        } finally {
            // setLoading(false);
        }
    }

    const updateGateway = async () => {
        try {
            let response = await GatewayService.update(currentGateway.id, currentGateway)
            console.log(response.data)
            setMessage("The Gateway was updated successfully!");
            // setError(null);
        } catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }

    const deleteGateway = async () => {
        try {
            let response = await GatewayService.delete(currentGateway.id)
            console.log(response.data)
            // setError(null);
            navigate("/gateway");
        } catch (err) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }

    const onChangeGatewayName = (e) => {
        setCurrentGateway({
            ...currentGateway,
            gatewayName: e.target.value
        });
    }

    const onChangeAddressIPv4 = (e) => {
        setCurrentGateway({
            ...currentGateway,
            addressIPv4: e.target.value
        });
    }

    useEffect(() => {
        getGateway(id)
    }, [])

    return (
        <div>
            {currentGateway ? (
                <div className="edit-form">
                    <h4>Gateway</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="gatewayName">Gateway Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="gatewayName"
                                value={currentGateway.gatewayName}
                                onChange={onChangeGatewayName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="uuid">UUID</label>
                            <input
                                disabled
                                type="text"
                                className="form-control"
                                id="uuid"
                                value={currentGateway.uuid}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressIPv4">Address IPv4</label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressIPv4"
                                value={currentGateway.addressIPv4}
                                onChange={onChangeAddressIPv4}
                            />
                        </div>

                    </form>

                    <button
                        className="btn btn-danger mr-2"
                        onClick={deleteGateway}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updateGateway}
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

export default Gateway;
