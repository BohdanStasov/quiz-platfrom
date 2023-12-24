import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { fetchTasks } from '../../redux/taskSlice';
import { useState } from 'react';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';

const Tasks = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const tasks = useSelector((state) => state.tasks);
    const [isOpenTest, setIsOpenTest] = useState(false);
    const [oneSelectedTest, setOneSelctedTest] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const handleAnswerClick = (assignmentId, answerId) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [String(assignmentId)]: String(answerId),
        }));
    };
    useEffect(() => {
        dispatch(fetchTasks());
        console.log(currentUser)
    }, [selectedAnswers]);
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        try { 
            console.log({ username: currentUser.username, taskId: oneSelectedTest._id, answersByAssignment: selectedAnswers })
            await axios.post(
                "/api/tasks/submit",
                { username: currentUser.username, taskId: oneSelectedTest._id.toString(), answersByAssignment: selectedAnswers },   
            ) 
            alert("Task has been submited successfully!")  
            
        } catch (error) {
            console.log(error);
            alert('Something went wrong, try again later');
        }
    }
    return (
        <section className='flex flex-col px-6 sm:px-16 py-4 '>
            <div className='flex flex-row items-center justify-end gap-4'>
                {currentUser.username}
                <button onClick={() => {dispatch(logout())}} className='hover:text-[#DE002D]'>
                    logout
                </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 '>
                {tasks.map((item) => (
                    <div className='border rounded-lg px-4 py-3 flex-col justify-between flex ' key={item._id}>
                        <div className='flex flex-col'>
                            <h1 className='text-xl font-bold'>{item.testName}</h1>
                            <p className='text-[14px]'>{item.testDescription}</p>
                        </div>
                        {currentUser.tasks.some(task => task.taskId === item._id) ? (
                            <div className='flex items-end justify-between flex-row space-y-3'>
                                <p>Grade: {currentUser.tasks.find(task => task.taskId === item._id).grade}/{item.assignments.length}</p>
                                <div className='text-[#0049B8]'>
                                    Completed
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-end justify-between flex-row space-y-3'>
                                <p>Questions: {item.assignments.length}</p>
                                <button 
                                    onClick={() => {
                                        setIsOpenTest(true);
                                        setOneSelctedTest(item);
                                    }} 
                                    className='px-4 py-3 rounded-lg hover:bg-[#0049B8] hover:text-white font-bold border border-[#0049B8] text-center text-[#0049B8]'
                                >
                                    Start
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isOpenTest &&  
                <div className='task-wrapper h-100vh'>
                    <div className='fixed rounded-lg bg-white top-1/2 left-1/2 W-[400px] md:min-w-[500px] transform -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-4'>
                        <div className='flex flex-row justify-between'>
                            <h1 className='font-bold text-[21px] text-[#0049B8]'>{oneSelectedTest.testName}</h1>
                            <button className='text-[#DE002D]' onClick={() => {setIsOpenTest(false)}}>close test</button>
                        </div>
                        <p className='max-w-[400px]'>{oneSelectedTest.testDescription}</p>
                        <div className='space-y-4 mt-4 w-full h-[400px] py-2 overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar'>
                            {oneSelectedTest.assignments.map((item) => (
                                <div className='px-3 py-2 flex flex-col rounded-lg' key={item._id}>
                                    <h1 className='font-bold'>{item.name}</h1>
                                    <p>{item.question}</p>
                                    <div className='mt-3 space-y-2 flex flex-col justify-center'>
                                        {item.answers.map((answer) => (
                                            <button
                                                key={answer._id}
                                                className={`flex flex-row gap-2 items-center`}
                                                onClick={() => handleAnswerClick(item._id, answer._id)}
                                            >
                                                <span className={`w-[12px] h-[12px] flex border border-[#0049B8]  rounded-full ${selectedAnswers[item._id] === answer._id ? 'bg-[#0049B8]' : 'bg-white' }`}></span>
                                                <h1>{answer.content}</h1>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={handleTaskSubmit} className='mt-4 px-4 py-3 rounded-lg hover:bg-[#0049B8] hover:text-white font-bold border border-[#0049B8] text-center text-[#0049B8]'>
                                Submit
                            </button>                
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default Tasks