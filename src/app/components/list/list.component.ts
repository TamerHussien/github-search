import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { ChangePage, FetchUserDetails, Search } from 'src/app/core/state/github-list.actions';
import { ListState } from 'src/app/core/state/github-list.state';
import {MatDialog} from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { GithubPaginationControls, User } from 'src/app/core/models';

 @Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  
  listItems$ = this.store.select(ListState.listItems);
  totalCount$ = this.store.select(ListState.totalCount);
  isLoadingList$ = this.store.select(ListState.isLoadingList);
  initialized$ = this.store.select(ListState.initialized);
  hasErrors$ = this.store.select(ListState.hasErrors);


  displayedColumns: string[] = ['login', 'score', 'avatar_url', 'type', 'id', 'view'];
  pageSizeOptions=[10, 20, 30];
  pageSize = 10;
  dataSource = new MatTableDataSource<User>();
  paginationControls = GithubPaginationControls.createNew();
  formGroup!: FormGroup;

  constructor( private readonly store: Store, private readonly fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.buildForm();
    this.listItems$.subscribe(data => {
      this.dataSource.data = data.items;
      });
  }

  onChangePage(event: PageEvent) {
    this.store.dispatch(new ChangePage(event));
  }

  buildForm() {
    this.formGroup = this.fb.group({
      userName: new FormControl('', Validators.required)
    })

    this.formGroup.controls.userName.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe(val => {
      if(val) {
        this.store.dispatch(new Search(val));
      }
    })
  }

  viewDetails(user: User) {
    this.store.dispatch(new FetchUserDetails(user.url))
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(DetailsComponent);
  }
}
