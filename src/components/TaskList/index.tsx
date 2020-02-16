/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.scss';
import { IEntry } from '../NewEntrySheet';


interface ITaskListProps {
    onRemove : (entry : IEntry) => void;
    entries: IEntry[];
    
}
interface ITaskCardProps {
    entry: IEntry;
    onRemove : (entry:IEntry) => void;
}

export const TaskList: React.FC<ITaskListProps> = (props: ITaskListProps) => {
    const { entries } = props;

    const onDeleteEntry = (entry : IEntry) =>
    {   
        
        
        props.onRemove(entry);
        
    }

    return (
        <div className="task-list">
            {entries.map((entry: IEntry) => (
                <TaskCard key={entry.id} entry={entry} onRemove={onDeleteEntry} />
            ))}
        </div>
    );
};

const TaskCard: React.FC<ITaskCardProps> = (props: ITaskCardProps) => {
    const {
        entry: { id,task, hours, minutes,remarks },
    } = props;

    const onButtonClick = () => {
        const entry: IEntry = { id,task, hours, minutes,remarks };
        props.onRemove(entry);
    }
    return (
        <div key={id} className={`task-card`}>
            <button className="cross-btn" onClick={onButtonClick} >X</button>
            <div className="task-head">
                <div className="task-title">{task}</div>
                <div className="task-time">{`${hours}h ${minutes}m`}</div>
            </div>
            <div>
                <p className="task-remarks">{remarks}</p>
            </div>
        </div>
        
    );
};
