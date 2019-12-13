import React from "react";


const QuizQuestion = props => {

    const utf8 = (string)=>{
        var txt = document.createElement("textarea");
        txt.innerHTML = string;
        return txt.value;
    }

    /* Display answers list */
    const displayChoices = (question,qindex)=>{
        if(question.type==='multiple'){
            const answers = question.incorrect_answers;
            answers.push(question.correct_answer);
            shuffle(answers);
            return(
                <div className='ok'>
                    <p>Select your response:</p>
                    {answers.map((answer, id)=>{
                        return(
                            <div key={'R'+id}>
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

    /* Shuffle arrays to have randomized answers order */
    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
     }


    /* QUESTIONS LOOK    LIKE :   
        { category: "", correct_answer: "", difficulty: "", incorrect_answers: (n) [], question: "", type: "multiple/boolean" }
    */
    return (
            <div className="Blah">
                <h3>Question number {props.index+1}</h3>
                <h4>Category: {props.question.category} (difficulty {props.question.difficulty})</h4>
                <h5>{utf8(props.question.question)}</h5>

                {displayChoices(props.question)}
                <br/>
                <button onClick={props.onClick}>Validate</button>
                
            </div>
        )

}

export default QuizQuestion;