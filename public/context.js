// const object = {
//   name: 'Some unnamed object',
//   getName() {
//     return this.name;
//   },
//   logNameWithDelay(greeting) {
//     console.log('local this', this);
//     // function cb() {
//     //   console.log('cb this', this);
//     //   console.log(`${greeting} ${this.name}`);
//     // }
//     // setTimeout(cb.bind(this), 1000);
//     setTimeout(() => {
//       console.log('arrow this', this);
//       console.log(`${greeting} ${this.name}`);
//       setTimeout(() => {
//         setTimeout(() => {
//           setTimeout(() => {
//             setTimeout(() => {
//               console.log('meganesteded this', this)
//             }, 0)
//           }, 0)
//         }, 0)
//       }, 0)
//     }, 1000);
//   },
//   logName(greeting, a, b) {
//     console.log('local this', this);
//     console.log(`${greeting} ${this.name}`);
//   },
//   logNameArrow: (greeting) => {
//     console.log('local this', this);
//     console.log(`${greeting} ${this.name}`);
//   },
// };

// object.logNameWithDelay('Welcome');
// object.logName('Welcome');

// apply, call, bind
// const object2 = {
//   name: 'object 2',
// };

// bind
// const myMethod = object.logName.bind(object2);
// myMethod();

// apply, call

// const myMethod = object.logName;
// myMethod.apply(object2, ['Welcome', 'a', 'b']);
// myMethod.call(object2, 'Welcome', 'a', 'b');

// myFunction2();
// myFunction();

// const myFunction = function() {
//   console.log('myFunction()');
// };
// function myFunction2() {
//   console.log('myFunction2()');
// }
// // this.myFunction2 = myFunction;

// const $btn = document.getElementById('btn')

// $btn.addEventListener('click', function() {
//   this.style.background = '#000000';
//   // console.log('function:', this);
// });

// $btn.addEventListener('click', () => {
//   $btn.style.background = '#FF0000';
//   // this.style.background = '#000000';
//   // console.log('arrow:', this);
// });
