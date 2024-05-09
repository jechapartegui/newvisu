export class officials{
  id: number;
  firstname:string;
  lastname: string;
  teamid: number;
  contact: string;
  role:string;
  manager:boolean;
  constructor(){
    this.id = -1;
    this.firstname = "";
    this.lastname="";
    this.contact = "";
    this.role = "";
    this.manager = false;
  }
}
