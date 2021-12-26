import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@material-ui/core';
import './style.scss'
import {useState} from 'react';

export const AddNewVehicleModal = (props) => {

    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [modification, setModification] = useState('')
    const [type, setType] = useState('car')

    const brandChangeHandler = event => {
        setBrand(event.target.value)
    }

    const modelChangeHandler = event => {
        setModel(event.target.value)
    }

    const modificationChangeHandler = event => {
        setModification(event.target.value)
    }

    const handleChangeVehicleType = (event) => {
        setType(event.target.value)
    }

    return (
        <Dialog
            open={props.showNewVehicleModal}
            onClose={props.closeAddNewVehicleModal}
        >
            <DialogTitle>Here you can add new vehicle</DialogTitle>
            <DialogContent dividers>
                <form onSubmit={() => props.saveNewVehicle(brand, model, modification, type)} className='new-vehicle-form'>
                    <TextField required label='Brand' onChange={brandChangeHandler} value={brand}/>
                    <TextField required label='Model' onChange={modelChangeHandler} value={model}/>
                    <TextField required label='Modification' onChange={modificationChangeHandler} value={modification}/>
                    <label className='vehicle-type-label'>Vehicle Type*</label>
                    <RadioGroup name='vehicle-type' color='default' value={type} onChange={handleChangeVehicleType}>
                        <FormControlLabel value='car' control={<Radio />} label='Car'/>
                        <FormControlLabel value='motorcycle' control={<Radio />} label='Motorcycle'/>
                        <FormControlLabel value='bicycle' control={<Radio />} label='Bicycle'/>
                    </RadioGroup>
                </form>
            </DialogContent>
            <Button onClick={() => props.saveNewVehicle(brand, model, modification, type)}>Save Vehicle</Button>
            <Button onClick={props.closeAddNewVehicleModal}>Cancel</Button>
        </Dialog>
    )
}
