import { ShapeHistoryDto } from '../dto/shape-history.dto';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  active: boolean;
  shape: ShapeHistoryDto[];
  avatar: string;
}
