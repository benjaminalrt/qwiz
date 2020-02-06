import React from 'react';
import { Switch, Route, Link } from "react-router-dom";

const Home = props => {


    return(
    <>
        <div className="container">
            <div className="text-center">
                <h2>QWIZ</h2>
                <button className="btn btn-danger"><h1>Play now</h1></button>
            </div>
            <div className="row">
                <div className="col-4">
                    <h3>Categories</h3>
                    <ul>
                        {props.categories.map((category, index)=>{
                            return(<li key={index}><Link to={"/play?id="+category.id}>{category.name}</Link></li>)
                        })}
                    </ul>
                </div>
                <div className="col-8">
                    <h3>Most played categories</h3>
                    <div className="row">
                        <div className="col-4">
                            <h1>Cat1</h1>
                        </div>
                        <div className="col-4">
                            <h1>Cat2</h1>
                        </div>
                        <div className="col-4">
                            <h1>Cat3</h1>
                        </div>
                    </div>
                    <h3>Best players</h3>
                    <div className="row">
                        <div className="col-4">
                            <h1>User1</h1>
                        </div>
                        <div className="col-4">
                            <h1>User2</h1>
                        </div>
                        <div className="col-4">
                            <h1>User3</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home;