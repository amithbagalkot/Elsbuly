import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'TimeZoneDate',
    pure: true
})

export class TimeZoneDatePipe extends DatePipe {
    transform(value:any, pattern: string = 'mediumDate'): string|null {
        console.log(value);
        let result = super.transform(value, pattern);
        console.log(result);
        result += " " + this.map[Intl.DateTimeFormat().resolvedOptions().timeZone];
        console.log(result);
        return result; 
    }

    map = {
        "Asia/CalCutta": "IST"
    };
}