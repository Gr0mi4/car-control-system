import './style.scss';

export const ImagesPreviews = ({ srcArray, picIndex, handleSelectImage }) => {
  return (
    <div className="preview-wrapper">
      {
        srcArray.map((item, index) =>
          <img
            src={ item }
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