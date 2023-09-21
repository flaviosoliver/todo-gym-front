export class ParamsDto {
  focusMuscle?: string[];
  name?: string;
  userId?: string;
  expiresIn?: Date;

  constructor(params: ParamsDto) {
    this.focusMuscle = params.focusMuscle;
    this.name = params.name;
    this.userId = params.userId;
    this.expiresIn = params.expiresIn;
  }
}
