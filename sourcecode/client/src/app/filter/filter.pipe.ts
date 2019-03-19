import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter_search'
})

export class FilterPipe implements PipeTransform {
  transform(ideas: any, exchange_search: string, advisor_search:string, script_search:any ): any {
      if(ideas && ideas.length) {
        return ideas.filter((idea)=>{
        
          if(exchange_search && idea.actual_exchange_code.toLowerCase().indexOf(exchange_search.toLowerCase()) === -1) {
            return false
          }
          if(advisor_search && idea.user_name.toLowerCase().indexOf(advisor_search.toLowerCase()) === -1) {
            return false
          }
          if(script_search && idea.user_name.toLowerCase().indexOf(script_search.toLowerCase()) === -1) {
            return false
          }   
        return true
        //return idea.toLowerCase().includes(exchange_search)
      })
  }
  else {
  return ideas
  }
} 
}