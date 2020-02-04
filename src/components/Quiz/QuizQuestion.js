import React, { useState, useEffect } from "react";
import { utf8 } from "../../utils"


const QuizQuestion = props => {

    const [answersList, setAnswersList] = useState([])

    useEffect(()=>{
        let answers = props.question.incorrect_answers;
        answers.push(props.question.correct_answer);
        shuffle(answers);
        setAnswersList(answers);
    }, [props.question.incorrect_answers, props.question.correct_answer]);

    /* Display answers list */
    const displayChoices = (question,qindex)=>{
        if(question.type==='multiple'){
            return(
                <div className='ok'>
                    <p>Select your response:</p>
                    {answersList.map((answer, id)=>{
                        return(
                            <div key={'R'+id}>
                                <input type="radio" onClick={props.handleChange} id={'q'+(qindex+1)+'r'+id} name={'q'+(qindex+1)} value={answer}/>
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
                            <input type="radio" onClick={props.handleChange} id={'q'+(qindex+1)+'true'} name={'q'+(qindex+1)} value="True"/>
                            <label htmlFor={'q'+(qindex+1)+'true'}>True</label>
                        </div>
                        <div>
                            <input type="radio" onClick={props.handleChange} id={'q'+(qindex+1)+'false'} name={'q'+(qindex+1)} value="False"/>
                            <label htmlFor={'q'+(qindex+1)+'false'}>False</label>
                        </div>
                </div>
            )
        }
    
    }

    /* Shuffle arrays to have randomized answers order */
    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
     }

     console.log(props.question.correct_answer)

    /* QUESTIONS LOOK    LIKE :   
        { category: "", correct_answer: "", difficulty: "", incorrect_answers: (n) [], question: "", type: "multiple/boolean" }
    */
    return (
            <div className="Blah">
                <h3>Question number {props.index+1}</h3>
                <h4>Category: {props.question.category} (difficulty {props.question.difficulty})</h4>
                <h5>{utf8(props.question.question)}</h5>

                {displayChoices(props.question)}
            </div>
        )

}

export default QuizQuestion;