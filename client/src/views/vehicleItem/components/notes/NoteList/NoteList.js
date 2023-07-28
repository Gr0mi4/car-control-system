import './style.scss';

import { useSelector } from 'react-redux';

import { NoteItem } from "../NoteItem/NoteItem";

export const NoteList = ({ openNote }) => {

  const vehicleNotes = useSelector(state => state.vehicle.notes);

  return (
    <div className="notes-list">
      { vehicleNotes.map((item, index) =>
        <NoteItem key={ index }
                  text={ item.text }
                  date={ item.date }
                  name={ item.name }
                  noteId={ item._id }
                  editNote={ openNote }
        />) }
    </div>
  );
};