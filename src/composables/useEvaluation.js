import { ref, onMounted } from 'vue';

import myConfig from '../../myConfig';
const baseUrl = import.meta.env.BASE_URL;

export function useEvaluation() {
  const evaluation = ref([]);
  const error = ref(null);

  const loadEvaluation = async () => {
    try {
      const response = await fetch(`${baseUrl}${myConfig.evaluationData}`);
      evaluation.value = await response.json();
    } catch (error) {
      console.error('Failed to load evaluations:', error);
    }
  };

  onMounted(() => {
    loadEvaluation();
  });

  return { evaluation, error };
}
