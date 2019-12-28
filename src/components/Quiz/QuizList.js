import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";


const QuizList = props => {
    const [questions, setQuestions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    // const [answers, setAnswers] = useState([]);
    // const [score, setScore] = useState(0);

    const number = 10;

    useEffect(() => {
        const url = "https://opentdb.com/api.php?amount="+number+"&category=20";
        axios.get(url).then(response => {
            setQuestions(response.data.results);
            setIsLoaded(isLoaded => !isLoaded);
        });
    }, []);

    const changeQuestion = ()=>{
        if((index+1)===questions.length){
            alert('vous avez finis le questionnaire !')
        }
        else{
            setIndex(index+1)
        }

    }


    const handleChange = (e)=>{
        setAnswer(e.target.value)
    }

    /* QUESTIONS LOOK    LIKE :   
        { category: "", correct_answer: "", difficulty: "", incorrect_answers: (n) [], question: "", type: "multiple/boolean" }
    */


    
    return (
        <div>
        {isLoaded ? 
            <QuizQuestion
                question={questions[index]}
                index={index}
                onClick={()=>{changeQuestion();console.log('cc')}}
                handleChange={(e)=>handleChange(e)}
                key={'question'+index}
            />
        : <p>Loading...</p>
        }
        <p>Réponse choisie: {answer}</p>
        </div>
    )

}

export default QuizList;