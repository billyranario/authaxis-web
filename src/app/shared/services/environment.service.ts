import { Injectable } from "@angular/core";
import { LocalStorageConstants } from "../constants/localstorage.constant";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public apiUrl: string = 'http://localhost:8081/api';
  public adminApiVersion: string = 'v1';
  public adminApiUrl: string = `${this.apiUrl}/${this.adminApiVersion}/admin`;
  public OAuthApiUrl: string = '';
  public token: string = '';

  /**
   * 
   * @param token 
   */
  setToken(token: string): void {
    localStorage.setItem(LocalStorageConstants.token, token);
  }

  /**
   * 
   * @returns string|null  
   */
  getToken(): string|null {
    return localStorage.getItem(LocalStorageConstants.token) ?? null;
  }

}