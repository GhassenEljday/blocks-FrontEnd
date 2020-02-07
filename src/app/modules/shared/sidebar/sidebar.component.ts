import {
  Component,
  AfterViewInit,
  OnInit,
  HostBinding,
  Input,
  Output
} from "@angular/core";
import { ROUTES } from "./menu-items";
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
declare var $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      )
    ])
  ]
})
export class SidebarComponent implements OnInit {
  showMenu = "";
  expanded: boolean;
  // @HostBinding("attr.aria-expanded") ariaExpanded = this.expanded;
  // @Input() item: NavItem;
  // @Input() depth: number;
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = "0";
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit() {
    console.log(
      (this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem))
    );
  }
}
