import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"

interface Props{
    activities:Activity[]
    selectActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void;
}

export default function ActivityList({activities,selectActivity,deleteActivity}:Props){
  return (
    <Segment >
    <ItemGroup divided>
        {activities.map((activity)=>(
            <Item key={activity.id}>
  <ItemContent>
        <ItemHeader as='a'>{activity.title}</ItemHeader>
        <ItemMeta>{activity.date}</ItemMeta>
        <ItemDescription>
          <div>{activity.description}</div>
          <div>{activity.city},{activity.venue}</div>
        </ItemDescription>
        <ItemExtra>
            <Button floated="right" content="View" onClick={()=>{selectActivity(activity.id)}} color="blue"/>
            <Button floated="right" content="Delete" onClick={()=>{deleteActivity(activity.id)}} color="red"/>
        </ItemExtra>
        <Label basic content={activity.category}/>
      </ItemContent>      
    </Item>
        ))}
        
    </ItemGroup>
    </Segment>
  )
}


