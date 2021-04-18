import { GithubPaginationControls } from "../models/github-pagination.model";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { GithubUserSearchApiService } from "../api/github-user-serach-api.service";
import { ChangePage, FetchList, FetchUserDetails, Search } from "./github-list.actions";
import { UserDetails, UsersList } from "../models";

export interface GithubRepositoriesListStateModel {
    initialized: boolean,
    searchName: string
    listItems: UsersList;
    totalCount: number;
    isLoadingList: boolean;
    paginationControl: GithubPaginationControls;
    hasErrors: boolean;
    userUrl: string,
    selectedUserDetails: UserDetails
    userLoading: boolean,
    userErrors: boolean,
}

@State<GithubRepositoriesListStateModel>({
    name: 'list',
    defaults: {
        initialized: false,
        searchName: '',
        listItems: UsersList.createNew(),
        totalCount: 0,
        isLoadingList: false,
        paginationControl: GithubPaginationControls.createNew(),
        hasErrors: false,
        userUrl: '',
        selectedUserDetails: UserDetails.createNew(),
        userLoading: false,
        userErrors: false,
    },
})

@Injectable()
export class ListState {
    constructor(private readonly githubUserSearchApiService:GithubUserSearchApiService) {}

    
    @Selector()
    static listItems(state: GithubRepositoriesListStateModel) {
        return state.listItems;
    }

    @Selector()
    static initialized(state: GithubRepositoriesListStateModel) {
        return state.initialized;
    }

    @Selector()
    static totalCount(state: GithubRepositoriesListStateModel) {
        return state.totalCount;
    }

    @Selector()
    static paginationControl(state: GithubRepositoriesListStateModel) {
        return state.paginationControl;
    }

    @Selector()
    static isLoadingList(state: GithubRepositoriesListStateModel) {
        return state.isLoadingList;
    }

    @Selector()
    static hasErrors(state: GithubRepositoriesListStateModel) {
        return state.hasErrors;
    }

    @Selector()
    static selectedUserDetails(state: GithubRepositoriesListStateModel) {
        return state.selectedUserDetails;
    }

    @Selector()
    static userLoading(state: GithubRepositoriesListStateModel) {
        return state.userLoading;
    }

    @Selector()
    static userErrors(state: GithubRepositoriesListStateModel) {
        return state.userErrors;
    }

    @Action(Search)
    fetchSearchList(ctx: StateContext<GithubRepositoriesListStateModel>, action: Search) {
        ctx.patchState({
            searchName: action.name,
            initialized: true,
        });
        ctx.dispatch(new FetchList(GithubPaginationControls.createNew()));
    }


    @Action(FetchList)
    fetchList(ctx: StateContext<GithubRepositoriesListStateModel>, action: FetchList) {
        const state = ctx.getState()
        ctx.patchState({
            isLoadingList: true,
        });
        this.githubUserSearchApiService.getRepositoryList(state.searchName, action.paginationControl).subscribe((data: UsersList) => {
            ctx.patchState({
                listItems: {...data},
                totalCount: data.total_count,
                hasErrors: false,
                isLoadingList: false,
            });
        }, err => {
            ctx.patchState({
                hasErrors: true,
                isLoadingList: false,
            })
        });
    }

    
    @Action(ChangePage)
    changePage(ctx: StateContext<GithubRepositoriesListStateModel>, action: ChangePage) {
        const state = ctx.getState();
       ctx.dispatch(new FetchList({
           ...state.paginationControl,
           page: ++action.pageEvent.pageIndex,
           per_page: action.pageEvent.pageSize,
       }))
    }

    @Action(FetchUserDetails)
    fetchUserDetails(ctx: StateContext<GithubRepositoriesListStateModel>, action: FetchUserDetails) {
        ctx.patchState({
            userUrl: action.userUrl,
            userLoading: true,
            selectedUserDetails: UserDetails.createNew(),
        })

        this.githubUserSearchApiService.getUserDetails(action.userUrl).subscribe((user: UserDetails) => {
            ctx.patchState({
                selectedUserDetails: user,
                userLoading: false,
                userErrors: false,
            })
        }, err => {
            ctx.patchState({
                selectedUserDetails: UserDetails.createNew(),
                userLoading: false,
                userErrors: true,
            })
        })
    }
}
