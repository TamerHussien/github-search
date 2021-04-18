import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { ListState } from "src/app/core/state/github-list.state";

@Component({
    templateUrl :'./details.component.html',
    selector : 'app-details'
})

export class DetailsComponent implements OnInit {

    selectedUserDetails$ = this.store.select(ListState.selectedUserDetails);
    userLoading$ = this.store.select(ListState.userLoading);
    userErrors$ = this.store.select(ListState.userErrors);

    constructor(private readonly store: Store) {}


    ngOnInit() {
        this.selectedUserDetails$.subscribe(data => console.log(data))
    }
}