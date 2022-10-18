import DeviceService from "../../service/DeviceService";
import { useState } from 'react';

import { useParams } from "react-router-dom";

const AddService = () => {

    // const [id, setID] = useState(null);
    const [uid, setUID] = useState("");
    const [status, setStatus] = useState("OFFLINE");
    const [vendor, setVendor] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { gatewayId } = useParams();


    const saveService = async () => {
        let data = {
            status: status,
            vendor: vendor
        };
        try {
            let response = await DeviceService.create(gatewayId, data);
            // setID(response.data.id)
            setUID(response.data.uid)
            setStatus(response.data.status)
            setVendor(response.data.vendor)
            setSubmitted(true)
        } catch (err) {
            console.log(err.data);
        }
    }

    const newService = () => {
        setUID("")
        setStatus("")
        setVendor("")
        setSubmitted(false)
    }

    const onChangeStatus = (e) => setStatus(e.target.value)
    const onChangeVendor = (e) => setVendor(e.target.value)

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newService}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <select className="form-select" value={status} onChange={onChangeStatus}>
                            <option value="OFFLINE">OFFLINE</option>
                            <option value="ONLINE">ONLINE</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="vendor">Vendor</label>
                        <input
                            type="text"
                            className="form-control"
                            id="vendor"
                            required
                            value={vendor}
                            onChange={onChangeVendor}
                            name="vendor"
                        />
                    </div>
                    <button onClick={saveService} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddService;