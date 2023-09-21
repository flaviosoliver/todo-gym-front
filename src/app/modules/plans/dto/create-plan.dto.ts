import { Training } from '../../shared/interface/training.interface';

export interface CreatePlanDto {
  name: string;
  focusMuscle: string[];
  expiresIn: Date;
  userId: string;
  training: Training[];
}
