let createUser: {
  name: "rani";
  email: "rani@gmail.com";
  isActive: true;
};

function user({ name: string, isPaid: boolean }) {}

user({ name: "rani", isPaid: false });

//but if we want to add any other key to the object it will give error
// user({ name: "rani", isPaid: false, email:"g@g.com" })

//so to resolve this we can.....
let newUser = { name: "rani", isPaid: false, email: "g@g.com" };
user(newUser);

function createCourse(): { name: string; price: number } {
  return { name: "reactjs", price: 399 };
}

//type Aliases

// type User = {
//   name: string;
//   email: string;
//   isActive: boolean;
// };

// function User(user: User): User {
//   return { name: "", email: "", isActive: true };
// }

type User = {
  readonly _id: string;
  name: string;
  email: string;
  isActive: boolean;
  credCardDetails?: number; //now it is optional
};

let myUser: User = {
  _id: "12345",
  name: "ee",
  email: "ee@gmail.com",
  isActive: true,
};

myUser.name = "rr";
// myUser._id = "eee" //can't change or reassign the
// value becuase it is of readonly property

export {};
