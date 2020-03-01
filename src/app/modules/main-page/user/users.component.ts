import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApolloService } from "../../../core/apollo.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users = [{
    id: 18,
    username: "John",
    balance: 12,
    email: "test@test.com",
    subId: 20,
    sub: "water Fall"
  }, {
    id: 13,
    username: "Ahmed",
    balance: 135,
    email: "admiin@admiin.com",

    subId: 19,
    sub: "Monthly Maintance"
  }, {
    id: 18,
    username: "Adam",
    balance: -25,
    email: "admiin@admiin.com",
    subId: 13,
    sub: "Elavator",
  }]
  public currentUser = localStorage.getItem("currentUser");
  loading = true;
  //   {
  //     email: "one@one.com",
  //     userSubscription: [
  //       { name: "fathi1", balance: -200, user: "username1", block: "block1" }
  //     ],
  //     adminBlock: "admin1"
  //   },
  //   {
  //     email: "tow@tow.com",
  //     userSubscription: [
  //       { name: "hasan2", balance: 100, user: "username2", block: "block2" }
  //     ],
  //     adminBlock: "admin2"
  //   }
  // ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: ApolloService
  ) { }
  id = "";
  sub: any;
  userId: any;
  blockIds: Number[] = [];
  ngOnInit() {
    //   this.sub = this.route.params.subscribe(params => {
    //       // this.id = params+'';
    //       //  this.getBlock(this.id)
    //       if(params.id){
    //         // call users in this block
    //         console.log(params, 'this is blockId');
    //         this.apollo.getUsersOfBlock(params.id)
    //         .subscribe(res =>
    //             res.data.block.blockSubscriptions.forEach(element => {
    //               this.users.push(element)
    //               console.log(element)
    //             })
    //           )
    //       }
    //       else {
    //           //call all users by admin id
    //       console.log('ther ia no params')
    //       this.userId= localStorage.getItem("currentUser")
    //         this.apollo.getBlocksByAdminId(this.userId)
    //       .subscribe(res=>
    //         res.data.blocks.forEach(element => {
    //         // console.log(element.blockId)
    //           this.blockIds.push(element.blockId)
    //           this.blockIds.forEach(element=>
    //             // console.log(this.blockIds)
    //             this.apollo.getUsersOfBlock(element)
    //             .subscribe(res =>
    //             //   //pupulation issue
    //               res.data.block.blockSubscriptions.map(element => {
    //                 this.users.push(element)
    //             //     console.log(element)
    //               })
    //             )
    //           )
    //         })
    //       )
    //     }
    //   })
    // }
    // onClick(event){
    //   event.preventDefault()
  }
  userMoreInfo(use) {
    /*
    NOTES:
    I have add the service to get user from the backend
    */
    // ADAM

    console.log(use, "this is user");
    //redirect to new page that have the user record
    this.router.navigate(["/user/balance", 18]);
    // Get http record
    this.apollo.getUser(this.currentUser).subscribe(
      result => {
        if (result.errors) {
          console.log(result.errors[0].message);
        } else {
          this.users = result.data.services;
          console.log(result);
        }
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
