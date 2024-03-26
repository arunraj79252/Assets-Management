import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable()
export class Constants {
  public static API_ENDPOINT = environment.API_ENDPOINT;
}
