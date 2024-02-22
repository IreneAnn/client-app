import { Form, FormButton, FormField, Segment, TextArea } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props{
    activity:Activity|undefined
    closeForm:()=>void;
    createOrEditActivity:(activity:Activity)=>void;
    submitting:boolean;
}

export default function ActivityForm ({activity:selectedActivity,closeForm,createOrEditActivity,submitting}:Props){

    const intialState=selectedActivity?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity,setActivity]=useState(intialState);

function handleSubmit(){
    createOrEditActivity(activity);
console.log(activity);
}

function handleOnChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
const {name,value}=event.target;
setActivity({...activity,[name]:value});
}

  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit}>
    <FormField>
      <input placeholder='Title' value={activity.title} name='title' onChange={handleOnChange} />
    </FormField>
    <FormField>
      <TextArea placeholder='Description' value={activity.description} name='description' onChange={handleOnChange} />
    </FormField>
    <FormField>
      <input placeholder='Category' value={activity.category} name='category' onChange={handleOnChange}/>
    </FormField>
    <FormField>
    <input placeholder='Date' type="date" value={activity.date} name='date' onChange={handleOnChange}/>
    </FormField>
    <FormField>
    <input placeholder='City'value={activity.city} name='city' onChange={handleOnChange} />
    </FormField>
    <FormField>
    <input placeholder='Venue'value={activity.venue} name='venue' onChange={handleOnChange} />
    </FormField>
    <FormField>
    <FormButton floated="right" content="Submit" positive type='submit' loading={submitting}/>
    </FormField>
    <FormField>
    <FormButton content="Cancel" floated="right" type='button' onClick={closeForm} />
    </FormField>
  </Form>
    </Segment>

  )
}

 