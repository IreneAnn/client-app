import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

interface Props{
  openForm:(id?:string)=>void;
}

export default function NavBar({openForm}:Props) {
  return (
    <div>
        <Menu inverted fixed='top'>
            <Container>
                <MenuItem header> 
                <img src="../asset/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                Reactivities
                </MenuItem>
                <MenuItem name="Activity"/>
                <MenuItem>
                <Button onClick={openForm} positive content="Create Activity" />
                </MenuItem>
            </Container>
        </Menu>
    </div>
  )
}

