import React, { ReactElement, useState, useEffect } from "react";
import styles from './ApplicationForm.module.css';
import { JobApplication, Status } from "../../../shared/domain";
import { v4 } from "uuid";

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
        if (companyName && companyName.trim().length > 0) {
            //source not blank
            if (
            (source && availableSources.find(s => s === source)) || 
            (otherSource && otherSource.trim().length > 0)
            ) {
                if (url && url.trim().length > 0) {
                    //if url, ensure valid url
                    if (/^(http|https):\/\/[^ "]+$/.test(url)) {
                        completeApplication();
                    }
                    else {
                        alert("Please enter a valid URL");
                    }
                } else {
                    //we are also fine without url
                    completeApplication();
                }
            } else {
                alert("Application needs a valid source");
            }
        } else {
            alert("Please enter a company name");
        }
    };

    function loadSources() {
        window.api.getSources().then(s => {
            setAvailableSources(s);
        });        
    };

    function makeJobApplication(): JobApplication {
        return {
            uid: v4(),
            companyName,
            url: url.length > 0 ? url : null,
            source: otherSource.length > 0 ? otherSource : source,
            status: Status.Applied,
            reason: null,
            notes: notes.length > 0 ? notes : null,
            createdDate: new Date().toISOString(),
            updatedDate: null
        }
    };

    function clearFormFields() {
        setOtherSourceVisible(false);
        setCompanyName('');
        setUrl('');
        setNotes('');
        setSource('');
        setOtherSource('');
    }

    function completeApplication() {
        const newJobApp = makeJobApplication();
        //save record
        window.api.addApplication(newJobApp).then(resp => {
            if (resp.success) {
                //if sent, clear form fields
                clearFormFields();

                //if new source, save that and refetch
                if (!availableSources.find(s => s === newJobApp.source)) {
                    window.api.addSource(newJobApp.source).then(r => {
                        if (r.success) {
                            loadSources();
                            alert("Saved");
                        }
                        else {
                            alert(`Saved job application but couldn't add new source: ${r.message}`)
                        }
                    });
                } else {
                    alert("Saved");
                }
            } else {
                alert(`Saving job application failed: ${resp.message}`);
            }
        });
    };

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
                    <textarea value={notes} onChange={(e) => {
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