import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

export interface Feedback {
  message: string,
  name: string
}

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          let el = document.getElementById(params['destination'])
          this.doScroll(el!)
        }
      );
  }

  doScroll(el: HTMLElement) {
    setTimeout(() => {
      el.scrollIntoView({behavior: "smooth"});
    }, 0);
  }

  feedbacks: Feedback[] = [
    {
      message: "O agenție cu angajați foarte devotați și profesioniști, \n" +
        "recomand cu încredere!", name: "Ion Popescu"
    },
    {
      message: "Oameni profesioniști care se\n" +
        "ocupă de toate detaliile și vin cu idei inovative. Sunt foarte mulțumit. ", name: "Ion Popescu"
    },
    {
      message: "Totul este foarte bine pus \n" +
        "la punct, recomand această\n" +
        "agenție pentru viitoarele \n" +
        "voastre achiziții! ", name: "Ion Popescu"
    },
    {
      message: "O agenție cu angajați foarte devotați și profesioniști, \n" +
        "recomand cu încredere!", name: "Ion Popescu"
    },
  ]

}
