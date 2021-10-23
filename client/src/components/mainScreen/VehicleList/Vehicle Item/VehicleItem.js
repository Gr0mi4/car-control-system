import {useParams} from "react-router-dom";
import {useEffect} from "react";

export const VehicleItem = () => {
    let { id } = useParams();

    function getVehicleInfo () {
        console.log('get Vehicle info')
    }

    useEffect(() => {
        getVehicleInfo()
    }, [])

    return (
        <div>
            <h1>Hello man!</h1>
            <h3>ID: {id}</h3>
        </div>
    );
}