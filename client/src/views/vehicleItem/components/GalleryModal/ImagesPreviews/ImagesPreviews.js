import './style.scss';

import { useSelector } from 'react-redux';

export const ImagesPreviews = ({ picIndex, handleSelectImage }) => {
  const imageArray = useSelector(state => state.vehicle.images);

  return (
    <div className="preview-wrapper">
      {
        imageArray.map((item, index) =>
          <img
            src={ item.src }
            className={ picIndex === index ? 'selected image-preview' : 'image-preview' }
            key={ index }
            onClick={ () => {
              handleSelectImage(index);
            } }
            alt="preview"
          />
        )
      }
    </div>
  );
};