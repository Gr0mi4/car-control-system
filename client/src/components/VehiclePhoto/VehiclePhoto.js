import './style.scss'

import {useHttp} from '../../hooks/http.hook';

import PlusCircled from '../../assets/icons/plus-circled.svg';
import Delete from '../../assets/icons/delete.svg'
import Upload from '../../assets/icons/upload.svg'

import {useState} from 'react';

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
const API_KEY = process.env.REACT_APP_CLOUD_API_KEY

export const VehiclePhoto = (props) => {
    const {request} = useHttp()

    const [src, setSrc] = useState('')
    const [previewMode, setPreviewMode] = useState(false);

    const [file, setFile] = useState({});
    const [signature, setSignature] = useState(null);
    const [timestamp, setTimestamp] = useState(null);


    async function handleSelectImage(event) {
        const file = event.target.files[0];
        setFile(event.target.files[0]);
        try {
            request('/api/vehicle/getVariables', 'GET')
                .then((res) => {
                    setSrc(URL.createObjectURL(file));
                    setPreviewMode(true);
                    const results = JSON.parse(res);
                    setSignature(results.signature);
                    setTimestamp(results.timestamp);
                    return { signature: results.signature, timestamp: results.timestamp }
                })
                .then(({signature, timestamp}) => {
                    if (props.vehicleCreationMode) {
                       uploadPhoto(signature, timestamp, event.target.files[0])
                    }
                })
                .catch((e) => {
                    console.log(e);
                })
        } catch (e) {
            console.error(e);
        }
    }

    async function uploadPhoto(signature, timestamp, file) {
        const form = new FormData()
        form.append('file', file)
        if (signature && timestamp) {
            fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?api_key=${API_KEY}&timestamp=${timestamp}&signature=${signature}`,
                {method: 'POST', body: form})
                .then(res => {
                    return res.text()
                })
                .then(res => {
                    const result = JSON.parse(res)
                    props.updateVehicleImage('image', result.secure_url)
                })
        } else {
            console.error('No signature or Timestamp', signature, timestamp)
        }
    }

    function handleDeleteImage() {
        if (previewMode) {
            setSrc('');
            setPreviewMode(false);
        } else {
            props.updateVehicleImage('image', '');
        }
    }

    return (
        <div className={props.className ? props.className : 'vehicle-photo'}>
            {props.src || src
                ?
                <div className="main-image-wrapper">
                    <img className="main-image" src={props.src || src} alt="Vehicle"/>
                    <button onClick={handleDeleteImage} className="img-delete-button">
                        <img className="delete-icon" src={Delete} alt="delete"/>
                    </button>
                    {previewMode && !props.vehicleCreationMode &&
                        <button onClick={() => uploadPhoto(signature, timestamp, file)} className="img-upload-button">
                            <img className="upload-icon" src={Upload} alt="upload"/>
                        </button>
                    }
                </div>
                :
                <div className="no-image-plug">
                    <div className="plug-text">
                        <p>No photo</p>
                        <p>Want to add one?</p>
                    </div>
                    <label htmlFor="file-upload">
                        <img className="plus-icon" src={PlusCircled} alt="plus-circled"/>
                    </label>
                    <input onChange={handleSelectImage} id="file-upload" type="file" accept=".jpg, .png, .jpeg"/>
                </div>
            }
        </div>
    )
}