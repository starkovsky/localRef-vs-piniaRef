import { reactive, ref } from "vue";
import { useTestStore } from "./useTestStore";

export function perfTest(iterations) {
  let nonRefVarTime = 0;
  let localRefTime = 0;
  let storeRefTime = 0;

  let objTime = 0;
  let localReactiveTime = 0;
  let storeReactiveTime = 0;

  let startTime = 0;

  const testStore = useTestStore();

  let nonRefVar = 0;
  const refVar = ref(0);

  startTime = Date.now();
  for (let i = 0; i <= iterations; i++) {
    nonRefVar = i;
  }
  nonRefVarTime = Date.now() - startTime;

  startTime = Date.now();
  for (let i = 0; i <= iterations; i++) {
    refVar.value = i;
  }
  localRefTime = Date.now() - startTime;

  startTime = Date.now();
  for (let i = 0; i <= iterations; i++) {
    testStore.count = i;
  }
  storeRefTime = Date.now() - startTime;

  // ------

  const nonRefObj = { key: 0 };
  const reactiveVar = reactive({ key: 0 });

  startTime = Date.now();
  for (let i = 0; i <= iterations; i++) {
    nonRefObj.key = i;
  }
  objTime = Date.now() - startTime;

  startTime = Date.now();
  for (let i = 0; i <= iterations; i++) {
    reactiveVar.key = i;
  }
  localReactiveTime = Date.now() - startTime;

  startTime = Date.now();
  for (let i = 0; i <= iterations; i++) {
    testStore.countReactive.key = i;
  }
  storeReactiveTime = Date.now() - startTime;

  return {
    nonRefVarTime,
    localRefTime,
    storeRefTime,

    objTime,
    localReactiveTime,
    storeReactiveTime,
  };
}
