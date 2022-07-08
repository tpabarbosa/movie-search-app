export interface IUser {
    name: string;
    id: number;
    username: string;
    avatar: {
        tmdb: {
            avatar_path: string
        }
    }
}

export interface ICast {
    original_name: string;
    profile_path: string;
    character: string;
}

export interface IMovie {
    id: number,
    genre_ids: number[],
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: Date,
    title: string,
    vote_average: number,
    vote_count: number
    credits: {
        cast: ICast[]
    },
    recommendations: IGetCollection<IMovie>

}

export interface IMovieDetails extends Omit<IMovie, 'genre_ids'> {
    backdrop_path: string,
    genres: {
        id: number,
        name: string
    }[],
    tagline: string,
    runtime: number | null
}

export interface IList {
    description: string,
    favorite_count: number,
    id: number,
    item_count: number,
    list_type: 'movie' | 'tv',
    name: string,
    poster_path: string
}

export interface IMovieAccountStates {
    id: number,
    favorite: boolean, 
    watchlist: boolean,
    rated: boolean | {value: number}
}

export interface IListToCreate {
    name: string,
    description: string,
}

export interface IActionResult {
    success: boolean,
    status_code: number
    status_message: string
}

export type IModal = {
    open: (e?: MouseEvent) => void
    close: (e?: MouseEvent) => void
}

export type IMovieAccountStateComponent = {
    setValues: (movieId: string, value: boolean | {value: number}) => void
}

export interface IGetCollection<Type> {
    page: number,
    results: Type[],
    total_pages: number,
    total_results: number
}

export interface IComponent {
    load: () => Promise<string> | string
    onLoad: () => void
}


export interface AppProps {
    query_params: URLSearchParams
    session_id: string | undefined
    user: IUser | undefined
}

export abstract class AbstractComponent<Props> implements IComponent{
    readonly appProps: AppProps | undefined
    readonly props: Props | undefined

    constructor(appProps?: AppProps, componentProps?:Props) {
        this.appProps = appProps;
        this.props = componentProps
    }
    
    public abstract load: () => Promise<string> | string
    public abstract onLoad: () => void
    public static create: (...options: any) => undefined | IComponent | Promise<IComponent | undefined> 
}

export type MovieAccountStatesProps = {id: string, hideText: boolean}

export abstract class AbstractPage extends AbstractComponent<undefined>{
    readonly params: URLSearchParams
    readonly session_id: string | undefined
    readonly user: IUser | undefined

    constructor(props: AppProps) {
        super(props)
        this.params = props.query_params
        this.user = props.user
        this.session_id = props.session_id
    }
    
    public static create: (props: AppProps) => undefined | IComponent | Promise<IComponent | undefined>  
}

