$('.pinMain').click(function () {
    var id = document.getElementById('mainId').innerHTML;
    console.log(id);
    window.location.href=`/demographic/${id}`
});

$('.all').click(function () {
    var id2 = document.getElementById('mainId').innerHTML;
    
    window.location.href=`/fetchAll/${id2}`
});

$('.plus').click(function () {
    var id2 = document.getElementById('mainId').innerHTML;
    window.location.href=`/newPat/${id2}`
});
