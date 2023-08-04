import { Training } from '../../shared/interface/training.interface';

export interface Plan {
  id: string;
  name: string;
  focusMuscle: string[];
  expiresIn: Date;
  userId: string;
  training: Training[];
}
