import { Fragment, useEffect, useState } from 'react'
// import DuckItem from './DuckItem'
// import { ducks } from './demo'
import axios from 'axios'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import { Container } from 'semantic-ui-react'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'
import {v4 as uuid} from 'uuid'


function App() {

  const [activities,setActivities]=useState<Activity[]>([])
  const [selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  function handleSelectActivity(id:string){
setSelectedActivity(activities.find(x=>x.id===id));
  }

  function handleCancelActivity(){
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?:string){
    id?handleSelectActivity(id):handleCancelActivity();
    setEditMode(true);
  }

  function handleCloseForm(){
    setEditMode(false);
  }

function handleCreateOrEditActivity(activity:Activity){
activity.id
? setActivities([...activities.filter(x=>x.id!==activity.id),activity])
:setActivities([...activities,{...activity,id:uuid()}]);
setEditMode(false);
setSelectedActivity(activity);
}

function handleDeleteActivity(id:string){
  setActivities([...activities.filter(x=>x.id!==id)]);
}

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response=>{
      setActivities(response.data)      
    })    
  },[])
  
  return (
    <Fragment>
<NavBar openForm={handleOpenForm}/>
<Container style={{marginTop:'7em'}}>
<ActivitiesDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectActivity} cancelActivity={handleCancelActivity} editMode={editMode} openForm={handleOpenForm} closeForm={handleCloseForm} createOrEditActivity={handleCreateOrEditActivity} deleteActivity={handleDeleteActivity}/>
</Container>
    </Fragment>
    
    )
}

export default App
