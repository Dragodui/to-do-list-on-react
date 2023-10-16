export interface ITodo {
    id:number;
    title:string;
    note:string;
    complete:boolean;
    priority: number;
}

export interface IDeletedItem {
    id: number;
    complete: boolean;
}

export interface IChosenItem {
    id:number;
    chosen: boolean;
}