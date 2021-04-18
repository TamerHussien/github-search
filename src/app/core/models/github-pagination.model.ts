export class GithubPaginationControls {
    constructor(
        public page: number,
        public per_page: number,
        public sort?: string,
    ) {}

    public static createNew(): GithubPaginationControls {
        return new GithubPaginationControls(1, 10, '');
    }
}