const components = {
    inputGrid: 'gridInput'
}
function selectComponent(component) {
    // Handle the selection logic here
    console.log(`Selected ${component}`);
    switch (components){
        case components.inputGrid:

            break;
    }
    location.href=`widgets/${components.inputGrid}.html`;
}

document.querySelectorAll('.tile').forEach(input => input.addEventListener('click', ()=>{selectComponent(input.getAttribute('attr'))}));;

 
