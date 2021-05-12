import React, { useState, useEffect } from "react";
import { utf8 } from "../../utils"
import "../../styles/Quiz/QuizQuestion.css";

const QuizQuestion = props => {

    const [answersList, setAnswersList] = useState([])

    useEffect(()=>{
        let answers = props.question.incorrect_answers;
        answers.push(props.question.correct_answer);
        shuffle(answers);
        setAnswersList(answers);
    }, [props.question.incorrect_answers, props.question.correct_answer]);

    /* Display answers list */
    const displayChoices = (question)=>{
        if(question.type==='multiple'){
            return(
                <>
                    <p><span className="impact">Select your response:</span></p>
                <div className="question-custom row" >
                    {answersList.map((answer, id)=>{
                        return(
                            <div key={'R'+id} className="question-custom__container col-6">
                                <div className={"question-custom__responses d-flex "+(props.answer===answer?"selected":"")} onClick={()=>props.handleClick(answer)}>
                                    <h5>{utf8(answer)}</h5>    
                                </div>
                            </div>
                            )
                        })} 
                </div>
                </>
            )
        }
        if(question.type==='boolean'){
            return(
                <>
                    <p><span className="impact">Select your response:</span></p>
                <div className="question-custom row" >
                        <div key={'R1'} className="question-custom__container col-6">
                            <div className={"question-custom__responses d-flex "+(props.answer==='True'?"selected":"")} onClick={()=>props.handleClick('True')}>
                                <h5>True</h5>    
                            </div>
                        </div>
                        <div key={'R2'} className="question-custom__container col-6">
                            <div className={"question-custom__responses d-flex "+(props.answer==='False'?"selected":"")} onClick={()=>props.handleClick('False')}>
                                <h5>False</h5>    
                            </div>
                        </div>
                </div>
                </>
            )
        }
    
    }

    /* Shuffle arrays to have randomized answers order */
    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
     }


    /* QUESTIONS LOOK    LIKE :   
        { category: "", correct_answer: "", difficulty: "", incorrect_answers: (n) [], question: "", type: "multiple/boolean" }
    */
    return (
            <div className="question-container">
                <h1>Question number {props.index+1}</h1>
                <h6>Category: {props.question.category} (difficulty {props.question.difficulty})</h6>
                <h3 className="mt-5">{utf8(props.question.question)}</h3>

                {displayChoices(props.question)}
            </div>
        )

}

export default QuizQuestion;