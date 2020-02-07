import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuizQuestion from "./QuizQuestion";
import axios from "axios";
import { utf8 } from "../../utils"


const QuizList = props => {
    const [isLoaded, setIsLoaded] = useState(false); // Etat de chargement de l'API
    const [isFinished, setIsFinished] = useState(false)

    const [questions, setQuestions] = useState([]); // Liste de questions
    const [index, setIndex] = useState(0); // Index de la question actuelle

    const [answer, setAnswer] = useState(''); // Réponse donnée par l'utilisateur à une question
    const [answers, setAnswers] = useState([]); // Liste des réponses données par l'utilisateur
    const [score, setScore] = useState(0); // Score de l'utilisateur


    const categories = JSON.parse(localStorage.getItem('categories'))

    useEffect(() => {
        var cat = props.category
        var dif = props.difficulty.toLowerCase()
        if (props.category===100)
            cat = categories[Math.floor(Math.random() * categories.length-2)].id
        else if (props.category===200)
            cat = ''
        if (props.difficulty==='Random difficulty')
            dif = ['easy','medium','hard'][Math.floor(Math.random() * 3)]
        else if (props.difficulty==='All difficulties')
            dif = ''
        
        const url = "https://opentdb.com/api.php?amount="+props.quizSize+"&category="+cat+"&difficulty="+dif
        axios.get(url).then(response => {
            setQuestions(response.data.results);
            setIsLoaded(true);
        });
    }, [props.quizSize, props.category, props.difficulty]);

    const changeQuestion = ()=>{
        let i = index;
        let s = score;
        setIsLoaded(false)
        if(answer===questions[i].correct_answer)
        {
            s++
            setScore(s)
        }
        // stockage des réponses de l'utilisateurs
        setAnswers(answers.concat(answer))
        // réinitialisation de la réponse donnée par l'utilisateur
        setAnswer('')
        // on passe à la question suivante
        i++
        setIndex(i)
        if((i+1)>questions.length){
            storeScore(s)
        }
        else{
            setIsLoaded(true)
        }
    }

    const storeScore = (s)=>{
        let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/scores"
        let totalScore = (100*s)/questions.length
        let category = JSON.parse(localStorage.getItem('categories')).find(x => x.id == props.category).name;
        let userScore = {score: totalScore, category: category, difficulty: props.difficulty, size: props.quizSize, username: localStorage.getItem('user')}
        axios.post(url, userScore).then(response =>{
            console.log(response.data)
        }).then(setIsFinished(true)).then(setIsLoaded(true));
}

    const handleClick = (answer)=>{
        setAnswer(answer)
    }

    return (
        <>
        {/* Chargmement en attendant que l'API nous a bien envoyé les données*/}
        {isLoaded ?
            // Tant que le questionnaire n'est pas finis, on affiche les questions successivement
            (!isFinished ?
                <>
                    <QuizQuestion
                        question={questions[index]}
                        index={index}
                        handleClick={handleClick}
                        answer={answer}
                        key={'question'+index}
                    />
                    
                    <button className="btn btn-custom-primary d-block mx-auto" onClick={()=>{changeQuestion()}} disabled={!answer}>Validate</button>
                </>
                :
                <>
                    <h1 className="text-center">Finished!</h1>
                    <div className="score-board__custom">
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
                </>)
        : <h1 className="text-center"><span className="impact">QWIZ IS LOADING</span></h1>
        }
        </>
    )

}

export default QuizList;