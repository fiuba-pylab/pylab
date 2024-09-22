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

    getVariables(context: Context): { [key:string]: any }  {
        return this.behaviorSubjectContexts.value.get(context) || {};
    }

    setVariables(context: Context, variables: any): void {
        const contexts = this.behaviorSubjectContexts.value.set(context, variables);
        this.behaviorSubjectContexts.next(contexts);
    }

    deleteContext(context: Context): void {
        this.behaviorSubjectContexts.value.delete(context);
        this.behaviorSubjectContexts.next(this.behaviorSubjectContexts.value);
    }
}