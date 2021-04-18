import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable } from "rxjs";
import { GithubPaginationControls, UserDetails, UsersList } from "../models";

@Injectable({
    providedIn: 'root'
})

export class GithubUserSearchApiService {
    constructor(private readonly http: HttpClient) {}

    getRepositoryList(name: string, paginationControl?: GithubPaginationControls):Observable<UsersList> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('q', name);
            if(paginationControl) {
                httpParams = httpParams.set('page', paginationControl.page.toString());
                httpParams = httpParams.set('per_page', paginationControl.per_page.toString());
            }
        return this.http.get<UsersList>(`https://api.github.com/search/users`, {params: httpParams});
    }

    getUserDetails(userUrl: string):Observable<UserDetails> {
        return this.http.get<UserDetails>(userUrl);
    }
}