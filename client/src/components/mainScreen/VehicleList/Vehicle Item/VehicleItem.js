import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useHttp} from "../../../../hooks/http.hook";

export const VehicleItem = () => {
    const {id} = useParams();
    const [vehicleInfo, setVehicleInfo] = useState({})

    const {request} = useHttp()

    async function getVehicleInfo() {
        try {
            await request('/api/vehicle/getVehicleInfo', 'POST', {vehicleId: id})
                .then(res => {
                    const results = JSON.parse(res)
                    setVehicleInfo(results)
                    console.log(results)
                })
        } catch (e) {

        }
    }

    useEffect(() => {
        getVehicleInfo()
    }, [])

    return (
        <div>
            <h1>Hello man!</h1>
            {vehicleInfo.brand && <div>
                <h2>{vehicleInfo.brand}</h2>
                <h2>{vehicleInfo.model}</h2>
                <h2>{vehicleInfo.type}</h2>
                <h2>{vehicleInfo.modification}</h2>
            </div>}
        </div>
    )
}