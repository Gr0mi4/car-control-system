import './style.scss';

import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';

import Delete from '../../assets/icons/delete.svg';
import UploadIcon from '../../assets/icons/ok-circled.svg';

import { VehiclePhoto } from '../../components/VehiclePhoto/VehiclePhoto';
import { NoteList } from './components/notes/NoteList/NoteList';
import { NoteEditModal } from './components/notes/NoteEditModal/NoteEditModal';
import { GalleryModal } from './components/GalleryModal/GalleryModal';

export const VehicleItem = () => {
  const { id } = useParams();
  const [ vehicleInfo, setVehicleInfo ] = useState({});
  const [ changingValue, setNewValue ] = useState('');

  const [ vehicleNotes, setVehicleNotes ] = useState([]);
  const [ noteEditVisible, setNoteEditVisible ] = useState(false);
  const [ selectedNoteName, setSelectedNoteName ] = useState('');
  const [ selectedNoteText, setSelectedNoteText ] = useState('');
  const [ selectedNoteId, setSelectedNoteId ] = useState('');

  const [ customFieldName, setCustomFieldName ] = useState('');
  const [ customFieldValue, setCustomFieldValue ] = useState('');
  const [ customFieldInputVisible, setCustomFieldInputVisible ] = useState(false);

  const [ galleryModalVisible, setGalleryModalVisible ] = useState(false);

  const [ vehicleAdditionalImages, setVehicleAdditionalImages ] = useState([]);

  const { request } = useHttp();

  let history = useHistory();

  // Utility fields that shouldn't be shown
  const hiddenInfoFields = [ 'userId', 'image', '__v', '_id' ];

  function parseResults(results) {
    // Needed for text/input feature to work. Adding to every value prop that decides what to show input or text
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
      // Checks if we need isChanging prop for particular value (we won't be changing service fields, img and etc)
      if (!hiddenInfoFields.includes(key)) {
        return parsedResults[key] = { value: values[index], isChanging: false };
      } else {
        return parsedResults[key] = values[index];
      }
    });
    return parsedResults;
  }

  async function getVehicleInfo() {
    try {
      await request('/api/vehicle/getVehicleInfo', 'POST', { vehicleId: id })
        .then(res => {
          const results = JSON.parse(res);
          setVehicleInfo(parseResults(results));
        });
    } catch (e) {

    }
  }

  async function getVehicleImages() {
    try {
      await request('/api/images/getAdditionalImages', 'POST', { vehicleId: id })
        .then(res => {
          const results = JSON.parse(res);
          setVehicleAdditionalImages(results);
        });
    } catch (e) {

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

  async function updateVehicleInfo(fieldName, newValue = changingValue) {
    try {
      await request('/api/vehicle/changeVehicleProp', 'POST', {
        vehicleId: id, newValue, updatedField: fieldName,
      })
        .then(res => {
          const results = JSON.parse(res);
          setVehicleInfo(parseResults(results));
        });
    } catch (e) {

    }
  }

  async function uploadAdditionalImage(src, name = changingValue) {
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
        .then(res => {
          history.push("/mainScreen");
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getVehicleInfo();
    getVehicleNotes();
    getVehicleImages();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function handleInputChange(event) {
    let value = event.target.value;
    const fieldName = event.target.name;

    const updatedVehicleInfo = { ...vehicleInfo };
    updatedVehicleInfo[fieldName].value = value;
    setVehicleInfo(updatedVehicleInfo);

    setNewValue(value);
  }

  function handleSendData(fieldName) {
    return async (event) => {
      event.preventDefault();
      await updateVehicleInfo(fieldName);
    };
  }

  function showInput(fieldName) {
    return () => {
      const updatedVehicleInfo = { ...vehicleInfo };
      updatedVehicleInfo[fieldName].isChanging = true;
      setVehicleInfo(updatedVehicleInfo);
    };
  }

  function handleBlur(event) {
    const fieldName = event.target.name;
    const updatedVehicleInfo = { ...vehicleInfo };
    updatedVehicleInfo[fieldName].isChanging = false;
    setVehicleInfo(updatedVehicleInfo);
  }

  function handleInputFocus(event) {
    setNewValue(event.target.value);
  }

  function showNoteEditModal() {
    setNoteEditVisible(true);
  }

  function closeNoteEditModal() {
    setNoteEditVisible(false);
  }

  async function saveNote(text, name) {
    if (selectedNoteId) {
      await request('/api/notes/changeNote', 'POST', { id: selectedNoteId, text, name })
        .then(() => {
          getVehicleNotes();
          setSelectedNoteId('');
          setSelectedNoteName('');
          setSelectedNoteText('');
        })
        .finally(() => {
          closeNoteEditModal();
        });
    } else {
      await request('/api/notes/addNote', 'POST', { vehicleId: id, text, name })
        .then(() => {
          getVehicleNotes();
        })
        .finally(() => {
          closeNoteEditModal();
        });
    }
  }

  async function deleteNote(noteId) {
    await request('/api/notes/deleteNote', 'POST', { id: noteId })
      .then(() => {
        getVehicleNotes();
      });
  }

  function editNote(noteId) {
    setSelectedNoteId(noteId);
    const selectedNote = vehicleNotes.find(item => item._id === noteId);
    setSelectedNoteName(selectedNote.name);
    setSelectedNoteText(selectedNote.text);
    showNoteEditModal();
  }

  function addCustomField() {
    updateVehicleInfo(customFieldName, customFieldValue)
      .then(() => {
        setCustomFieldName('');
        setCustomFieldValue('');
        setCustomFieldInputVisible(false);
      });
  }

  function customFieldNameChangeHandler(event) {
    setCustomFieldName(event.target.value);
  }

  function customFieldValueChangeHandler(event) {
    setCustomFieldValue(event.target.value);
  }

  async function deleteCustomField(event, fieldName) {
    event.stopPropagation();
    await request('/api/vehicle/deleteCustomField', 'POST', { vehicleId: id, fieldName })
      .then(() => {
        getVehicleInfo();
      });
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
    <div>
      <div className="vehicle-info-wrapper">
        <VehiclePhoto
          src={ vehicleInfo.image }
          getUpdatedInfo={ getVehicleInfo }
          updateVehicleImage={ updateVehicleInfo }
          uploadAdditionalImage={ uploadAdditionalImage }
          showGallery={ showGallery }
        />
        <div className="details-wrapper">
          <div className="details-header">Vehicle details</div>
          { Object.keys(vehicleInfo).map((fieldName, index) => {
            // Check if this field should be shown or not
            if (!hiddenInfoFields.includes(fieldName)) {
              return (
                <div key={ fieldName } className="details-field">
                  <div className="field-name">{ fieldName } :</div>
                  { vehicleInfo[fieldName].isChanging
                    ? (
                      <form className="vehicle-info-input-wrapper">
                        <input className="vehicle-info-input"
                               type="text"
                               onChange={ handleInputChange }
                               onFocus={ handleInputFocus }
                               onBlur={ handleBlur }
                               name={ fieldName }
                               value={ vehicleInfo[fieldName].value }
                               autoFocus
                        />
                        <button className="submit-button" onClick={ handleSendData(fieldName) }>
                          <img className="ok-icon" src={ UploadIcon } alt="ok-icon"/>
                        </button>
                      </form>)
                    : (
                      <div className="field-value" onClick={ showInput(fieldName) }>
                        { vehicleInfo[fieldName].value ? vehicleInfo[fieldName].value : ' No Value Provided ' }
                        { index > 4 &&
                          <button onClick={ (event) => deleteCustomField(event, fieldName) }>
                            <img className="delete-vehicle-icon" src={ Delete } alt="delete"/>
                          </button>
                        }
                      </div>) }
                </div>);
            }
            return null;
          }) }
          { customFieldInputVisible &&
            <div className="custom-field-wrapper">
              <input className="vehicle-info-input" onChange={ customFieldNameChangeHandler }/>
              :
              <input className="vehicle-info-input" onChange={ customFieldValueChangeHandler }/>
              <button className="submit-button" onClick={ addCustomField }>
                <img className="ok-icon" src={ UploadIcon } alt="ok-icon"/>
              </button>
            </div>
          }
          <button className="button" onClick={ () => {
            setCustomFieldInputVisible(!customFieldInputVisible);
          } }>{ customFieldInputVisible ? 'Do not add custom field' : 'Add custom field' }
          </button>
          <button className="delete-vehicle button" onClick={ deleteVehicle }>
            <img className="delete-vehicle-icon" src={ Delete } alt="delete"/>
          </button>
        </div>
      </div>
      { vehicleNotes.length &&
        <NoteList notesArray={ vehicleNotes } deleteNote={ deleteNote } editNote={ editNote }/> }
      <button className="button" onClick={ showNoteEditModal }>New Note</button>
      { noteEditVisible &&
        <NoteEditModal
          show={ showNoteEditModal }
          onClose={ closeNoteEditModal }
          onSave={ saveNote }
          noteName={ selectedNoteName }
          noteText={ selectedNoteText }
        />
      }
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
    </div>);
};