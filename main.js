const components = {
    inputGrid: 'gridInput',

}
function selectComponent(component) {

    location.href=`widgets/${component}.html`;
}

document.querySelectorAll('.tile').forEach(input => input.addEventListener('click', ()=>{selectComponent(input.getAttribute('attr'))}));;

 
