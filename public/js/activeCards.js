// var active = document.getElementsByClassName("done");
var active = []
// $(".done").text();
console.log(active);

for (let i=1;i<=20;i++) {
    // active.push($())
    let currentDone = $(`.done${i}`).text()
    console.log(`The done${i} value is: `, currentDone);
    if (currentDone === "true") {
        $(`#btn${i}`).addClass( "disabled" );
    }
}

// if (active === "true") {
//     console.log('It is true!');
//     $("#btn2").addClass( "disabled" );
// }
// console.log('Hello World!');