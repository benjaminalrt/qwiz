import React, { useEffect, useState } from "react";
import axios from "axios";


const QuizList = props => {
    const [questions, setQuestions] = useState([]);
    const number = 10;

    useEffect(() => {
        const url = "https://opentdb.com/api.php?amount="+number+"&category=20";
        axios.get(url).then(response => {
            setQuestions(response.data.results);
        });

    }, []);

    const utf8 = (string)=>{
        var txt = document.createElement("textarea");
        txt.innerHTML = string;
        return txt.value;
    }

    /* Shuffle arrays to have randomized answers order */
    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
      }

    /* Display answers list */
    const displayChoices = (question,qindex)=>{
        if(question.type==='multiple'){
            const answers = question.incorrect_answers;
            answers.push(question.correct_answer);
            shuffle(answers);
            return(
                <div>
                    <p>Select your response:</p>
                    {answers.map((answer, id)=>{
                        return(
                            <div>
                                <input type="radio" id={'q'+(qindex+1)+'r'+id} name={'q'+(qindex+1)} value={answer}/>
                                <label htmlFor={'q'+(qindex+1)+'r'+id}>{utf8(answer)}</label>
                            </div>
                            )
                        })} 
                </div>
            )
        }
        if(question.type==='boolean'){
            return(
                <div>
                    <p>Select your response:</p>
                        <div>
                            <input type="radio" id={'q'+(qindex+1)+'false'} name={'q'+(qindex+1)} value="true"/>
                            <label htmlFor={'q'+(qindex+1)+'true'}>True</label>
                        </div>
                        <div>
                            <input type="radio" id={'q'+(qindex+1)+'true'} name={'q'+(qindex+1)} value="false"/>
                            <label htmlFor={'q'+(qindex+1)+'true'}>False</label>
                        </div>
                </div>
            )
        }
    
    }

    /* QUESTIONS LOOK    LIKE :
        { category: "", correct_answer: "", difficulty: "", incorrect_answers: (n) [], question: "", type: "multiple/boolean" }
    */
   
    console.log(questions[1])
    return (
        <div>
            {questions.map((question, index) =>{
                return (
                    <div>
                        <h3>Question numéro {index+1}</h3>
                        <h4>Category: {question.category} (difficulty {question.difficulty})</h4>
                        <h5>{utf8(question.question)}</h5>

                        {displayChoices(question)}
                        
                        <br/>
                    </div>
                )
            })}
        </div>
        
    )

}

export default QuizList;