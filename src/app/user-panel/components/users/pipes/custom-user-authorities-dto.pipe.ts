import {Pipe, PipeTransform} from "@angular/core";
import {UserAuthorityDto} from "../models/user-authority-dto";

@Pipe({name: 'customUserAuthoritiesDtoPipe'})
export class customUserAuthoritiesDtoPipe implements PipeTransform{

  transform(value: UserAuthorityDto[], ...args: any[]): any {
    const values = UserAuthorityDto.generateValues();
    if (value.length === 0 || !value) {
      return '';
    }
    return value.map((value: UserAuthorityDto) => {
      return values.find( s => s.authority === value.authority ).displayName;
    }).join(', ');
  }
}
