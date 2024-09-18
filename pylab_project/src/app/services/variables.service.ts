import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Context } from "../classes/context";

@Injectable({
    providedIn: 'root',
})
export class VariablesService {
    private behaviorSubjectContexts = new BehaviorSubject<Map<Context, { [key:string]: any }>>(new Map<Context, { [key:string]: any }>());
      
    contexts = this.behaviorSubjectContexts.asObservable();

    constructor() {}

    updateContexts(contexts: any): void {
        this.behaviorSubjectContexts.next(contexts);
    }

    getVariables(context: Context): { [key:string]: any }  {
        return this.behaviorSubjectContexts.value.get(context) || {};
    }

    setVariables(context: Context, variables: any): void {
        this.behaviorSubjectContexts.value.set(context, variables);
    }

    deleteContext(context: Context): void {
        this.behaviorSubjectContexts.value.delete(context);
    }
}