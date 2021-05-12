import React, { useEffect, useState } from "react";
import QuizList from "./QuizList";
import { Switch, Route, Link } from "react-router-dom";
import "../../styles/Quiz/QuizForm.css";

const QuizForm = props => {

    const [quizSize, setQuizSize] = useState();
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [isLaunched, setIsLaunched] = useState(false)
    const [isConnected, setIsConnected] = useState(false)

    const difficulties = ['Easy','Medium','Hard','Random difficulty','All difficulties']
    const numberOfQuestions = [5,10,15]

    const categories = JSON.parse(localStorage.getItem('categories'))

    useEffect(()=>{
        if(localStorage.getItem('user'))
        {
            setIsConnected(true)
        }
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get('cat');
        if(cat)
        {
            setCategory(parseInt(cat));
        }
    }, []);

    return (
        <div className="container my-auto">
            {isConnected?
                !isLaunched?
                <div className='container'>
                    <h1 className="text-center">Questionnary selector </h1>
                    <div className='category-selector'>
                        <h3 className="text-center my-3">Chose a category</h3>
                        <div className='row'>
                        {categories.map((cat, index)=>{
                            return(
                                    <div key={index} onClick={()=>setCategory(cat.id)} className={'category-selector__tile d-flex mx-3 my-2 p-2 '+ (cat.id===category? 'tile-selected':'')} >
                                        <h6 className="m-auto">{cat.name}</h6>
                                    </div>
                            )
                        })}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-center my-3">Chose a difficulty {difficulty}</h3>
                        <div className='row'>
                            {difficulties.map((diff, index)=>{
                                return(
                                    <div key={index} onClick={()=>setDifficulty(diff)} className={'difficulty-selector__tile d-flex mx-3 my-2 p-2 '+ (difficulty===diff? 'tile-selected':'')}>
                                        <h6 className="m-auto">{diff}</h6>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-center my-3">Chose a number of questions</h3>
                        <div className='row'>
                        {numberOfQuestions.map((nb,index)=>{
                            return(
                                <div key={index} className={'number-selector__tile d-flex mx-3 my-2 p-2 '+ (quizSize===nb? 'tile-selected':'')} onClick={(e)=>setQuizSize(nb)}>
                                    <h6 className="m-auto">{nb}</h6>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div>
                            <button className="btn btn-custom-primary" disabled={!(category&&difficulty&&quizSize)} onClick={()=>{setIsLaunched(true)} }>Launch the questionnary</button>
                    </div>  
                </div>
                :
                <QuizList category={category} difficulty={difficulty} quizSize={quizSize} />
                :
                <p>You have to log in to play !<br/>
                    <Link to='/profile'>No account? Create it now!</Link></p>}
        </div>
    )
}

export default QuizForm;  