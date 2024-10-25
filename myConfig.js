import MultipleChoiceModal from "@/components/MultipleChoiceModal.vue";

const myConfig = { 
  statementsData: 'statements.json',
  evaluationData: 'evaluation.json',
  multipleChoiceData: 'multiplechoice.json',
  nrOfTasksToBeDone: 2,
  lockAnimationMinimalSeconds: 1,
  lockAnimationMaximalSeconds: 3,
  cylinderLockSpeed: 150,
  localStorageKey: 'keri-questionaire-results',
  dataReceiverEndpoint: 'https://keri.foundation/various/inquiry-keri/data-receiver/data-receiver.php'
} 

export default myConfig;