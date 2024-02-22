import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props{
    activities:Activity[];
    selectedActivity:Activity|undefined
    selectActivity:(id:string)=>void;
    cancelActivity:()=>void;
    editMode:Boolean
    openForm:(id:string)=>void;
    closeForm:()=>void;
    createOrEditActivity:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}

export default function ActivitiesDashboard({activities,selectedActivity,selectActivity,cancelActivity,editMode,openForm,closeForm,createOrEditActivity,deleteActivity,submitting}:Props){
  return (
    <div>
        <Grid>
            <GridColumn width='10'>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting}/>
            </GridColumn>
            <GridColumn width="5">
                {selectedActivity &&  !editMode && <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} openForm={openForm}/>}
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEditActivity={createOrEditActivity} submitting={submitting}/>}
            </GridColumn>
        </Grid>
    </div>
  )
}
