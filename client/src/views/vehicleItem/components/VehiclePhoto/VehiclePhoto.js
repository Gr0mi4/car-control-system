import { useHttp } from '../../../../hooks/http.hook';

import PlusCircled from '../../../../assets/icons/plus-circled.svg';
import Delete from '../../../../assets/icons/delete.svg'

import './style.scss'

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
const API_KEY = process.env.REACT_APP_CLOUD_API_KEY

export const VehiclePhoto = (props) => {
  const {request} = useHttp()

  let file;

  async function handleUploadImage(event) {
    file = event.target.files[0]
    let signature;
    let timestamp;
    try {
      request('/api/vehicle/getVariables', 'GET')
        .then((res) => {
          const results = JSON.parse(res)
          signature = results.signature;
          timestamp = results.timestamp;
        })
        .catch((e) => {
          console.log(e)
        })
        .then(() => {
          const form = new FormData()
          form.append('file', file)
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
        })
    } catch (e) {
      console.error(e);
    }
  }

  function handleDeleteImage() {
    props.updateVehicleImage('image', '');
  }

  return (
    <div>
      {props.src
        ?
        <div className="main-image-wrapper">
          <img className="main-image" src={props.src} alt="Vehicle Image"/>
          <button onClick={handleDeleteImage} className="img-delete-button">
            <img className="delete-icon" src={Delete}/>
          </button>
        </div>
        :
        <div className="no-image-plug">
          <div className="plug-text">
            <p>No photo</p>
            <p>Want to add one?</p>
          </div>
          <label htmlFor="file-upload">
            <img className="plus-circled" src={PlusCircled} alt="plus-circled"/>
          </label>
          <input onChange={handleUploadImage} id="file-upload" type="file" accept=".jpg, .png, .jpeg"/>
        </div>
      }
    </div>
  )
}