import { reactive } from 'vue';
import { defineStore } from 'pinia';
import myConfig from '../../myConfig.js';

export const useMainStore = defineStore('main', {
    state: () => ({
        nrOfStatementsChosen: 0,
        nrOfMultipleChoiceAnswersChosen: 0,
        statementChosen: false,
        contentOfChosenStatement: '',
        contentOfChosenMultipleChoiceAnswer: '',
        multipleChoiceAnswerChosen: false,
        score: 0,
        concatenatedScore: 0,
        hasSlideInClassOnStatements: false,
        hasInactiveClassOnStatements: true,
        allStatementsChosen: false,
        allMultipleChoiceAnswered: false,
        results: '',
        shouldNewStatementShow: false,
        ledger: reactive([]),
    }),
    getters: {
        ledgerArray: (state) => state.ledger // Getter to access the ledger array, the only way to detect changes in the array
    },
    actions: {
        setShouldNewStatementShow(bool) {
            this.shouldNewStatementShow = bool;
        },
        incrementNrOfStatementsChosen() {
            this.nrOfStatementsChosen++;
        },
        incrementNrOfMultipleChoiceAnswersChosen() {
            this.nrOfMultipleChoiceAnswersChosen++;
        },
        incrementScore(val) {
            this.score += val;
        },
        setStatementChosen(bool) {
            this.statementChosen = bool;
        },
        setContentOfChosenStatement(content) {
            this.contentOfChosenStatement = content;
        },
        setContentOfChosenMultipleChoiceAnswer(content) {
            this.contentOfChosenMultipleChoiceAnswer = content;
        },
        setMultipleChoiceAnswerChosen(bool) {
            this.multipleChoiceAnswerChosen = bool;
        },
        setSlideInClassOnStatements(bool) {
            this.hasSlideInClassOnStatements = bool;
        },
        setInactiveClassOnStatements(bool) {
            this.hasInactiveClassOnStatements = bool;
        },
        setAllStatementsChosen(bool) {
            this.allStatementsChosen = bool;
        },
        setAllMultipleChoiceAnswered(bool) {
            this.allMultipleChoiceAnswered = bool;
        },
        resetStatementsAndMultipleChoice() {
            this.setStatementChosen(false);
            this.setMultipleChoiceAnswerChosen(false);
            this.setAllStatementsChosen(false);
            this.setAllMultipleChoiceAnswered(false);
        },
        /**
         * Updates an existing entry or adds a new one to the ledger based on the provided `entry`.
         * 
         * @param {Object} entry - The object representing the entry, which should include an `id` field.
         *                        - If the `id` exists in the ledger, the entry will be updated.
         *                        - If the `id` does not exist, a new entry will be added.
         */
        updateLedger(entry) {
            // Step 1: Check if an entry with the same `id` already exists in the ledger
            const existingEntry = this.ledger.find(item => item.id === entry.id);

            // Step 2: If the `id` exists (i.e., the entry is found), update the existing entry
            if (existingEntry) {
                // Object.assign() merges the properties of `entry` into `existingEntry`, updating only the fields that are provided in `entry`
                console.log('entry: ', entry);
                Object.assign(existingEntry, entry);
                // console.log(`Updated entry with id ${entry.id}:`, existingEntry);
            } else {
                // Step 3: If the `id` does not exist (i.e., no entry is found), add a new entry to the ledger
                // The new `entry` object is pushed to the ledger array
                this.ledger.push(entry);
                // console.log(`Added new entry:`, entry);
            }
            // console.log('store.ledger: ', this.ledger);
        }
    }
});
