import { NgModuleCompileResult } from "@angular/compiler/src/ng_module_compiler";

export interface IRating {
    isRating:boolean,
    hasError:boolean,
    error:string,
    isLoading:boolean,
    result:any;
}