export interface ITodo {
    id:number;
    title:string;
    note:string;
    complete:boolean;
}

export interface IDeletedItem {
    id: number;
    complete: boolean;
}