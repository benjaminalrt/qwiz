import React, {useState, useEffect} from 'react';
import axios from "axios";

const Profile = props => {

    const [isConnected,setIsConnected] = useState(false);
    const [isCreating,setIsCreating] = useState(false);
    const [user,setUser] = useState({username: '', password: ''});
    const [checkPassword, setCheckPassword] = useState('');
    const [match, setMatch] = useState(false);
    const [errors, setErrors] = useState('')
    const [success, setSuccess] = useState('')
    const [scores, setScores] = useState([])

    const R = require('ramda');

    useEffect(() => {
        if(props.create){
            setIsCreating(true)
        }
        if(localStorage.getItem('user')!==null){
            let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/user/"+localStorage.getItem('user')
            axios.get(url).then(response=>{
                setUser(response.data)
                setIsConnected(true)
        })
    }
    }, []);

    const registerUser = ()=>{
        let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/users"
        axios.post(url, user).then(response =>{
            if(response.data==='0'){
                setErrors('Username already taken')
                setSuccess('')
            }
            else{
                setIsCreating(false)
                setErrors('')
                setSuccess('Your profile has been created successflully! Now log in !')
                setUser({username: '', password: ''})
                setCheckPassword('')
                setMatch(false)
            }
        })
    }

    const updateUser = ()=>{
        let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/user/"+localStorage.getItem('user')
        axios.put(url, user).then(response =>{
            console.log(response.data)
            if(!response.data){
                setErrors('Problem')
                setSuccess('')
            }
            else{
                localStorage.setItem('user',user.username)
                setIsCreating(false)
                setErrors('')
                setSuccess('Your profile has been updated successflully!')
                setCheckPassword('')
                setMatch(false)
            }
        })
    }

    const deleteUser = ()=>{
        let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/user/"+localStorage.getItem('user')
        axios.delete(url).then(response =>{
            if(!response.data){
                setErrors('A problem has occurred')
                setSuccess('')
            }
            else{
                localStorage.removeItem('user')
                setIsCreating(false)
                setIsConnected(false)
                setErrors('')
                setSuccess('Your profile has been deleted successflully! Reconnect now')
                setUser({username: '', password: ''})
                setCheckPassword('')
                setMatch(false)
            }
        })
    }

    const tryConnection = ()=>{
        let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/user/"+user.username
        axios.get(url).then(response=>{
            if(response.data.password===user.password){
                localStorage.setItem('user', user.username)
                setIsConnected(true);
                setErrors('')
                setSuccess('Connection successfull')
            }
            else{
                setErrors('Wrong username or password')
                setSuccess('')
            }
        })
    }

    const disconnection = ()=>{
        setSuccess('You has disconnected successfully')
        setUser({username: '', password: ''})
        setCheckPassword('')
        setMatch(false)
        localStorage.removeItem('user');
        setIsConnected(false);
        setIsCreating(false);
    }

    const handleChangeUser = (e)=>{
        let newUser = R.clone(user)
        switch(e.target.id){
            case 'newUsername' : case 'loggerUsername': case 'updateUsername' : newUser.username = e.target.value; setUser(newUser); break;
            case 'newPassword' :   newUser.password = e.target.value; setUser(newUser); setMatch(e.target.value===checkPassword); break;
            case 'checkPassword' :  setCheckPassword(e.target.value); setMatch(e.target.value===user.password); break;
            case 'checkEditPassword' : setCheckPassword(e.target.value); break;
            case 'updatePassword' : case 'loggerPassword': newUser.password = e.target.value; setUser(newUser); break;
            default: console.log('Problems')
        }
    }

    const displayEdit = ()=>{
        if(checkPassword===user.password){
            setMatch(true)
            setCheckPassword('')
            setErrors('')
            console.log('cool')
        }
        else{
            setMatch(false)
            setCheckPassword('')
            setErrors('Mauvais mot de passe')
        }
    }

    const displayProfile = ()=>{
        if(scores.length===0)
        {
            let url = "http://api.alerte.mmi-unistra.fr/api-qwiz/api.php/scores/"+localStorage.getItem('user')
                axios.get(url).then(response=>{
                    if(response.data.length===0){
                        setScores([{empty:'You have to play to populate your history'}])
                    }
                    else{
                        setScores(response.data);
                    }
                })
        }
        return(
            <div>
                <h1 className="text-center">You are connected as {localStorage.getItem('user')}</h1>
                <h3>Welcome <span className="impact">{localStorage.getItem('user')}</span></h3>
                <p>There you can edit your profile, and see your highscores !</p>

                <h4>Game history</h4>
                <ul>
                    {scores.map((score,id)=>{
                        var date = new Date(score.date)
                        var dateString = date.toLocaleDateString()
                        return(
                        <li key={id}>{dateString}<br/>
                        {'Category : '+score.category}<br/>
                        {'Difficulty: '+score.difficulty}<br/>
                        {'Score: '+score.score}
                        </li>)
                    })}
                </ul>

                <h6>To edit your profile, enter your password</h6>
                <input type="password" id="checkEditPassword" value={checkPassword} onChange={handleChangeUser}/><br/>
                <button className="btn btn-success my-2" onClick={displayEdit}>Open edit options</button>
                
                {match?
                <>
                    <p>There you can edit</p>
                    <h5>New username </h5>
                    <input id="updateUsername" type="text" onChange={handleChangeUser}/>
                    <h5>New password </h5>
                    <input id="updatePassword" type="password" onChange={handleChangeUser}/>
                    <button className="btn btn-success" onClick={updateUser}>SAVE</button>
                    <button className="btn btn-danger" onClick={deleteUser}>DELETE USER</button>
                    <p>{user.username+user.password}</p>
                    
                </> : null}
                <br/>
                <button className="btn btn-danger mt-auto" onClick={disconnection}>Disconnection</button>
            </div>
        )
    }

    const displayRegister = ()=>{
        return(
            <div>
                <h1>Creation</h1>
                <h5>Chose username <span>(this user is already used)</span></h5>
                <input type="text" value={user.username} id="newUsername" onChange={handleChangeUser}/> <br/>
                <h5>Password</h5>
                <input type="password" value={user.password} id="newPassword" onChange={handleChangeUser}/> <br/>
                <p>{user.password? (user.password.length<5? 'Password to short': 'Good password'): 'Chose a password'}</p>
                <h5>Confirm password </h5>
                <input type="password" value={checkPassword} id="checkPassword" onChange={handleChangeUser}/> <br/>
                <p>{checkPassword? (match?'Password match' : 'Passwords don\'t match') : 'Write the same password to confirm'}</p>
                <button className="btn btn-success" onClick={registerUser}>Create</button>
            </div>
        )
    }

    const displayLogger = ()=>{

        return(
            <>
                <div>
                    <h2>Login form</h2>
                    <h5>Username </h5>
                    <input type="text" value={user.username} id="loggerUsername" onChange={handleChangeUser}/> <br/>

                    <h5>Password</h5>
                    <input type="password" value={user.password} id="loggerPassword" onChange={handleChangeUser} /> <br/>
                    <button className="btn btn-success" onClick={tryConnection}>Connection</button>
                </div>
                <p>Not registered yet? <button onClick={()=>(setIsCreating(true))}>Create an account !</button>(Very very quickly)</p>
            </>
        )
    }

    return(
    <div className="container">
        <h3 style={{color:'red'}}>{errors}</h3>
        <h3 style={{color:'green'}}>{success}</h3>
        {isConnected? displayProfile() : (isCreating? displayRegister() : displayLogger()) }
    </div>
    )
}

export default Profile;