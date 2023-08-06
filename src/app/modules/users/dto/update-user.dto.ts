import { ShapeHistoryDto } from './shape-history.dto';

export interface UpdateUserDto {
  id: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  active?: boolean;
  shape?: ShapeHistoryDto[];
  avatar?: string;
}
