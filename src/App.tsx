/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * App Component
 */
import React from 'react';
import './App.scss';
import addIcon from './assets/plus-icon.svg';
import { NewEntrySheet, IEntry } from './components/NewEntrySheet';
import { TaskList } from './components/TaskList';
import { storageKey } from './constants/constants';

const App: React.FC = () => {


    const getDefault = () => {
        const entriesString = window.localStorage.getItem(storageKey);
        const entries = entriesString ? JSON.parse(entriesString) : [];
        return entries;
    };

    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    const [Entries,setEntries] = React.useState<IEntry[]>(getDefault());

    const openEntrySheet = () => {
        setIsEntrySheetOpen(true);
    };

    const closeEntrySheet = () => {
        setIsEntrySheetOpen(false);
    };

    const onAddEntry = (entry: IEntry) => {
        const existingTasksString = window.localStorage.getItem(storageKey);
        if (existingTasksString) {
            const existingTasks = JSON.parse(existingTasksString);
            const newTasks = [...existingTasks, entry];
            window.localStorage.setItem(`${storageKey}`, JSON.stringify(newTasks));
        } else {
            window.localStorage.setItem(`${storageKey}`, JSON.stringify([entry]));
            closeEntrySheet();
        }
        getTaskEntries();
        closeEntrySheet();
    };


    const OnDeleteEntry = (entry : IEntry) => {
        const existingTasksString = window.localStorage.getItem(storageKey);
        if(existingTasksString)
        {
            const existingTasks = JSON.parse(existingTasksString);
            const newTasks = existingTasks.filter((item:IEntry) => item.id!==entry.id);
            window.localStorage.setItem(`${storageKey}`, JSON.stringify(newTasks));
        }
        getTaskEntries();

    }

    
    const getTaskEntries = () => {
        const entriesString = window.localStorage.getItem(storageKey);
        const entries = entriesString ? JSON.parse(entriesString) : [];
        setEntries(entries);
    };

    const  MakeProgessBar= () => {
        let totalMinutes=0;
        Entries.forEach(element => {
            totalMinutes += parseInt(element.minutes) + (parseInt( element.hours)*60);
        });
        let percentage  = totalMinutes/400 * 100;
        let color="red";

        if(percentage>100)
            percentage=100;
        if(totalMinutes<240)
        {
            color="red";
        }
        else if(totalMinutes>240 && totalMinutes<480)
        {
            color="orange";
        }
        else{
            color="green";
        }
        

        return (<div className='progress' style={{width:`${percentage}%` ,background:`${color}`}} ></div>)
         
    };

 
    //const entries = getTaskEntries();

    return (
        <div className="app-container">
            <h1>Timesheet</h1>
            <div className="progress-bar">{MakeProgessBar()}</div>
            {Entries.length > 0 ? (
                <TaskList onRemove={OnDeleteEntry} entries={Entries} />
            ) : (
                <p className="empty-text">No entries yet. Add a new entry by clicking the + button.</p>
            )}
            <button className="floating-add-entry-btn" onClick={openEntrySheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {isEntrySheetOpen && <NewEntrySheet  onClose={closeEntrySheet} onAdd={onAddEntry} />}
        </div>
    );
};

export default App;
