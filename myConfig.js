import MultipleChoiceModal from "@/components/MultipleChoiceModal.vue";

const myConfig = { 
  statementsData: 'statements.json',
  evaluationData: 'evaluation.json',
  multipleChoiceData: 'multiplechoice.json',
  nrOfTasksToBeDone: 5,
  lockAnimationMinimalSeconds: 1,
  lockAnimationMaximalSeconds: 3,
  cylinderLockSpeed: 150,
  localStorageKey: 'keri-questionaire-results',
} 

export default myConfig;