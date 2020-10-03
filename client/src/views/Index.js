import React, { useContext, useState, useEffect, useHistory } from "react";

// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
import Paginations from "./Pagination";
import { Link } from "react-router-dom";

// react plugin used to create charts
import { Badge, Media, UncontrolledTooltip } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import Axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { AuthContext } from "context/GlobalState";
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
const reducer1 = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};
const initialState = {
  groups: [],
  isFetching: false,
  hasError: false,
};
const initialStateUsers = {
  users: [],
  isFetching: false,
  hasError: false,
};
function Index() {
  // const { state } = React.useContext(AuthContext);
  const { state: authState } = React.useContext(AuthContext);
  const [currentGroupPage, setCurrentGroupPage] = useState(1);
  const [currentUserPage, setCurrentUserPage] = useState(1);

  const [usersList, setUsersList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [userState, dispatch1] = React.useReducer(reducer1, initialStateUsers);

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const user = authState.user;
  const token = authState.token;
  //  const token = localStorage.getItem("auth-token");
  const id = authState.user?.id;
  const body = {
    role: user.role,
    id: id,
  };
  // console.log(userState);

  const paginate = (pageNumber) => {
    console.log(pageNumber);
    setCurrentUserPage(pageNumber);
    // groupfetch();
  };
  useEffect(() => {
    if (authState.user.role === "admin") {
      const fetchData = async () => {
        dispatch1({
          type: "FETCH_USERS_REQUEST",
        });
        const request = await Axios.post(
          `users/${currentUserPage}`,
          body,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        dispatch1({
          type: "FETCH_USERS_SUCCESS",
          payload: request.data,
        });

        const data = request.data.users;

        const total_users = request.data.total_users;
        // console.log(total_users);
        setTotalUsers(total_users);
        setUsersList(data);
      };
      fetchData();
    }
  }, [currentUserPage]);

  useEffect(() => {
    if (authState.user.role === "admin") {

      const groupfetch = async () => {
        dispatch({
          type: "FETCH_GROUPS_REQUEST",
        });
        const req = await Axios.post(
          `groups/${currentGroupPage}`,
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

        const data1 = req.data.groups;
        // console.log(data1);
        setGroupsList(data1);
      };
      groupfetch();
    } else {
   
      const groupfetch = async () => {
        dispatch({
          type: "FETCH_GROUPS_REQUEST",
        });
        const req = await Axios.get(`/group/get/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        dispatch({
          type: "FETCH_GROUPS_SUCCESS",
          payload: req,
        });

        const data1 = req.data.Groups;
        setGroupsList(data1);
      };
      groupfetch(); 
    }
  }, []);


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {authState.user.role === "admin" ? (
          <>
     
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="6">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Active Groups</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/group" color="primary" size="sm">
                          See all
                        </Link>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Target</th>
                        <th scope="col">Members</th>
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
                        No Groups Found
                      </tbody>
                    ) : (
                      <tbody>
                        {groupsList ?.map((list) => {
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
                                    <div className="avatar-group">
                                      {`${list.members.length} / ${list.members_limit}`}
                                    </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </Table>
                </Card>
              </Col>
              <Col className="" xl="6">
                <CardHeader className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">All Users</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href=""
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>

                        <th scope="col" />
                      </tr>
                    </thead>
                    {userState.isFetching ? (
                      <tbody className="card">
                        <tr>
                          <td>LOADING...</td>
                        </tr>
                      </tbody>
                    ) : userState.hasError ? (
                      <tbody className="card">
                        <tr>AN ERROR HAS OCCURED</tr>
                      </tbody>
                    ) : userState.users.length === 0 ? (
                      <tbody>No Users Found</tbody>
                    ) : (
                      <tbody>
                        {usersList?.map((item) => {
                          return (
                            <tr key={item._id}>
                              <th scope="row">{item.username}</th>
                              <td>{item.email}</td>
                              <td>{item.role}</td>
                              <td>{item.status}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </Table>
                </CardHeader>
                <CardFooter className="py-4">
                  <Paginations totalusers={totalUsers} paginate={paginate} />
                </CardFooter>
              </Col>
            </Row>
          </>
        ) : (
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Active Groups</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Target</th>
                      <th scope="col">Members</th>
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
                      {groupsList.map((list) => {
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
                              <div className="avatar-group">
                                {`${list.members.length} / ${list.members_limit}`}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </Table>
              </Card>
            </Col>
            <Col xl="4"></Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Index;
