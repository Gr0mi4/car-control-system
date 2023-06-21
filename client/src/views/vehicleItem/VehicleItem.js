import './style.scss';

import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

import Delete from '../../assets/icons/delete.svg';

import { VehiclePhoto } from '../../components/VehiclePhoto/VehiclePhoto';
import { GalleryModal } from './components/GalleryModal/GalleryModal';
import { Crop } from '../../components/Crop/Crop';
import { VehicleDetails } from './components/VehicleDetails/VehicleDetails';
import { NotesOverview } from './components/notes/NotesOverview/NotesOverview';

export const VehicleItem = () => {
  const { id } = useParams();

  const [ vehicleInfo, setVehicleInfo ] = useState({});

  const [ vehicleNotes, setVehicleNotes ] = useState([]);

  const [ galleryModalVisible, setGalleryModalVisible ] = useState(false);

  const [ cropModalVisible, setCropModalVisible ] = useState(false);

  const [ vehicleAdditionalImages, setVehicleAdditionalImages ] = useState([]);

  const { request } = useHttp();

  let history = useHistory();

  useEffect(() => {
    getVehicleInfo();
    getVehicleNotes();
    getVehicleImages();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function parseResults(results) {
    // Parsing for additional props
    if (results.additionalFields && Object.values(results.additionalFields).length > 0) {
      const additionalFields = results.additionalFields;
      results = { ...results, ...additionalFields };
    }

    const values = Object.values(results);
    const keys = Object.keys(results);
    const parsedResults = {};

    keys.map((key, index) => {
      if (key === 'additionalFields') {
        return null;
      }
      return parsedResults[key] = values[index];
    });
    return parsedResults;
  }

  async function getVehicleInfo() {
    try {
      await request('/api/vehicle/getVehicleInfo', 'POST', { vehicleId: id })
        .then(res => setVehicleInfo(parseResults(JSON.parse(res))));
    } catch (e) {
      console.log(e);
    }
  }

  async function getVehicleImages() {
    try {
      await request('/api/images/getAdditionalImages', 'POST', { vehicleId: id })
        .then(res => setVehicleAdditionalImages(JSON.parse(res)));
    } catch (e) {
      console.log('getVehicleImages', e);
    }
  }

  async function getVehicleNotes() {
    try {
      await request('/api/notes/getVehicleNotes', 'POST', { vehicleId: id })
        .then(req => {
          return setVehicleNotes(JSON.parse(req));
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function updateVehicleInfo(fieldName, newValue) {
    try {
      await request('/api/vehicle/changeVehicleProp', 'POST', {
        vehicleId: id, newValue, updatedField: fieldName,
      })
        .then(res => {
          const results = JSON.parse(res);
          setVehicleInfo(parseResults(results));
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function uploadAdditionalImage(src, name = 'Some name') {
    try {
      await request('/api/images/uploadAdditionalImage', 'POST', {
        vehicleId: id, src, name
      })
        .then(() => {
          getVehicleImages();
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteVehicle() {
    try {
      await request('/api/vehicle/deleteVehicle', 'POST', { id })
        .then(() => history.push("/mainScreen"));
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteCustomField(fieldName) {
    await request('/api/vehicle/deleteCustomField', 'POST', { vehicleId: id, fieldName })
      .then((res) => setVehicleInfo(parseResults(JSON.parse(res))));
  }

  async function addNote(text, name) {
    return await request('/api/notes/addNote', 'POST', { vehicleId: id, text, name });
  }

  async function editNote(text, name, selectedNoteId) {
    return await request('/api/notes/changeNote', 'POST', { id: selectedNoteId, text, name });
  }

  async function deleteNote(noteId) {
    try {
      await request('/api/notes/deleteNote', 'POST', { id: noteId })
        .then(() => getVehicleNotes());
    } catch (e) {
      console.log(e);
    }
  }

  function showGallery() {
    if (vehicleAdditionalImages.length > 0) {
      setGalleryModalVisible(true);
    }
  }

  async function deleteAdditionalImage(imageId) {
    try {
      await request('/api/images/deleteAdditionalImages', 'POST', { imageId })
        .then(() => {
          getVehicleImages();
        });
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className="vehicle-item">
      <div className="vehicle-info-wrapper">
        <VehiclePhoto
          imageLink={ vehicleInfo.image }
          getUpdatedInfo={ getVehicleInfo }
          updateVehicleImage={ updateVehicleInfo }
          uploadAdditionalImage={ uploadAdditionalImage }
          showGallery={ showGallery }
          showCrop={ () => {
            setCropModalVisible(true);
          } }
        />
        <VehicleDetails
          vehicleInfo={ vehicleInfo }
          setVehicleInfo={ setVehicleInfo }
          updateVehicleInfo={ updateVehicleInfo }
          deleteCustomField={ deleteCustomField }
        />
      </div>
      <NotesOverview
        vehicleNotes={ vehicleNotes }
        setVehicleNotes={ setVehicleNotes }
        editNote={ editNote }
        deleteNote={ deleteNote }
        addNote={ addNote }
      />
      { galleryModalVisible &&
        <GalleryModal
          show={ showGallery }
          imageArray={ vehicleAdditionalImages }
          onClose={ () => {
            setGalleryModalVisible(false);
          } }
          deleteAdditionalImage={ deleteAdditionalImage }
        />
      }
      { cropModalVisible &&
        <Crop
          show={ () => {
            setCropModalVisible(true);
          } }
          image={ vehicleInfo.image }
          onClose={ () => {
            setCropModalVisible(false);
          } }
        />
      }
      <button className="delete-vehicle button" onClick={ deleteVehicle }>
        <img className="delete-vehicle-icon" src={ Delete } alt="delete"/>
      </button>
    </div>);
};