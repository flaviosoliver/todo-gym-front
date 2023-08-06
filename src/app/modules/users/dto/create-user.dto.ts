import { ShapeHistoryDto } from './shape-history.dto';

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  active: boolean;
  shape: ShapeHistoryDto[];
  avatar?: string;
}
