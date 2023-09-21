export interface Training {
  id: string;
  exerciseId: string;
  series: string;
  repetitions: string;
  load: string;
  notes: string;
  done: boolean;
  exerciseName?: string;
  exerciseImage?: string;
  exerciseVideo?: string;
}
