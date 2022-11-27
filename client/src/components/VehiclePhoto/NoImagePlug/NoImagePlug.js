import './style.scss';
import PlusCircled from '../../../assets/icons/plus-circled.svg';

export const NoImagePlug = ({ handleSelectImage }) => {
  return (
    <div className="no-image-plug">
      <div className="plug-text">
        <p>No photo</p>
        <p>Want to add one?</p>
      </div>
      <label htmlFor="file-upload">
        <img className="plus-icon" src={ PlusCircled } alt="plus-circled"/>
      </label>
      <input onChange={ handleSelectImage } id="file-upload" type="file" accept=".jpg, .png, .jpeg"/>
    </div>
  );
};