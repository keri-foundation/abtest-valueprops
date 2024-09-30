import { defineStore } from 'pinia';

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
        addToResults(val) {
            this.results += val + '\n';
            localStorage.setItem('keri-questionaire-results', JSON.stringify(this.results));
        },
        loadResults() {
            return JSON.parse(localStorage.getItem('keri-questionaire-results'));
        },
        resetStatementsAndMultipleChoice() {
            this.setStatementChosen(false);
            this.setMultipleChoiceAnswerChosen(false);
            this.setAllStatementsChosen(false);
            this.setAllMultipleChoiceAnswered(false);        }
    }
});
