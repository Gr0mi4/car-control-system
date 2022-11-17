import './style.scss';
import { NoteItem } from "../NoteItem/NoteItem";

export const NoteList = (props) => {

  return (
    <div className="notes-list">
      { props.notesArray.map((item, index) =>
        <NoteItem key={ index }
                  text={ item.text }
                  date={ item.date }
                  name={ item.name }
                  noteId={ item._id }
                  deleteNote={ props.deleteNote }
                  editNote={ props.editNote }
        />) }
    </div>
  );
};