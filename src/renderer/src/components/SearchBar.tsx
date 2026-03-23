import React, { ReactElement } from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps): ReactElement {
    return (
        <div className={styles.searchContainer}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by role or company..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <button
                    className={styles.clearButton}
                    onClick={() => onChange('')}
                    aria-label="Clear search"
                >
                    &times;
                </button>
            )}
        </div>
    );
}
