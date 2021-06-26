import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@material-ui/core";

export const AddNewVehicleModal = (props) => {
    function saveNewVehicle() {
        console.log('save new vehicle')
    }

    return (
        <Dialog
            open={props.showNewVehicleModal}
            onClose={props.closeAddNewVehicleModal}
        >
            <DialogTitle>Here you can add new vehicle</DialogTitle>
            <DialogContent dividers>
                <form onSubmit={saveNewVehicle}>
                    <TextField required label="Brand"/>
                    <TextField required label="Model"/>
                    <TextField required label="Complectation"/>
                    <TextField required label="Type"/>
                </form>
            </DialogContent>
            <Button onClick={saveNewVehicle}>Save Vehicle</Button>
            <Button onClick={props.closeAddNewVehicleModal}>Cancel</Button>
        </Dialog>
    )
}