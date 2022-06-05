let elTelTemplate = document.querySelector('#tel-template');
let elTelWrapper = document.querySelector('.tel-wrapper')

const addZero = num => {
    return num < 10 ? "0" + num : num;
}

const createTelBox = product => {

    //? Bu yerda biz kodni ixchamladik
    const { id, title, price, model, addedDate, benefits } = product
    //?

    const elTelBox = elTelTemplate.cloneNode(true).content;


    // const elTelImg = elTelBox.querySelector('.card-img');
    // elTelImg.src = img;



    const elTelId = elTelBox.querySelector('.card-id');
    elTelId.textContent = id;
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


    //?  Dataset bn ishlash
    const elAddBtn = elTelBox.querySelector('.btn-trash');
    elAddBtn.dataset.id = id;

    const elEditBtn = elTelBox.querySelector('.btn-secondary');
    elEditBtn.dataset.id = id;

    return elTelBox;
}


const renderProducts = () => {
    elTelWrapper.innerHTML = ""

    products.forEach((product1) => {
        const elTelBox = createTelBox(product1);
        elTelWrapper.appendChild(elTelBox);
    });
}
renderProducts();






//? new productni qoshish
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
        elTelWrapper.prepend(elNewProduct);
        elAddProductForm.reset();
    }
    // console.log(e.target.elements);
});




//?  Edit ishlatish uchun olib kelingan ozgaruvchilar
const elEditModal = new bootstrap.Modal('#edit-product-modal')

const elEditForm = document.querySelector('#edit-product-modal');
const elEditTitle = elEditForm.querySelector('#edit-product-title');
const elEditPrice = elEditForm.querySelector('#edit-product-price');
const elEditManafacture = elEditForm.querySelector('#edit-product-manufacturer');
const elEditBenefits = elEditForm.querySelector('#edit-product-benefits');




elTelWrapper.addEventListener('click', (evt) => {
    if (evt.target.matches('.btn-trash')) {
        const clickedBtn = +evt.target.dataset.id;
        const clickedBtnIndex = products.findIndex((product) => product.id === clickedBtn);
        products.splice(clickedBtnIndex, 1)
        renderProducts();

    }



    if (evt.target.matches('.btn-secondary')) {
        const clickedBtn = +evt.target.dataset.id;
        const clickedBtnObj = products.find((product) => product.id === clickedBtn);
        // const clickedBtnObj = products[clickedBtnIndex]

        if (clickedBtnObj) {
            elEditTitle.value = clickedBtnObj.title || "";
            elEditPrice.value = clickedBtnObj.price || "";
            elEditManafacture.value = clickedBtnObj.model;
            elEditBenefits.value = clickedBtnObj.benefits || "";

            elEditForm.dataset.id = clickedBtn;
        }
    };
});


elEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editingId = e.target.dataset.editingId;
    const formElement = e.target.elements;

    const TitleInputValue = formElement[0].value.trim();
    const PriceValue = +formElement[1].value.trim();
    const manufacturersValue = formElement[2].value;
    // const benefitsValue = +formElement[3].value.trim();
    const definitionRAM = formElement[4].textContent;


    if (TitleInputValue && PriceValue > 0) {
        const editingItemIndex = products.find((product) => product.id === editingId);


        const editProduct = {
            id: editingId,
            title: TitleInputValue,
            model: manufacturersValue,
            price: PriceValue,
            addedDate: new Date().toISOString(),
            benefits: definitionRAM
        }

        products.splice(editingItemIndex, 1, editProduct)

        renderProducts();
        elEditModal.hide();
    }

    console.log(e.target);
})




const elFilterForm = document.querySelector("#filter-form");

// ? ---------------------------------------1
// ? Filter funksiyasini ishlash prinsipi
// const filter = (array, fn) => {
//         const filteredProduct = [];

//         array.forEach((element) => {
//             if (fn(element)) {
//                 filteredProduct.push(element);
//             }
//         })

//         return filteredProduct;
//     }
// ? ---------------------------------------1



elFilterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filterElements = e.target.elements;


    const elFilterSearch = filterElements["filter-search"].value;
    const elFilterMarkFrom = filterElements['mark-from'].value
    const elFilterMarkTo = filterElements['mark-to'].value
    const elFilterManufacturer = filterElements['filter-manufacturer'].value
    const elFilterSortBy = filterElements['sortby'].value


    // ? Filter Funksiyasini ishlash prinsipi
    // const compareFn = function(element) {
    //     return element.title.toLocaleLowerCase().includes(elFilterSearch.toLocaleLowerCase())
    // }

    // const filteredProduct = filter(products, compareFn);

    // console.log(filteredProduct);


    const filteredProduct = products.filter(element => {
        return element.title.toLocaleLowerCase().includes(elFilterSearch.toLocaleLowerCase())
    });

    console.log(filteredProduct);

    // ? Qoalbola usuli
    // const filteredProduct = [];

    // products.forEach((product) => {
    //     if (product.title.includes(elFilterSearch)) {
    //         filteredProduct.push(product);
    //     }
    // })


})