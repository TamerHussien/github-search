import { PageEvent } from "@angular/material/paginator";
import { GithubPaginationControls } from "../models/github-pagination.model";


export class Search {
    static readonly type = '[API] Search';
    constructor(public name: string){}
}
export class FetchList {
    static readonly type = '[API] Fetch List';
    constructor(public paginationControl: GithubPaginationControls){}
}

export class ChangePage {
    static readonly type = '[API] Change page';
    constructor(public pageEvent: PageEvent){}
}

export class FetchUserDetails {
    static readonly type = '[API] Fetch User Details';
    constructor(public userUrl: string){}
}