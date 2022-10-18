import GatewayService from "../../service/GatewayService";
import { useState } from 'react';

const AddGateway = () => {

    const [id, setID] = useState(null);
    const [uuid, setUUID] = useState("");
    const [gatewayName, setGatewayName] = useState("");
    const [addressIPv4, setAddressIPv4] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const saveGateway = async () => {
        let data = {
            gatewayName: gatewayName,
            addressIPv4: addressIPv4
        };
        try {
            let response = await GatewayService.create(data);
            setID(response.data.id)
            setUUID(response.data.uuid)
            setGatewayName(response.data.gatewayName)
            setAddressIPv4(response.data.addressIPv4)
            setSubmitted(true)
        } catch (err) {
            console.log(err.data);
        }
    }

    const newGateway = () => {
        setID(null)
        setUUID("")
        setGatewayName("")
        setAddressIPv4("")
        setSubmitted(false)
    }
    
    const onChangeGatewayName = (e) => setGatewayName(e.target.value)
    const onChangeAddressIPv4 = (e) => setAddressIPv4(e.target.value)

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newGateway}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="gatewayName">Gateway Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="gatewayName"
                            required
                            value={gatewayName}
                            onChange={onChangeGatewayName}
                            name="gatewayName"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="addressIPv4">Address IPv4</label>
                        <input
                            type="text"
                            className="form-control"
                            id="addressIPv4"
                            required
                            value={addressIPv4}
                            onChange={onChangeAddressIPv4}
                            name="addressIPv4"
                        />
                    </div>

                    <button onClick={saveGateway} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddGateway;