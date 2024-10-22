import { defineStore } from 'pinia';
import myConfig from '../../myConfig.js';

export const useMainStore = defineStore('main', {
    state: () => ({
        nrOfStatementsChosen: 0,
        nrOfMultipleChoiceAnswersChosen: 0,
        statementChosen: false,
        contentOfChosenStatement: '',
        multipleChoiceAnswerChosen: false,
        score: 0,
        hasSlideInClassOnStatements: false,
        hasInactiveClassOnStatements: true,
        allStatementsChosen: false,
        allMultipleChoiceAnswered: false,
        results: '',
        shouldNewStatementShow: false
    }),
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
        emptyResultsInLocalStorage() {
            localStorage.setItem(myConfig.localStorageKey, "");
        },
        addToResultsInLocalStorage(val) {
            this.results += val + '\n';
            const textToWrite = this.results + '\n' + this.score;
            localStorage.setItem(myConfig.localStorageKey, JSON.stringify(textToWrite));
        },
        loadResults() {
            return JSON.parse(localStorage.getItem(myConfig.localStorageKey));
        },
        resetStatementsAndMultipleChoice() {
            this.setStatementChosen(false);
            this.setMultipleChoiceAnswerChosen(false);
            this.setAllStatementsChosen(false);
            this.setAllMultipleChoiceAnswered(false);        }
    }
});