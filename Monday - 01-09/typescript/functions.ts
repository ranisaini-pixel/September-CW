// function addTwo(num) { //num gives error of any
//     return num + 2;
// }

// addTwo("5")

//so we have to assign type

function addThree(num: number) {
    // num.toUpperCase()//not allowed
    return num + 2;
}


function getUpper(value: string) {
    return value.toUpperCase()
}

function signUpUser(name: string, email: string, isLoggedIn: boolean) { }
//arrow function
let loginUser = (name: string, email: string, isPaid: boolean = false) => { } // isPaid:boolean=false is default value
// in case real args is not passed



addThree(3)
getUpper("hi");
signUpUser("rani", "rani@gmail.com", false)
loginUser("gds", "ff@f.com")


function addFour(num: number): number {
    return num + 2;
    // return "hello"; //this is wrong, to restrict 
    // this we have make this function of type number
}


let getHello = (s: string): string => {
    return "";
}

function consoleError(errmsg: string): void{
    console.log(errmsg);
}// void means function will not return anything

function handleError(errmsg: string): void{
    console.log(errmsg);
}
 

addFour(9)
getHello("oppo")   


//if in case two types of data types are returning from the function

// function getValue(myVal: number): boolean{
//     if (myVal > 5) {
//         return true // returning boolean
//     }
//     return "200 OK" // return string
// }