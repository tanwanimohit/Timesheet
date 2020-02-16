/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * NewEntrySheet Component - Renders action sheet for adding new entry.
 */
import * as React from 'react';
import './styles.scss';
import crossIcon from '../../assets/cross-icon.svg';
import { Button } from '../Button';
import { taskTypes } from '../../constants/constants';

interface INewEntrySheet {
    
    onClose: () => void;
    onAdd: (entry: IEntry) => void;
}

export interface IEntry {
    id:number;
    task: string;
    hours: string;
    minutes: string;
    remarks : string;
}

export const NewEntrySheet: React.FC<INewEntrySheet> = (props: INewEntrySheet) => {
    const [task, setTask] = React.useState(taskTypes[0]);
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [remarks,setRemarks] = React.useState('');
    const [buttonStatus,setButtonStatus] =React.useState(true);
    const [id,setIdKey]=React.useState(new Date().getTime());

    const onTaskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        setTask(event.target.value);
        
    };

    const onHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setHours(event.target.value);
        
    };

    const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setMinutes(event.target.value);
        
    };

    const onRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setRemarks(event.target.value);
        
    };


    const onAddEntry = () => {
        setIdKey(new Date().getTime());
        const entry: IEntry = { id,task, hours, minutes,remarks };
        props.onAdd(entry);
        
    };

    const checkButtonStatus = () =>
    {
        if( hours.length>0 && minutes.length>0 && remarks.length>0 )
        {
            setButtonStatus(false);   
        }
        else{
            setButtonStatus(true);
        }
    }

    return (
        <div className="new-entry-sheet">
            <div className="sheet-header">
                <div className="sheet-title">
                    <span className="title">Add New Entry</span>
                </div>
                <button className="close-sheet-btn" onClick={props.onClose} autoFocus>
                    <img src={crossIcon} alt="close" className="close-icon" />
                </button>
            </div>
            <div className="sheet-body">
                <div className="row">
                    <label className="task-input">
                        Task Type
                        <select className="task-select" onChange={onTaskChange} value={task} onKeyUp={checkButtonStatus}>
                            {taskTypes.map((task: string) => (
                                <option key={task} value={task}>{task}</option>
                            ))}
                        </select>
                    </label>
                    <label className="time-input">
                        Time Spent
                        <div className="time-input-fields">
                            <div>
                                <input
                                    type="number"
                                    placeholder="hours"
                                    className="hour-input"
                                    onChange={onHoursChange}
                                    onKeyUp={checkButtonStatus}
                                    value={hours}
                                />
                                <span className="time-indicator">h</span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="minutes"
                                    className="minute-input"
                                    onChange={onMinutesChange}
                                    onKeyUp={checkButtonStatus}
                                    value={minutes}
                                />
                                <span className="time-indicator">m</span>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="row">
                    <label className="task-detail"> Remarks
                            <input type="text" className="task-input-detail" placeholder="Remarks" onChange={onRemarksChange} onKeyUp={checkButtonStatus}/>
                    </label>
                </div>
            </div>
            <div className="sheet-footer">
                <div className="action-group">
                    <Button color="primary" onClick={onAddEntry} checkStatus={buttonStatus}>
                        Add Entry
                    </Button>
                </div>
            </div>
        </div>
    );
};
