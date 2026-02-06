import React, { ReactElement, useState, useEffect } from "react";
import styles from './ApplicationForm.module.css';

export function ApplicationForm(): ReactElement {
    const [companyName, setCompanyName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [otherSource, setOtherSource] = useState<string>('');
    const [otherSourceVisible, setOtherSourceVisible] = useState<boolean>(false);
    const [availableSources, setAvailableSources] = useState<string[]>([]);

    function onSubmit() {
        //validate fields - no whitespace
        //company name shouldnt be blank
        //if url, ensure valid url
        //source not blank
        //if notes whitespace, make null

        //save record if valid

        //if sent, clear form fields

        //if new source, save that and refetch
        //loadSources();
    }

    function loadSources() {
        window.api.getSources().then(s => {
            setAvailableSources(s);
        });        
    }

    useEffect(() => {
        loadSources();
    }, []);
    useEffect(() => {
        console.log('availableSources', availableSources);
    }, [availableSources]);

    return (
        <div className={styles.appForm}>
            <div>
                <h1>New Application</h1>
            </div>
            <div>
                <div>
                    <span>*Company Name</span>
                </div>
                <div>
                    <input type="text" value={companyName} onChange={(e) => {
                        setCompanyName(e.target.value);
                    }} placeholder="Name" />
                </div>
            </div>
            <div>
                <div>
                    <span>URL</span>
                </div>
                <div>
                    <input type="text" value={url} onChange={(e) => {
                        setUrl(e.target.value);
                    }} placeholder="Link" />
                </div>
            </div>
            <div>
                <div>
                    <span>*Source</span>
                </div>
                <div>
                    <select value={source} onChange={(e) => {
                        if (e.target.value === "other") {setOtherSourceVisible(true)} else setOtherSourceVisible(false);
                        if (e.target.value !== "" && e.target.value !== 'other') setSource(e.target.value);
                    }}>
                        <option value="">Please select an option</option>
                        {availableSources.map((s) => {
                            return (
                                <option value={s} key={`source-option-${s}`}>{s}</option>
                            )
                        })}
                        <option value="other">Other</option>
                    </select>
                </div>
                {otherSourceVisible && (
                    <div>
                        <input type="text" value={otherSource} onChange={(e) => {
                            setOtherSource(e.target.value);
                        }} placeholder="New source" />
                    </div>                    
                )}
            </div>
            <div>
                <div>
                    <span>Notes</span>
                </div>
                <div>
                    <input type="textarea" value={notes} onChange={(e) => {
                        setNotes(e.target.value);
                    }} placeholder="Optional notes" />
                </div>
            </div>
            <div>
                <button onClick={onSubmit}>submit</button>
            </div>
        </div>
    )
}