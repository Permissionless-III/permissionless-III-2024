export interface VoteResult {
  option: string;
  votes: number;
}

export interface Election {
  id: number;
  name: string;
  description: string;
  results: string;
  kickoff: Date;
  deadline: BigInt;
  candidates: string[];
}
