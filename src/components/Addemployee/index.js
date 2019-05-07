import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Addemployee({ showMe2, hideShow2, name, lastName, email,password, handleInputChange, handleFormSubmit }) {
  return (

    <div>

    {showMe2 ?
      <div className="overlay1">
        <div className="wrapper1">
        <div className="wrapper2">
        <div className="wrapper3">
      <div>
      <div> New Employee Form</div>
    <form>
      <div className="form-group">
      <div>
      
        </div>
        <div>
        <label>
          <strong>Name</strong>
        </label>
        <div>
        <input
                  //  handleInputChange={this.handleInputChange}
                  //  id={this.state.id}
                  //   restaurant={this.state.restaurant}
                  //   name={this.state.name}
                  //   lastName={this.state.lastName}
                  //   email={this.state.email}
                  //   password={this.state.password}
          className="form-control"
          id=""
          type="text"
          value={name}
          placeholder="First Name"
          name="name"
          onChange={handleInputChange}
          required
        />
        </div>
        
<label>
          <strong>Last Name</strong>
        </label>
        <div>
        <input
          className="form-control"
          id=""
          type="text"
          value={lastName}
          placeholder="Last Name"
          name="lastName"
          onChange={handleInputChange}
          required
        />
        </div>
</div>

<div>
<label>
          <strong>Email</strong>
        </label>
        <div>
        <input
          className="form-control"
          id=""
          type="email"
          value={email}
          placeholder="Email Address"
          name="email"
          onChange={handleInputChange}
          required
        />
        </div>

<label>
          <strong>Password</strong>
        </label>
        <div>
        <input
          className="form-control"
          id=""
          type="password"
          value={password}
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          required
        />
        </div>
</div>
      </div>

      <div className="pull-right">

        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-danger float-right"
        >
          Submit
        </button>
      </div>
    </form>
    </div>


<br></br>

    <button onClick={() => hideShow2()}>CLOSE</button>

    <div><Link
            className={window.location.pathname === "/employeepage" ? "nav-link active" : "nav-link"} 
            to="/employeepage"
          ><button>
            Emplyee page
            </button>
              </Link></div>
    </div>
    </div>
      </div>
      </div>
      :null
    }

    </div>
  );
}

export default Addemployee;
