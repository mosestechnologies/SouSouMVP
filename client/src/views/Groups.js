import React, { useState, useEffect, useContext } from 'react';
import {
   Button,
   Badge, Card,
   CardHeader, CardBody,
   Container,
   CardFooter,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   Media, Progress, Row, Table,
   UncontrolledDropdown,
   UncontrolledTooltip,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Axios from 'axios';
import { AuthContext } from '../context/GlobalState'
import { array } from 'yup';

const initialState = {
   groups: [],
   isFetching: false,
   hasError: false,
};

const reducer = (state, action) => {
   switch (action.type) {
      case "FETCH_GROUPS_REQUEST":
         return {
            ...state,
            isFetching: true,
            hasError: false
         };
      case "FETCH_GROUPS_SUCCESS":
         return {
            ...state,
            isFetching: false,
            groups: action.payload
         };
      case "FETCH_GROUPS_FAILURE":
         return {
            ...state,
            hasError: true,
            isFetching: false
         };
      default:
         return state;
}
};

const Groups = () => {

   const [groupsList, setGroupsList] = useState([]);
   const [state, dispatch] = React.useReducer(reducer, initialState);
   const { state: authState } = React.useContext(AuthContext);

   useEffect (() => {

      dispatch({
         type: "FETCH_GROUPS_REQUEST"
      });
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('auth-token');
      const id = user.id;

      Axios.get(`/group/get/${id}`, {
         headers: {
            'Content-Type': 'application/json',
            'auth-token': token
         }
      })
      .then(response => {
         console.log(response.data.Groups);
         setGroupsList(response.data.Groups);
         return response;
      })
      .then(response => {
         console.log(response);
         dispatch({
            type: "FETCH_GROUPS_SUCCESS",
            payload: response
         });
      })
      .catch(error => console.error(error.response));

   }, []);
   return (
      <div>
            <Header />
            <Container className="mt--7" fluid>
               <Row>
                  <div className="col">
                     <Card className="shadow">
                        <CardHeader className="border-0">
                           <h3 className="mb-0">Groups</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                           <thead className="thead-light">
                              <tr>
                                 <th scope="col">Title</th>
                                 <th scope="col">Target</th>
                                 <th scope="col">Status</th>
                                 <th scope="col">Members</th>
                                 <th scope="col">Completion</th>
                                 <th scope="col" />
                              </tr>
                           </thead>
                           {
                              state.isFetching ? (
                                 <tbody className="card">
                                    <tr><td>LOADING...</td></tr>
                                 </tbody>
                              ) : state.hasError ? (
                                    <tbody className="card">
                                       <tr>AN ERROR HAS OCCURED</tr>
                                    </tbody>
                              ) : state.groups.length === 0 ? (

                                    <tbody>
                                       {console.log("NO GROUPS: ", state.groups.length)}
                                       No Groups Found
                                    </tbody>
                              ):

                              (


                           <tbody>
                              {
                                 groupsList.map((list) => {
                                 console.log('MEMBERS: ', list.members);
                                 console.log('TITLE: ', list.title);
                                 console.log('TARGET AMOUNT: ', list.target_amount);
                                 return (
                                    <tr key={list._id}>
                                       <th scope="row" >
                                          <Media className="align-items-center">
                                             <Media>
                                                <span className="mb-0 text-sm">
                                                   <a href={`http://127.0.0.1:5000/group/get-group/${list._id}`}>{list.title}</a>
                                                </span>
                                             </Media>
                                          </Media>
                                       </th>
                                       <td>{list.target_amount}</td>
                                       <td>
                                          <Badge color="" className="badge-dot mr-4">
                                             <i className="bg-warning" />
                                             pending
                                          </Badge>
                                       </td>
                                       <td>
                                          <div className="avatar-group">
                                             <a className="avatar avatar-sm" href="#pablo" id="tooltip742438047" onClick={e => e.preventDefault()}>
                                                <img alt="..." className="rounded-circle" src={require("assets/img/theme/team-1-800x800.jpg")} />
                                             </a>
                                             <UncontrolledTooltip delay={0} target="tooltip742438047">
                                                {list.members.first_name}
                                             </UncontrolledTooltip>
                                             <a className="avatar avatar-sm" href="#pablo" id="tooltip941738690" onClick={e => e.preventDefault()}>
                                                <img alt="..." className="rounded-circle" src={require("assets/img/theme/team-2-800x800.jpg")}/>
                                             </a>
                                             <UncontrolledTooltip delay={0} target="tooltip941738690">
                                                Romina Hadid
                                             </UncontrolledTooltip>
                                             <a className="avatar avatar-sm" href="#pablo" id="tooltip804044742" onClick={e => e.preventDefault()}>
                                                <img alt="..." className="rounded-circle" src={require("assets/img/theme/team-3-800x800.jpg")}/>
                                             </a>
                                             <UncontrolledTooltip delay={0} target="tooltip804044742">
                                                Alexander Smith
                                             </UncontrolledTooltip>
                                             <a className="avatar avatar-sm" href="#pablo" id="tooltip996637554" onClick={e => e.preventDefault()}>
                                                <img alt="..." className="rounded-circle" src={require("assets/img/theme/team-4-800x800.jpg")}/>
                                             </a>
                                             <UncontrolledTooltip delay={0} target="tooltip996637554">
                                                Jessica Doe
                                             </UncontrolledTooltip>
                                          </div>
                                       </td>
                                       <td>
                                          <div className="d-flex align-items-center">
                                             <span className="mr-2">60%</span>
                                             <div>
                                                <Progress max="100" value="60" barClassName="bg-danger"/>
                                             </div>
                                          </div>
                                       </td>
                                       <td className="text-right">
                                          <UncontrolledDropdown>
                                             <DropdownToggle className="btn-icon-only text-light" href="#pablo" role="button" size="sm" color="" onClick={e => e.preventDefault()}>
                                                <i className="fas fa-ellipsis-v" />
                                             </DropdownToggle>
                                             <DropdownMenu className="dropdown-menu-arrow" right>
                                             <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                                Action
                                             </DropdownItem>
                                             <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                                Another action
                                             </DropdownItem>
                                             <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                                Something else here
                                             </DropdownItem>
                                          </DropdownMenu>
                                          </UncontrolledDropdown>
                                       </td>
                                    </tr>
                                 )})
                              }
                           </tbody>

                           )}
                        </Table>
                        <CardFooter className="py-4"></CardFooter>
                     </Card>
                  </div>
               </Row>
            </Container>
      </div>
   );
};

export default Groups;



// eslint-disable-next-line no-lone-blocks
{/**
{list.members.map( member =>{
   return (
      <span key={list.members._id}>
         <a className="avatar avatar-sm" href="#pablo" id="tooltip742438047" onClick={e => e.preventDefault()}>
         <img alt="..." className="rounded-circle" src={require("assets/img/theme/team-1-800x800.jpg")} />
         </a>
         <UncontrolledTooltip delay={0} target="tooltip742438047">
            {list.members.first_name}
         </UncontrolledTooltip>
      </span>
   )
})}

*/}
