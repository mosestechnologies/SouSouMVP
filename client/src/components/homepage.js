import React from 'react';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {
  return (     <div>
   
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      {/* Indicators */}
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to={0} className="active" />
        <li data-target="#myCarousel" data-slide-to={1} />
      </ol>
      {/* Wrapper for slides */}
      <div className="carousel-inner" role="listbox">
        <div className="item active">
          <img src="https://placehold.it/1200x400?text=IMAGE" alt="Image" />
          <div className="carousel-caption">
            <h3>Sell $</h3>
            <p>Money Money.</p>
          </div>      
        </div>
        <div className="item">
          <img src="https://placehold.it/1200x400?text=Another Image Maybe" alt="Image" />
          <div className="carousel-caption">
            <h3>More Sell $</h3>
            <p>Lorem ipsum...</p>
          </div>      
        </div>
      </div>
      {/* Left and right controls */}
      <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
    <div className="container text-center">    
      <h3>What We Do</h3><br />
      <div className="row">
        <div className="col-sm-4">
          <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
          <p>Current Project</p>
        </div>
        <div className="col-sm-4"> 
          <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style={{width: '100%'}} alt="Image" />
          <p>Project 2</p>    
        </div>
      
      </div>
    </div><br />
   
  </div>
  
  );
}

export default App;
