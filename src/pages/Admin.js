import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import Restowine from "../components/Restowine";
import Employees from "../components/Employees";
import Addemployee from "../components/Addemployee";
// import Footer from "../components/Footer";
import Header from "../components/Header";
import Userinfo from "../components/Userinfo";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { List } from "../components/List";
import { Link } from "react-router-dom";
import "./style.css";

class Admin extends Component {
  state = {
    restaurants: [],
    employees: [],
    winesMaster: [],
    wineCollections:[],

    showMe: false,
    showMe2: false,
    // text: "add wine",
    wineId: "",
    wineName: "",
    wineacidity: "",
    wineageability: "",
    winealcohol: "",
    winebody: "",
    winedecant: "",
    wineglassType: "",
    winepairings: "",
    wineprimaryFlavors: [],
    winepronunciation: "",
    winesummary: "",
    winesweetness: "",
    winetannin: "",
    winetemp: "",

    restaurantData:[],
    user: [],
    restaurantId: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    // loginemail: "",
    // loginpassword: "",
    loggedIn: true,
    redirectTo: null,



    ownerName:"",
    ownerLastName:"",
    ownerEmail: "",
    showMe3: false

  };

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    API.getUser().then(response => {
      console.log("LOGGED IN USER: ", response)
      if (!!response.data.user) {
        console.log('THERE IS A USER');
        console.log(response.data);
        this.setState({
          loggedIn: true,
          user: response.data.user
        })

        this.getSavedWine()
      } else {
        this.setState({
          loggedIn: false,
          user: null,
          redirectTo: "/"
        });
      }
    });
  }
  hideShow2 = () => {
    const newState = { ...this.state }
    newState.showMe2 = !newState.showMe2
    newState.scale = this.state.scale > 1 ? 1 : 1.5

    this.setState(newState);
  }

  hideShow = id => {
    const newState = { ...this.state }
    const wine = this.state.wineCollections.find(wine => wine._id === id);
    // newState.wineId = wine.wine.aciditysa
    newState.wineId = id
    newState.wineName = wine.name
    newState.wineacidity = wine.acidity
    newState.wineageability = wine.ageability
    newState.winealcohol = wine.alcohol
    newState.winebody = wine.body
    newState.winedecant = wine.decant
    newState.wineglassType = wine.glassType
    newState.winepairings = wine.pairings
    newState.wineprimaryFlavors = wine.primaryFlavors
    newState.winepronunciation = wine.pronunciation
    newState.winesummary = wine.summary
    newState.winesweetness = wine.sweetness
    newState.winetannin = wine.tannin
    newState.winetemp = wine.temp
    newState.showMe = !newState.showMe
    newState.scale = this.state.scale > 1 ? 1 : 1.5

    this.setState(newState);
  }

  hideShow3 = ()=> {
    const newState = { ...this.state }
    // const owner = this.state.user.find(owner => owner._id === id);

    // newState.ownerId = id
    // newState.ownerName = owner.firstName
    // newState.ownerLastName = owner.lastName
    // newState.ownerEmail = owner.email
    newState.showMe3 = !newState.showMe3

    this.setState(newState);
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value

    });
  };
  handleLogout = event => {
    event.preventDefault();
    console.log('logging out');
    API.logOut().then(response => {
      console.log(response.data);
      this.setState({
        loggedIn: false,
        user: null,
      })
      this.props.history.push(`/`);
    });
  };

  getSavedWine = () => {
    console.log("////////////////");
    console.log(this.state.user.email);
    console.log("////////////////");
    const admin = { email: this.state.user.email };
    API.getSavedWine(admin)
      .then(res => {
        console.log(res.data);
        console.log(res.data._id);
        // console.log(res.data._id);
        // console.log(res.data[0]);
        console.log("SAVESTAFF");
        console.log(res.data.Employees);
        console.log("SAVESTAFF");
        this.setState({
          employees: res.data.Employees,
          wineCollections: res.data.Wines,
          restaurantId: res.data._Id,
          restaurantData: res.data
        })
      }

      )
      .catch(() =>
        this.setState({
          message: "Wine not available"
        })
      );
  };
  handleAddEmployeeChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    });
  }
  handleAddEmpolyeeFormSubmit = event => {
    event.preventDefault();
    this.addEmployee();
  }

  addEmployee = () => {
    console.log("???????????????");
    console.log(this.state);
    console.log("REID: " + this.state.restaurantId);

    const { name, lastName, email, password, restaurantId } = this.state;
    const employeeData = { name, lastName, email, password, restaurantId };
    console.log(employeeData);
    API.addEmployee(employeeData).then((res) => {
      console.log("ADD Employees");
      console.log(res.data.employee);
      console.log(res.data.restaurant);
      if (res.data==="Employee already exists") {
        alert(res.data)
      }
      else{
      this.setState({
       employees: res.data.Employees
      });
    }
    });
  }


  // getSavedEmployee = () => {
  //   API.getSavedEmployee()
  //     .then(res =>
  //       this.setState({
  //         employees: res.data
  //       })
  //     )
  //     .catch(err => console.log(err));
  // };

  handleWineDelete = (id, restId) => {

    // const rest = this.state.restaurantData.find(rest => rest._id === restId);
    console.log("RESTA: " + this.state.restauran)
    const wineData = {
      Wines: id,
      restaurantId: restId
    }


    API.deleteWine(wineData).then(res => this.componentDidMount());

  };


//   handleWineAdd = id => {
//   console.log("???????????????");
//   console.log(this.state);
//   console.log("REID: " + this.state.restaurantId);
//   const wine = this.state.winesMaster.find(wine => wine._id === id);
//   const wineData = {
//     Wines: wine._id,
//     restaurantId: this.state.restaurantId
//     }
//     console.log("ADDWINE INFOR");
//     console.log(wineData);
//     console.log("ADDWINE INFOR");

//   API.addWine(wineData).then(res => {
//     console.log("ADD WINE");
//     console.log(res.data.Wines);
//     console.log("ADD WINE");
//     this.setState({
//       wineCollections: res.data.Wines
//     });
  
//   });
// }

  handleEmployeeDelete = (id, restId) => {
    console.log(restId)
    API.deleteEmployee(id).then(res => this.getSavedEmployee());
  };

  render() {
    return (

      <Container>

<Userinfo
          id={this.state.user._id}
          firstName={this.state.user.firstName}
          lastName={this.state.user.lastName}
          email={this.state.user.email}
          showMe3={this.state.showMe3}
          hideShow3={this.hideShow3}
          restaurantId={this.state.restaurantId}
        ></Userinfo>

        {/* MODAL ----------------------- */}
        <Addemployee
          handleAddEmployeeChange={this.handleAddEmployeeChange}
          handleAddEmpolyeeFormSubmit={this.handleAddEmpolyeeFormSubmit}
          id={this.state.id}
          restaurant={this.state.restaurant}
          name={this.state.name}
          lastName={this.state.lastName}
          email={this.state.email}
          password={this.state.password}
          //  loginemail={this.state.loginemail}
          //  loginpassword={this.state.loginpassword}
          showMe2={this.state.showMe2}
          hideShow2={this.hideShow2}
        ></Addemployee>

        {/* MODAL ----------------------- */}

        {/* <Jumbotron>
          <h1 className="text-center">
            <strong>ADMIN PAGE WINE COLLECTIONS & EMPLOYEE LIST</strong>
          </h1>
          <h2 className="text-center">Search for wine collections and Add Employees</h2>
        </Jumbotron> */}

        <div className="wineandemployeewrapper">
          <div className="brandCol">
            <div>
              <div></div>
              
              <div><button onClick={() => this.hideShow3()}><Header user={this.state.user} /></button></div>
              <Link className="navbar-brand" to="/">
                <i className="fas fa-wine-glass-alt"></i> Wine academy
        </Link>
            </div>
            <div>
              <button onClick={this.handleLogout} type="submit" className="btn btn-lg btn-danger float-right">
                Logout
         </button>


            </div>

          </div>
          <div className="wineCol">
            <div className="wineTitleWrap">
              <div className="wineTitleWrap1">
                <div>Wine</div>
                <div><Link
                  className={window.location.pathname === "/wines" ? "nav-link active" : "nav-link"}
                  to="/wines"
                ><button>
                    Add Wine
            </button>
                </Link></div>
              </div>
            </div>
            <div className="wineColWrap">
              <div className="wineColWrap1">
                {this.state.wineCollections.length ? (
                  <List>
                    {this.state.wineCollections.map(wine => (
                      <Restowine
                        key={wine._id}
                        id={wine._id}
                        name={wine.name}
                        handleWineDelete={this.handleWineDelete}
                        restId = {this.state.restaurantId}
                        showMe={this.state.showMe}
                        hideShow={this.hideShow}
                        wineName={this.state.wineName}
                        wineId={this.state.wineId}
                        wineacidity={this.state.wineacidity}
                        wineageability={this.state.wineageability}
                        winealcohol={this.state.winealcohol}
                        winebody={this.state.winebody}
                        winedecant={this.state.winedecant}
                        wineglassType={this.state.wineglassType}
                        winepairings={this.state.winepairings}
                        wineprimaryFlavors={this.state.wineprimaryFlavors}
                        winepronunciation={this.state.winepronunciation}
                        winesummary={this.state.winesummary}
                        winesweetness={this.state.winesweetness}
                        winetannin={this.state.winetannin}
                        winetemp={this.state.winetemp}

                      />
                    ))}
                  </List>
                ) : (
                    <h2 className="text-center">Not Available</h2>
                  )}
              </div>
            </div>
          </div>
          {/* -----------------EMPLOYEES COLUMN------------------- */}
          <div className="employeeCol">
            <div className="empTitleWrap">
              <div className="empTitleWrap1">
                <div>Employees</div>
                <div><button onClick={() => this.hideShow2()}>Add Employee</button></div>
              </div>
            </div>

            <div className="employeeColWrap">
              <div className="employeeColWrap1">
                {this.state.employees.length ? (
                  <List>
                    {this.state.employees.map(employee => (
                      <Employees
                        key={employee}
                        id={employee.firstName}
                        // title={employee.title}
                        // subtitle={employee.subtitle}
                        // link={employee.link}
                        // authors={employee.authors.join(", ")}
                        // description={employee.description}
                        // image={employee.image}
                        Button={() => (
                          <button
                            onClick={() => this.handleEmployeeDelete(employee._id)}
                            className="btn btn-danger ml-2"
                          >
                            Delete
                        </button>
                        )}
                      />
                    ))}
                  </List>
                ) : (
                    <h2 className="text-center">Add Employees</h2>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* 
        <Footer /> */}
      </Container>
    );
  }
}

export default Admin;
