export interface VoteResult {
  option: string;
  votes: number;
}

export interface Election {
  results: string;
  description: string;
  kickoff: Date;
  deadline: Date;
  candidates: string[];
}
