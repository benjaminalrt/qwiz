import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";


const QuizList = props => {
    const [questions, setQuestions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [index, setIndex] = useState(0);
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

    /* QUESTIONS LOOK    LIKE :   
        { category: "", correct_answer: "", difficulty: "", incorrect_answers: (n) [], question: "", type: "multiple/boolean" }
    */


    
    return (
        <div>
        {isLoaded ? 
            <QuizQuestion
                question={questions[index]}
                index={index}
                onClick={changeQuestion}
                key={'question'+index}
            />
        : <p>Loading...</p>
        }
        </div>
    )

}

export default QuizList;