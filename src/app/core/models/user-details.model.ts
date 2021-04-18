export class UserDetails{
   constructor(
        public login: string,
        public id: number,
        public node_id: string,
        public avatar_url: string,
        public gravatar_id: string,
        public url: string,
        public html_url: string,
        public followers_url: string,
        public following_url: string,
        public gists_url: string,
        public starred_url: string,
        public subscriptions_url: string,
        public organizations_url: string,
        public repos_url: string,
        public events_url: string,
        public received_events_url: string,
        public type: string,
        public site_admin: boolean,
        public name: string,
        public company: string,
        public blog: string,
        public location: string,
        public hireable: boolean,
        public bio: string,
        public public_repos: number,
        public public_gists: number,
        public followers: number,
        public following: number,
        public created_at: Date,
        public updated_at: Date,
        public email?: any,
        public twitter_username?: any,
   ){}

   public static createNew():UserDetails {
       return new UserDetails('', 0, '', '', '', '', '', '', '', '', '', '', '', '', ''
       , '', '', false, '', '', '', '', false, '', 0, 0, 0, 0, new Date(), new Date(), '', '')
   }
}

