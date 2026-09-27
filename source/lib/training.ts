import data from "./training-data.json";
import type {TrainingData} from "./training-types";
export const training = data as TrainingData;
export const mechanismForChain = (id:string) => training.mechanisms.find(m=>m.id===training.chainMechanisms[id]);
export const exercisesForChain = (id:string) => training.exercises.filter(e=>e.sourceId===id);
