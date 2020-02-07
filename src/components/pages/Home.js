import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const Home = props => {

    const [bestScores, setBestScores] = useState([])
    const [bestUsers, setBestUsers] = useState([])
    const categories = JSON.parse(localStorage.getItem('categories'))

    useEffect(() => {
        const url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/scores";
        axios.get(url).then(response => {
            let array = [response.data[0], response.data[1], response.data[2]]
            setBestScores(array)
            var users = []
            array.map((score,id)=>{   
                let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/users/"+score.user
                axios.get(url).then((response) => {
                    users[id]=response.data.username
                    if(id===2) setBestUsers(users)
                })
            })
        })
    }, []);

    return(
    <>
        <div className="container">
            <div className="text-center my-5">
                <h1 className="my-5">QWIZ - Let's do some Quizz !</h1>
                <Link to="/play"><button className="btn btn-custom-primary"><h1>Play now</h1></button></Link>
            </div>
            <div>
                <h2 className="text-center my-5">Best scores</h2>
                <div className="row ml-5">
                {bestScores.map((bestScore, id)=>{
                        return(
                        <div key={id} className="col-4">
                            <h3><span className="impact"> {id+1}. {bestScore.score} points</span></h3>
                            <h6>Scored by <span className="impact">{bestUsers[id]}</span> <br/>
                            Category : {bestScore.category} <br/>
                            Difficulty : {bestScore.difficulty}</h6>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="my-3">
                <h2 className="text-center my-5" >Categories</h2>
                <div className="row ml-5">
                    <div className="col-6">
                        {categories.map((category, index)=>{
                    if(index<(categories.length/2))
                        return(<li key={index}><Link to={"/play?id="+category.id}>{category.name}</Link></li>)})}
                    </div>
                    <div className="col-6">
                        {categories.map((category, index)=>{
                    if(index>=(categories.length/2))
                        return(<li key={index}><Link to={"/play?id="+category.id}>{category.name}</Link></li>)})}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home;