let elTelTemplate = document.querySelector('#tel-template');
let elTelWrapper = document.querySelector('.tel-wrapper');
const count = document.querySelector('.count');

const addZero = num => {
    return num < 10 ? "0" + num : num;
}


const createTelBox = product => {

    //? Bu yerda biz kodni ixchamladik
    const { img, id, title, price, model, addedDate, benefits } = product
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

    const elTelConditionMemory = elTelBox.querySelector('.tel-condition-memory')
    elTelConditionMemory.textContent = product.benefits[1];

    const elTelConditionWaterproof = elTelBox.querySelector('.tel-condition-waterproof')
    elTelConditionWaterproof.textContent = product.benefits[2];

    const elTelConditionGoodSide = elTelBox.querySelector('.tel-good-side')
    elTelConditionGoodSide.textContent = product.benefits[3];

    // count.textContent = elTelBox.length;

    //?  Dataset bn ishlash
    const elAddBtn = elTelBox.querySelector('.btn-trash');
    elAddBtn.dataset.id = id;

    const elEditBtn = elTelBox.querySelector('.btn-secondary');
    elEditBtn.dataset.id = id;

    return elTelBox;
}



// ?   Products Array boyicha productlarni korsatib beradi
const renderProducts = (productArray = products) => {
    elTelWrapper.innerHTML = ""

    productArray.forEach((product1) => {
        const elTelBox = createTelBox(product1);
        elTelWrapper.appendChild(elTelBox);
    });
}
renderProducts();
// ? =====================================================




//? new productni qoshish
const elAddProductForm = document.querySelector('#add-product-form')
const elAddModal = new bootstrap.Modal('#add-product-modal')

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


    renderProducts();
    elAddModal.hide();
});




//?  Edit ishlatish uchun olib kelingan ozgaruvchilar
const elEditModal = new bootstrap.Modal('#edit-product-modal')

const elEditForm = document.querySelector('#edit-product-form');
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
    const editingId = +e.target.dataset.id;


    const TitleInputValue = elEditTitle.value.trim();
    const PriceValue = +elEditPrice.value.trim();
    const manufacturersValue = elEditManafacture.value;
    const definitionRAM = elEditBenefits.value;

    if (TitleInputValue && PriceValue > 0) {
        const editingItemIndex = products.findIndex((product) => product.id === editingId);


        const editProduct = {
                id: editingId,
                title: TitleInputValue,
                price: PriceValue,
                model: manufacturersValue,
                addedDate: new Date().toISOString(),
                benefits: definitionRAM
            }
            // console.log(editProduct.id);

        products.splice(editingItemIndex, 1, editProduct)

        renderProducts();
        elEditModal.hide();
    }

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
    const elements = e.target.elements;


    const searchValue = elements["filter-search"].value;
    const PriceFromValue = +elements['price-from'].value;
    const PriceToValue = +elements['price-to'].value;
    const manufacturerValue = elements['filter-manufacturer'].value;
    const sortByValue = elements['sortby'].value;

    // ? Filter Funksiyasini ishlash prinsipi
    // const compareFn = function(element) {
    //     return element.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    // }

    // const filteredProduct = filter(products, compareFn);

    // console.log(filteredProduct);
    // ? ----------------------------------------

    const filteredProduct = products.filter(element => {
            return element.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        }).filter(product => {
            const ProductPrice = product.price;
            return ProductPrice >= PriceFromValue
        }).filter(product => {
            const productPrice = product.price;
            return !PriceToValue ? true : productPrice <= PriceToValue;
        })
        .filter(product => {
            const manufactureFilter = product.model;
            return manufactureFilter === manufacturerValue;
        })
        .sort((a, b) => {
            // ? Switch case bn ishlash
            switch (sortByValue) {
                case "1":
                    if (a.title > b.title) {
                        return 1;
                    } else if (a.title === b.title) {
                        return 0
                    }
                    return -1
                case "2":
                    return b.price - a.price;
                case "3":
                    return a.price - b.price;
                case "4":
                    return (new Date(a.addedDate).getTime()) - (new Date(b.addedDate).getTime())
                default:
                    break;
            }
            return 0;


            // ? If else bn ishlash
            // if (sortByValue === "1") {
            //     if (a.title > b.title) {
            //         return 1;
            //     } else if (a.title === b.title) {
            //         return 0
            //     }
            //     return -1

            // } else if (sortByValue === "2") {
            //     return b.price - a.price;
            // } else if (sortByValue === "3") {
            //     return a.price - b.price;
            // } else if (sortByValue === "4") {
            //     return (new Date(a.addedDate).getTime()) - (new Date(b.addedDate).getTime())
            // }
        })

    renderProducts(filteredProduct);



    // ? Qoalbola usuli
    // const filteredProduct = [];

    // products.forEach((product) => {
    //     if (product.title.includes(searchValue)) {
    //         filteredProduct.push(product);
    //     }
    // })
    // ? ----------------------------------------
})