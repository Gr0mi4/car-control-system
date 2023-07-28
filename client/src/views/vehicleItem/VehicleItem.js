import './style.scss';

import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getVehicleInfo, getVehicleImages, getVehicleNotes } from '../../store/dispatchers/vehicle';

import { VehiclePhoto } from '../../components/VehiclePhoto/VehiclePhoto';
import { GalleryModal } from './components/GalleryModal/GalleryModal';
import { Crop } from '../../components/Crop/Crop';
import { VehicleDetails } from './components/VehicleDetails/VehicleDetails';
import { NotesOverview } from './components/notes/NotesOverview/NotesOverview';
import { deleteCurrentVehicle } from '../../store/dispatchers/vehicleList';

import Delete from '../../assets/icons/delete.svg';

export const VehicleItem = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const vehicleAdditionalImages = useSelector(state => state.vehicle.images);

  const [ galleryModalVisible, setGalleryModalVisible ] = useState(false);
  const [ cropModalVisible, setCropModalVisible ] = useState(false);

  let history = useHistory();

  useEffect(() => {
    dispatch(getVehicleInfo(id));
    dispatch(getVehicleNotes(id));
    dispatch(getVehicleImages(id));
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  async function deleteVehicle() {
    try {
      dispatch(deleteCurrentVehicle(id))
        .then(() => history.push("/mainScreen"));
    } catch (e) {
      console.log(e);
    }
  }

  function showGallery() {
    if (vehicleAdditionalImages.length > 0) {
      setGalleryModalVisible(true);
    }
  }

  return (
    <div className="vehicle-item">
      <div className="vehicle-info-wrapper">
        <VehiclePhoto
          showGallery={ showGallery }
          showCrop={ () => {
            setCropModalVisible(true);
          } }
        />
        <VehicleDetails/>
      </div>
      <NotesOverview/>
      { galleryModalVisible &&
        <GalleryModal
          show={ showGallery }
          onClose={ () => {
            setGalleryModalVisible(false);
          } }
        />
      }
      { cropModalVisible &&
        <Crop
          show={ () => {
            setCropModalVisible(true);
          } }
          onClose={ () => {
            setCropModalVisible(false);
          } }
        /> }
      <button className="delete-vehicle button" onClick={ deleteVehicle }>
        <img className="delete-vehicle-icon" src={ Delete } alt="delete"/>
      </button>
    </div>
  );
};