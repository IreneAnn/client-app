import { Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity:Activity
    cancelActivity:()=>void;
    openForm:(id:string)=>void;
}
export default function ActivityDetails({activity,cancelActivity,openForm}:Props){

  return (
    <>
      <Card fluid>
      <Image src={'/asset/categoryImages/food.jpg'}/>
    <CardContent>
      <CardHeader>{activity.title}</CardHeader>
      <CardMeta>
        <span>{activity.date}</span>
      </CardMeta>
      <CardDescription>
       {activity.description}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <ButtonGroup width='2'>
      <Button basic color="blue" content="Edit" onClick={()=>{openForm(activity.id)}} />
      <Button basic color="grey" content="Cancel" onClick={cancelActivity}/>
      </ButtonGroup>
    </CardContent>
  </Card>

    </>
  )
}
