let elTelTemplate = document.querySelector('#tel-template');
let elTelWrapper = document.querySelector('.tel-wrapper')


const addZero = num => {
    return num < 10 ? "0" + num : num;
}

const createTelBox = product => {

    //! Bu yerda biz kodni ixchamladik
    const { title, price, model, addedDate, benefits } = product
    //?

    const elTelBox = elTelTemplate.cloneNode(true).content;


    const elTelTitle = elTelBox.querySelector('.card-title');
    elTelTitle.textContent = title;


    const elTelPrice = elTelBox.querySelector('.card-price');
    elTelPrice.textContent = price;

    const elTelCompany = elTelBox.querySelector('.company-name');
    elTelCompany.textContent = model;

    const elTelDate = elTelBox.querySelector('.card-data');
    const telData = new Date(addedDate);
    elTelDate.textContent = `${addZero(telData.getDate())}.${addZero(telData.getMonth()+1)}.${telData.getFullYear()} ${addZero(telData.getHours())}:${addZero(telData.getMinutes())}`

    const elTelConditionRam = elTelBox.querySelector('.tel-condition-ram')
    elTelConditionRam.textContent = benefits[0];

    // const elTelConditionMemory = elTelBox.querySelector('.tel-condition-memory')
    // elTelConditionMemory.textContent = product.benefits[1];

    // const elTelConditionWaterproof = elTelBox.querySelector('.tel-condition-waterproof')
    // elTelConditionWaterproof.textContent = product.benefits[2];

    // const elTelConditionGoodSide = elTelBox.querySelector('.tel-good-side')
    // elTelConditionGoodSide.textContent = product.benefits[3];


    //!  Dataset bn ishlash
    const elDeleteBtn = elTelBox.querySelector('.btn-trash');
    elDeleteBtn.dataset.price = price;


    return elTelBox;
}


const renderStudents = () => {
    elTelWrapper.innerHTML = ""

    products.forEach((product1) => {
        const elTelBox = createTelBox(product1);
        elTelWrapper.appendChild(elTelBox);
    });
}
renderStudents();






// ! new productni qoshish
const elAddProductForm = document.querySelector('#add-product-form')

elAddProductForm.addEventListener('submit', e => {
    e.preventDefault();

    const formElement = e.target.elements;

    const TitleInputValue = formElement[0].value.trim();
    const PriceValue = +formElement[1].value.trim();
    const manufacturersValue = formElement[2].value;
    const benefitsValue = +formElement[3].value.trim();
    const definitionRAM = formElement[4].textContent;


    if (TitleInputValue && PriceValue && benefitsValue > 0) {


        const addingProduct = {
            id: Math.floor(Math.random() * 1000),
            title: TitleInputValue,
            model: manufacturersValue,
            price: PriceValue,
            addedDate: new Date().toISOString(),
            benefits: definitionRAM
        }

        products.unshift(addingProduct)

        const elNewProduct = createTelBox(addingProduct)
        elTelWrapper.prepend(elNewProduct)
    }


    console.log(e.target.elements);
});


// const elBtnTrash = document.querySelector('.btn-trash');

// elBtnTrash.addEventListener('click', (e) => {
//     e.target.classList.contains('.btn-trash')
//         // elTelWrapper.contains.remove();
//     e.target.parentElement.remove();
// })

// // function removeSingle(e) {

// //     if (e.target.classList.contains('.btn-trash')) {
// //         e.target.parentElement.remove();
// //     }
// ! Deleteni ishlatish

elTelWrapper.addEventListener('click', (evt) => {
    if (evt.target.matches('.btn-trash')) {
        const clickedBtn = +evt.target.dataset.price;
        const clickedBtnIndex = products.findIndex((product) => {
            return product.price === clickedBtn;
        });
        products.splice(clickedBtnIndex, 1)

        renderStudents();

    }
})