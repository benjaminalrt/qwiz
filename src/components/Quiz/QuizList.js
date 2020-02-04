import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import axios from "axios";
import { utf8 } from "../../utils"


const QuizList = props => {
    const [isLoaded, setIsLoaded] = useState(false); // Etat de chargement de l'API

    const [questions, setQuestions] = useState([]); // Liste de questions
    const [index, setIndex] = useState(0); // Index de la question actuelle

    const [answer, setAnswer] = useState(''); // Réponse donnée par l'utilisateur à une question
    const [answers, setAnswers] = useState([]); // Liste des réponses données par l'utilisateur
    const [score, setScore] = useState(0); // Score de l'utilisateur

    useEffect(() => {
        const url = "https://opentdb.com/api.php?amount="+props.quizSize+"&category="+props.category+"&difficulty="+props.difficulty
        axios.get(url).then(response => {
            console.log(response.data.results)
            console.log(url)
            setQuestions(response.data.results);
            setIsLoaded(isLoaded => !isLoaded);
        });
    }, [props.quizSize, props.category, props.difficulty]);

    const changeQuestion = ()=>{
        if(answer===questions[index].correct_answer)
            setScore(score+1)
        // stockage des réponses de l'utilisateurs
        setAnswers(answers.concat(answer))
        // réinitialisation de la réponse donnée par l'utilisateur
        setAnswer('')
        // on passe à la question suivante
        setIndex(index+1)
    }

    const handleChange = (e)=>{
        setAnswer(e.target.value)
    }


    /* QUESTIONS LOOK    LIKE :   
        { category: "", correct_answer: "", difficulty: "", incorrect_answers: (n) [], question: "", type: "multiple/boolean" }
    */


    
    return (
        <div>
        {/* Chargmement en attendant que l'API nous a bien envoyé les données*/}
        {isLoaded ?
            // Tant que le questionnaire n'est pas finis, on affiche les questions successivement
            (index+1)<=questions.length?
                <>
                    <QuizQuestion
                        question={questions[index]}
                        index={index}
                        handleChange={(e)=>handleChange(e)}
                        key={'question'+index}
                    />
                    
                    {answer? <p>Chosen answer: {utf8(answer)}</p> : <p>Choisir une réponse.</p>}
                    
                    <button onClick={()=>{changeQuestion()}} disabled={!answer}>Validate</button>
                </>
                :
                <>
                    <p>Questionnaire terminé.</p>
                    <div>
                        <p>Score: {(100*score)/questions.length} points.</p>
                        <p>Correct answers: {score}/{questions.length}.</p>
                        <div>
                            <p>Your answers:</p>
                            <ul>
                                {questions.map((question,index)=>
                                {return(
                                    <li key={index}>
                                            <p>
                                                {'Question '+(index+1)+': '+utf8(question.question)}<br/>
                                                {'Your response: '+answers[index]+'.'}
                                                {answers[index]===question.correct_answer?
                                                <>It's a good answer !</>
                                                :<>That's a bad answer.<br/>
                                                The good answer was '{utf8(question.correct_answer)}'</>}
                                            </p>
                                    </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Link to="/quiz/chose">
                                <button>HEY</button>
                        </Link>
                    </div>
                </>
        : <p>Loading...</p>
        }
        </div>
    )

}

export default QuizList;