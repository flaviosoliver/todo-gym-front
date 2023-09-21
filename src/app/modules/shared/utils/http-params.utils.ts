import { ParamsDto } from '../dto/params.dto';

export function buildParams(params: ParamsDto) {
  const httpParams: any = {};

  if (params.focusMuscle) {
    httpParams.focusMuscle = params.focusMuscle;
  }

  if (params.name) {
    httpParams.name = params.name;
  }

  if (params.userId) {
    httpParams.userId = params.userId;
  }

  if (params.expiresIn) {
    httpParams.expiresIn = params.expiresIn;
  }

  console.log(httpParams);

  return httpParams;
}
