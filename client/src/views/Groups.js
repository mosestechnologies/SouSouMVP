import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Container,
  CardFooter,
  DropdownToggle,
  DropdownMenu,
  Modal,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem,
  Media,
  Progress,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import Paginations from "./Pagination";
import Header from "components/Headers/Header.js";
import Axios from "axios";
import { AuthContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { array, reach } from "yup";
import { updateArrayBindingPattern } from "typescript";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
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
        hasError: false,
      };
    case "FETCH_GROUPS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        groups: action.payload,
      };
    case "FETCH_GROUPS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};

const initialUpdateState = {
  groupId: null,
  title: "",
  membersLimit: "",
};
const Groups = () => {
  const [UpdateData, setUpdateData] = useState(initialUpdateState); // pass initial state
  // const [currentPage, setCurrentPage] = useState(1);
  const [groupsList, setGroupsList] = useState([]);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { state: authState } = React.useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [currentGroupPage, setCurrentGroupPage] = useState(1);
  const [totalGroups, setTotalGroups] = useState();

  const handleOnChange = (event) => {
    setUpdateData({
      ...UpdateData,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnEdit = (groupId) => {
    setUpdateData({
      ...UpdateData,
      groupId: groupId,
      userID: authState.user.id,
    });
    toggle();
  };

  const DeletePopup = () => (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Edit Group Settings
      </ModalHeader>
      <ModalBody></ModalBody>
    </Modal>
  )
  const handleOnDelete = async (groupID) => {
    console.log("GROUP ID:::>>> ", groupID)
    if (!window.confirm('are you sure')) return false;
    const req = await Axios.delete(`/group/delete-group/${groupID}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": authState.token,
      },
    })
    .then( response => {
      toast.info('Group Deleted!!');
      window.location.reload();
    })
    .catch( error => {
      console.log('ERROR: DELETING: ', error);
      toast.error('ERROR!! Deleting Group')
    })
  };

  const handleOnClick = () => {
    // setUpdateData({
    //   ...UpdateData,
    //   groupId: groupId,
    // });
    toggle();
    Axios.post(`/group/update/${UpdateData.groupId}`, UpdateData, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": authState.token,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // console.log(request.data);
  };

  const paginate = (pageNumber) => {
    console.log(pageNumber);
    setCurrentGroupPage(pageNumber);
    // groupfetch();
  };
  useEffect(() => {
    dispatch({
      type: "FETCH_GROUPS_REQUEST",
    });
    //  const user = JSON.parse(localStorage.getItem("user"));
    const user = authState.user;
    const token = authState.token;
    //  const token = localStorage.getItem("auth-token");
    const id = authState.user?.id;
    const body = {
      role: user.role,
      id: id,
    };
    // clg
    if (authState.user.role === "admin") {
      const groupfetch = async () => {
        dispatch({
          type: "FETCH_GROUPS_REQUEST",
        });
        const req = await Axios.post(
          `/admin/groups/${currentGroupPage}`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        dispatch({
          type: "FETCH_GROUPS_SUCCESS",
          payload: req,
        });
        const posts = req.data.total_groups;

        setTotalGroups(posts);
        const data1 = req.data.groups;
        // console.log(data1);
        setGroupsList(data1);
      };
      groupfetch();
    } else {
      Axios.get(`/group/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then((response) => {
          //console.log(response.data.Groups);
          setGroupsList(response.data.Groups);
          return response;
        })
        .then((response) => {
          console.log(response);
          dispatch({
            type: "FETCH_GROUPS_SUCCESS",
            payload: response,
          });
        })
        .catch((error) => {
          console.log(error.request);
          dispatch({
            type: "FETCH_GROUPS_FAILURE",
          });
        });
    }
  }, [currentGroupPage]);

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
                {state.isFetching ? (
                  <tbody className="card">
                    <tr>
                      <td>LOADING...</td>
                    </tr>
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
                ) : (
                  <tbody>
                    {groupsList?.map((list) => {
                      // console.log("MEMBERS: ", list.members);
                      // console.log("TITLE: ", list.title);
                      // console.log("TARGET AMOUNT: ", list.target_amount);
                      return (
                        <tr key={list._id}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <Media>
                                <span className="mb-0 text-sm">
                                  <Link to={`/group/${list._id}`}>
                                    {list.title}
                                  </Link>
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
                              {`${list.members.length} / ${list.members_limit}`}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">
                                {Math.ceil(
                                  (list.members.length / list.members_limit) *
                                    100
                                )} %
                              </span>
                              <div>
                                <Progress
                                  max="100"
                                  value={Math.ceil(
                                    (list.members.length / list.members_limit) *
                                      100
                                  )}
                                  barClassName="bg-danger"
                                />
                              </div>
                            </div>
                          </td>

                          {list?.cycle_status.length == 0 ? (
                            authState.user.id == list.created_by ? (
                              <td className="text-right">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-arrow" right >
                                    <DropdownItem onClick={() => handleOnEdit(list._id)}>
                                      Edit
                                    </DropdownItem>
                                    <DropdownItem onClick={() => handleOnDelete(list._id)}>
                                      Delete
                                    </DropdownItem>
                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle}>
                                        Edit Group Settings
                                      </ModalHeader>
                                      <ModalBody>
                                        <Label>Title</Label>
                                        <Input
                                          name="title"
                                          type="text"
                                          value={UpdateData.title}
                                          onChange={handleOnChange}
                                        />
                                        <Label>Members Limit</Label>
                                        <Input
                                          name="membersLimit"
                                          type="number"
                                          onChange={handleOnChange}
                                          value={UpdateData.membersLimit}
                                        />{" "}
                                        <Label>Payment Frequency</Label>
                                        <Input
                                          name="paymentfrequency"
                                          type="number"
                                          value={UpdateData.paymentfrequency}
                                          onChange={handleOnChange}
                                        />
                                        <Label>Target Amount</Label>
                                        <Input
                                          name="targetAmount"
                                          type="number"
                                          value={UpdateData.targetAmount}
                                          onChange={handleOnChange}
                                        />
                                        <Label>Payment Interval</Label>
                                        <Input
                                          name="paymentInterval"
                                          type="text"
                                          value={UpdateData.paymentInterval}
                                          onChange={handleOnChange}
                                        />
                                        <div className="form-group"></div>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          color="primary"
                                          onClick={() => handleOnClick()}
                                        >
                                          Save Settings
                                        </Button>{" "}
                                        <Button
                                          color="secondary"
                                          onClick={toggle}
                                        >
                                          Cancel
                                        </Button>
                                      </ModalFooter>
                                    </Modal>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            ) : (
                              <td></td>
                            )
                          ) : (
                            <td></td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table>

              <CardFooter className="py-4">
                <Paginations totalposts={totalGroups} paginate={paginate} />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Groups;

// eslint-disable-next-line no-lone-blocks
{
  /**
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

*/
}
