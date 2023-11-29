<script setup>
import { computed, ref } from "vue";
import { LineChart } from "vue-chart-3";
import { perfTest } from "./test";

const chartOptionsVar = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "let vs localRef vs piniaRef",
    },
  },
});

const labels = ref([]);
const nonRefVarList = ref([]);
const localRefList = ref([]);
const storeRefList = ref([]);

const chartDataVar = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "nonRefVar",
      data: nonRefVarList.value,
      borderColor: "rgba(255, 255, 255, 1)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    {
      label: "localRef",
      data: localRefList.value,
      borderColor: "rgba(66, 184, 131, 1)",
      backgroundColor: "rgba(66, 184, 131, 0.5)",
    },
    {
      label: "storeRef",
      data: storeRefList.value,
      borderColor: "rgba(255, 216, 89, 1)",
      backgroundColor: "rgba(255, 216, 89, 0.5)",
    },
  ],
}));

const chartOptionsObjects = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "object vs localReactive vs piniaReactive",
    },
  },
});
const objList = ref([]);
const localReactiveList = ref([]);
const storeReactiveList = ref([]);

const chartDataReactive = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "object",
      data: objList.value,
      borderColor: "rgba(255, 255, 255, 1)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    {
      label: "localReactive",
      data: localReactiveList.value,
      borderColor: "rgba(66, 184, 131, 1)",
      backgroundColor: "rgba(66, 184, 131, 0.5)",
    },
    {
      label: "storeReactive",
      data: storeReactiveList.value,
      borderColor: "rgba(255, 216, 89, 1)",
      backgroundColor: "rgba(255, 216, 89, 0.5)",
    },
  ],
}));

const iterations = [
  10,
  100,
  1000,
  10000,
  100000,
  1000000,
  3000000,
  5000000,
  6000000,
  8000000,
  10000000,
];

for (const i of iterations) {
  const result = perfTest(i);
  labels.value.push(i.toString().split("").reverse().join("").replaceAll("000", "k").split("").reverse().join(""));
  nonRefVarList.value.push(result.nonRefVarTime);
  localRefList.value.push(result.localRefTime);
  storeRefList.value.push(result.storeRefTime);

  objList.value.push(result.objTime);
  localReactiveList.value.push(result.localReactiveTime);
  storeReactiveList.value.push(result.storeReactiveTime);
}
</script>

<template>
  <LineChart :options="chartOptionsVar" :chart-data="chartDataVar" :width="1200" :height="400" />
  <LineChart :options="chartOptionsObjects" :chart-data="chartDataReactive" :width="1200" :height="400" />
</template>

<style scoped>
</style>
