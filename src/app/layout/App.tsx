import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import agent from '../api/agent.ts'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import { Container } from 'semantic-ui-react'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'
import {v4 as uuid} from 'uuid'
import LoadingComponent from './LoadingComponent'


function App() {

  const [activities,setActivities]=useState<Activity[]>([])
  const [selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const [editMode,setEditMode]=useState(false);
  const [loading,setLoading]=useState(true);
const [submitting,setSubmiting]=useState(false);

  const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay);
    }
    )
    };

  axios.interceptors.response.use(async (response)=>{

    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
    
});

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

  setSubmiting(true);
  if(activity.id){
    agent.Activitiess.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id!==activity.id),activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmiting(false);
    })
  }
  else{
    activity.id=uuid();
    agent.Activitiess.create(activity).then(()=>{
      setActivities([...activities,activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmiting(false);
    })

  }

//activity.id
//? setActivities([...activities.filter(x=>x.id!==activity.id),activity])
//:setActivities([...activities,{...activity,id:uuid()}]);
//setEditMode(false);
//setSelectedActivity(activity);
}

function handleDeleteActivity(id:string){
setSubmiting(true);
agent.Activitiess.delete(id).then(()=>{
  setActivities([...activities.filter(x=>x.id!==id)]);
  setSubmiting(false);
})

  //setActivities([...activities.filter(x=>x.id!==id)]);
}

  useEffect(()=>{
    agent.Activitiess.list()
      //axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response=>{

        response.forEach(activity=>{
          activity.date=activity.date.split('T')[0];
        })
      setActivities(response);   
      setLoading(false);   
    })    
  },[]) 
  
if(loading){
  return( 
  <>
  <LoadingComponent content='Loading...'/>
  </>
  )
}

return (
  <Fragment>
<NavBar openForm={handleOpenForm}/>
<Container style={{marginTop:'7em'}}>
<ActivitiesDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectActivity} cancelActivity={handleCancelActivity} editMode={editMode} openForm={handleOpenForm} closeForm={handleCloseForm} createOrEditActivity={handleCreateOrEditActivity} deleteActivity={handleDeleteActivity} submitting={submitting}/>
</Container>
  </Fragment>
  
  )

}

export default App
