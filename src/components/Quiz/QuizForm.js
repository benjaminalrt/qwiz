import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import QuizList from "./QuizList";
import "../../styles/Quiz/QuizForm.css";

import axios from "axios";

const QuizForm = props => {

    const [categories, setCategories] = useState([])
    const [quizSize, setQuizSize] = useState();
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const difficulties = ['Easy','Medium','Hard','Random difficulty','All difficulties']
    const specialCategories = [ {'id':200, 'name':'Each category'},{'id':100, 'name':'Any category'}]
    const numberOfQuestions = [5,10,15]
    const newUser = {username: "fanny", password: "benjidou", email: "5fsd54.com"}

    useEffect(() => {
        const url = "https://opentdb.com/api_category.php";
        const url2 = "https://api.alerte.mmi-unistra.fr/api-qwiz/api.php/users";
        axios.post(url2, newUser).then(response => {
            console.log(response.data);
        })
        axios.get(url).then(response => {
            let array = response.data.trivia_categories
            console.log(array)
            array.sort((a,b)=>{
                if(a.name<b.name) return -1
                else return 1;
            })
            setCategories(array.concat(specialCategories))
        });
    }, []);

    return (
        <Switch>
            <Route path="/quiz/chose">
                <div className='container-fluid'>
                    <h2>Questionnary selector</h2>
                    <div className='category-selector'>
                        <h3>Chose a category {category}</h3>
                        <div className='row'>
                        {categories.map((cat, index)=>{
                            return(
                                    <div key={index} onClick={()=>setCategory(cat.id)} className={'category-selector__tile mx-3 my-2 p-2 '+ (cat.id===category? 'tile-selected':'')} >
                                        <h6 >{cat.name}</h6>
                                    </div>
                            )
                        })}
                        </div>
                    </div>

                    <div>
                        <h3>Chose a difficulty {difficulty}</h3>
                        <div className='row'>
                            {difficulties.map((diff, index)=>{
                                return(
                                    <div key={index} onClick={()=>setDifficulty(diff)} className={'difficulty-selector__tile mx-3 my-2 p-2 '+ (difficulty===diff? 'tile-selected':'')}>
                                        <h6>{diff}</h6>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h3>Chose a number of questions {quizSize}</h3>
                        {numberOfQuestions.map((nb,index)=>{
                            return(
                                <div key={index}>
                                    <input name='nbQ' id={'nbQ'+index} type='radio' value={nb} onChange={(e)=>setQuizSize(e.target.value)} />
                                    <label htmlFor={'nbQ'+index}>{nb}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <Link to="/quiz/play">
                            <button disabled={!(category&&difficulty&&quizSize)} onClick={()=>console.log(category.id===100? //Vérification si on veut une catégorie aléatoire
                        categories[Math.floor(Math.random() * categories.length-2).id]
                        :
                        category.id===200? '' : category)}>Launch the questionnary</button>    
                        </Link>
                    </div>  
                </div>
            </Route>
            <Route path="/quiz/play">
                <QuizList
                    category={category===100? //Vérification si on veut une catégorie aléatoire
                        categories[Math.floor(Math.random() * categories.length-2)].id
                        :
                        category===200? '' : category} //Vérification si on veut une diff précise ou toutes les diff

                    difficulty={difficulty==='Random difficulty'? //Vérification si on veut une diff aléatoire
                        ['easy','medium','hard'][Math.floor(Math.random() * 3)].toLowerCase()
                        :
                        difficulty==='All difficulties'? '' : difficulty.toLowerCase()} //Vérification si on veut une diff précise ou toutes les diff

                    quizSize={quizSize} />
            </Route>
        </Switch>
    )
}

export default QuizForm;  