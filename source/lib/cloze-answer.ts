// Only orthographic equivalence: do not silently accept a different phrase.
const spellings:Record<string,string> = {
  labour:"labor",labours:"labors",judgement:"judgment",judgements:"judgments",
  behaviour:"behavior",behaviours:"behaviors",behavioural:"behavioral",
  organisation:"organization",organisations:"organizations",organised:"organized",
  organise:"organize",organising:"organizing",recognise:"recognize",recognises:"recognizes",
  recognised:"recognized",recognising:"recognizing",specialised:"specialized",
  centre:"center",centres:"centers",programme:"program",programmes:"programs",
  prioritise:"prioritize",prioritises:"prioritizes",prioritising:"prioritizing",
  minimise:"minimize",minimises:"minimizes",maximise:"maximize",maximises:"maximizes",
  practise:"practice",practises:"practices",practised:"practiced",practising:"practicing",
  emphasise:"emphasize",emphasises:"emphasizes",emphasised:"emphasized",
  familiarise:"familiarize",favour:"favor",favourable:"favorable",neighbourhood:"neighborhood",
};
export function normalizeClozeAnswer(value:string){
  return value.normalize("NFKC").toLowerCase().replace(/[‘’]/g,"'").replace(/[‐‑–—]/g,"-")
    .trim().replace(/[.,;:!?。；，！？]+$/u,"").replace(/\s+/g," ").trim()
    .replace(/[a-z]+/g,word=>spellings[word]??word);
}
export const matchesClozeAnswer = (value:string,answer:string) => normalizeClozeAnswer(value)===normalizeClozeAnswer(answer);
