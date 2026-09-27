export type BlankKind = "L" | "C" | "D";
export type ClozeBlank = {start:number;end:number;answer:string;hint:string;kind:BlankKind};
export type Mechanism = {id:string;name:string;description:string;chains:string[]};
export type ImitationExercise = {
  id:string;title:string;sourceId:string;targetId:string;mechanismId:string;
  prompt:string;steps:string[];focus:string;crossTopic:boolean;
};
export type TrainingData = {
  mechanisms:Mechanism[];chainMechanisms:Record<string,string>;
  cloze:Record<string,ClozeBlank[]>;exercises:ImitationExercise[];
};
