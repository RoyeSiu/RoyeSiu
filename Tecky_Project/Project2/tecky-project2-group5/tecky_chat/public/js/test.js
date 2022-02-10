let arr=[
    {name:"a",age:1},
    {name:"b",age:2},
    {name:"c",age:3}
]

function compareByName(a,b){
    return ('' + b.name).localeCompare(a.name);
}
function compareByAge(a,b){
    return b.age-a.age;
}
let arr2=arr.sort(arr,compareByName)
let arr3=arr.sort(arr,compareByAge)