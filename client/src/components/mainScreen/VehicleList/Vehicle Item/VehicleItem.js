import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useHttp} from '../../../../hooks/http.hook';

import './style.scss'

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
            {Object.keys(vehicleInfo).map(vehicle => (
                <div key={vehicle} className='card-panel'>
                    {vehicleInfo[vehicle]}
                </div>
            ))}

            <button className='add-property button'>+</button>
        </div>
    )
}