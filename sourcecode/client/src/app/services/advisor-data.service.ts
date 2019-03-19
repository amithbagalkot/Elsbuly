export class AdvisorService {
    data: any;
    constructor() {
        this.data = [
            { advisorid: 320, advisorname: 'ar', ratings: '4.5', exchage: ['BSE'], costofidea: '50$', email: 'kranthimandava953@gmail.com' },
            { advisorid: 330, advisorname: 'pikkurthy', ratings: '4.1', exchage: ['BSE'], costofidea: '30$', email: 'kranthimandava953@gmail.com' },
            { advisorid: 340, advisorname: 'li', ratings: '3.9', exchage: ['NSE'], costofidea: '40$', email: 'kranthimandava953@gmail.com' },
            { advisorid: 641, advisorname: 'Johnes', ratings: '4.3', exchage: ['BSE', 'NSE'], costofidea: '70$' },
            { advisorid: 123, advisorname: 'Clark', ratings: '4.1', exchage: ['NSE'], costofidea: '60$' },
            { advisorid: 124, advisorname: 'Mickel', ratings: '4.2', exchage: ['NSE'], costofidea: '30$' },
            { advisorid: 125, advisorname: 'Ram', ratings: '3.9', exchage: ['BSE'], costofidea: '20$' },
            { advisorid: 300, advisorname: 'Sachin', ratings: '4.3', exchage: ['BSE'], costofidea: '70$' },
            { advisorid: 301, advisorname: 'Martin', ratings: '4.2', exchage: ['BSE'], costofidea: '70$' },
            { advisorid: 125, advisorname: 'Ram', ratings: '3.9', exchage: ['BSE'], costofidea: '20$' },
            { advisorid: 300, advisorname: 'Sachin', ratings: '4.3', exchage: ['BSE'], costofidea: '70$' },
            { advisorid: 301, advisorname: 'Martin', ratings: '4.2', exchage: ['BSE'], costofidea: '70$' },
            { advisorid: 125, advisorname: 'Ram', ratings: '3.9', exchage: ['BSE'], costofidea: '20$' },
            { advisorid: 300, advisorname: 'Sachin', ratings: '4.3', exchage: ['BSE'], costofidea: '70$' },
            { advisorid: 301, advisorname: 'Martin', ratings: '4.2', exchage: ['BSE'], costofidea: '70$' },
            { advisorid: 125, advisorname: 'Ram', ratings: '3.9', exchage: ['BSE'], costofidea: '20$' },
            { advisorid: 300, advisorname: 'Sachin', ratings: '4.3', exchage: ['BSE'], costofidea: '70$' },
            { advisorid: 301, advisorname: 'Martin', ratings: '4.2', exchage: ['BSE'], costofidea: '70$' }
        ]
    }
    getData() {
        return this.data
    }
}   