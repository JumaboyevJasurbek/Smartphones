let elTelTemplate = document.querySelector('#tel-template');
let elTelWrapper = document.querySelector('.tel-wrapper')


const addZero = num => {
    return num < 10 ? "0" + num : num;
}


const createTelBox = product => {
    const elTelBox = elTelTemplate.cloneNode(true).content;

    const elTelTitle = elTelBox.querySelector('.card-title');
    elTelTitle.textContent = product.title;

    const elTelPrice = elTelBox.querySelector('.card-price');
    elTelPrice.textContent = product.price;

    const elTelCompany = elTelBox.querySelector('.company-name');
    elTelCompany.textContent = product.model;

    const elTelDate = elTelBox.querySelector('.card-data');
    const telData = new Date(product.addedDate);
    elTelDate.textContent = `${addZero(telData.getDate())}.${addZero(telData.getMonth()+1)}.${telData.getFullYear()} ${addZero(telData.getHours())}:${addZero(telData.getMinutes())}`

    const elTelConditionRam = elTelBox.querySelector('.tel-condition-ram')
    elTelConditionRam.textContent = product.benefits[0];


    const elTelConditionMemory = elTelBox.querySelector('.tel-condition-memory')
    elTelConditionMemory.textContent = product.benefits[1];

    const elTelConditionWaterproof = elTelBox.querySelector('.tel-condition-waterproof')
    elTelConditionWaterproof.textContent = product.benefits[2];

    const elTelConditionGoodSide = elTelBox.querySelector('.tel-good-side')
    elTelConditionGoodSide.textContent = product.benefits[3];

    return elTelBox;
}


products.forEach((product1) => {
    const elTelBox = createTelBox(product1);
    elTelWrapper.appendChild(elTelBox);
});