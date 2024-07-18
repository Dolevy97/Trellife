


import { useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';

export function TaskDetails() {

    const navigate = useNavigate()
    const { taskId, groupId, boardId } = useParams()

    useEffect(()=>{
        // loadTask()
    },[])

    function onBack(){
        navigate(`/board/${boardId}`, { replace: true })
    }

    return (
        <div className="task-details-backdrop" onClick={onBack}>
            <section className="task-details">
        
            </section>
        </div >
    )
}

