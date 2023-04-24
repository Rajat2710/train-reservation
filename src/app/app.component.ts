import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'train-reservation';

  random_reserved_seats: number[] = [];
  userseats: number = 0;
  userresseats: number[] = [];

  constructor(private elementRef: ElementRef) {}

  range(start: number, end: number, step: number): number[] {
    return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    while (this.random_reserved_seats.length < 50) {
      const randomNum = Math.floor(Math.random() * 80) + 1;
      if (!this.random_reserved_seats.includes(randomNum)) {
        this.random_reserved_seats.push(randomNum);
      }
    }

    this.random_reserved_seats.forEach((value,index)=>{
      this.elementRef.nativeElement.querySelector('#item_'+value).style.backgroundColor = 'red';
    })
  }

  findNearSeats(totalSeats: number, filledSeats: number[], numSeatsToBook: number){
    //Here i am checking min distance bw seats and on basis of that returning the positions of available seats
    const availableSeats: number[] = [];

    for(let i=1;i<=totalSeats;i++){
      if(!filledSeats.includes(i)){
        availableSeats.push(i);
      }
    }
    let min=Number.MAX_SAFE_INTEGER;
    let final: number[] = [];
    for(let i=0;i<=availableSeats.length-numSeatsToBook;i++){
      let diff=0;
      let ans = [];
      console.group("Loop output");
      for(let j=i+numSeatsToBook-1;j>i;j--){
        ans.push(availableSeats[j]);
        //console.log(`Iteration ${diff} + ${availableSeats[j]} - ${availableSeats[j-1]}`);
        diff = diff+availableSeats[j]-availableSeats[j-1];
        console.log(`${diff}`);
      }
      console.log(diff);
      console.groupEnd();
      if(diff<min){
        min=diff;
        final = ans; 
      }
    }
    return final;
  }

  // findClosestSeats(totalSeats: number, filledSeats: number[], numSeatsToBook: number){
  //   const availableSeats: number[] = [];
  
  //   for (let i = 1; i <= totalSeats; i++) {
  //     if (!filledSeats.includes(i)) {
  //       availableSeats.push(i);
  //     }
  //   }
  
  //   if (availableSeats.length < numSeatsToBook) {
  //     return null;
  //   }
  
  //   let stindex = 0;
  //   let bdist = availableSeats[numSeatsToBook - 1] - availableSeats[0];
  
  //   for (let i = 1; i <= availableSeats.length - numSeatsToBook; i++) {
  //     const distance = availableSeats[i + numSeatsToBook - 1] - availableSeats[i];
  
  //     if (distance < bdist) {
  //       stindex = i;
  //       bdist = distance;
  //     }
  //   }
  
  //   return availableSeats.slice(stindex, stindex + numSeatsToBook);
  // }

  onsubmit(){
    if(this.userseats>1 && this.userseats<8 && Number.isInteger(this.userseats)){
      this.elementRef.nativeElement.querySelector('#lname').style.border = 'solid black';
      console.log(this.userseats);
      for (let i = 1; i < 81; i+=7) {
        let count=0;
        let final=[];
        for(let j=i; j<i+7; j++){
          if(!this.random_reserved_seats.includes(j)){
            count++;
            final.push(j);
            if(count==this.userseats){
              this.userresseats = final;
              break;
            }
          }
        }
        if(count==this.userseats){
          break;
        }
      }
      if(this.userresseats.length==0){
        this.userresseats = this.findNearSeats(80,this.random_reserved_seats,this.userseats)
        if(this.userresseats == null){
          alert("total no of seats are less than the reserved one")
        }
        else {
          console.log(this.userresseats);
          this.userresseats.forEach((value,index)=>{
            this.elementRef.nativeElement.querySelector('#item_'+value).style.backgroundColor = 'purple';
          })
        }
      }
      else{
        this.userresseats.forEach((value,index)=>{
          this.elementRef.nativeElement.querySelector('#item_'+value).style.backgroundColor = 'purple';
        })
      }
    }
    else {
      this.elementRef.nativeElement.querySelector('#lname').style.border = 'solid red';
    }
    
  }
}
