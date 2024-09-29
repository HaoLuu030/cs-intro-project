
const Name = document.querySelector('#restaurant-list');
const form = document.querySelector('#add-restaurant-form');

function renderStorePage(doc){
    let li = document.createElement('li');
    let Restaurant_Name = document.createElement('span');
    let Address = document.createElement('span');
    let Phone_Number = document.createElement('span');
    let Email = document.createElement('span');
    let Opening_Hours = document.createElement('span');
    let Cuisine_Type = document.createElement('span');
    let Dietary_Options = document.createElement('span');
    let Service_Type = document.createElement('span');
    let Comments = document.createElement('span');
    li.setAttribute('data-id', doc.id);
    Restaurant_Name.textContent = doc.data().Restaurant_Name;
    Address.textContent = doc.data().Address;
    Phone_Number.textContent = doc.data().Phone_Number;
    Email.textContent = doc.data().Email;
    Opening_Hours.textContent = doc.data().Opening_Hours;
    Cuisine_Type.textContent = doc.data().Cuisine_Type;
    Dietary_Options.textContent = doc.data().Dietary_Options;
    Service_Type.textContent = doc.data().Service_Type;
    Comments.textContent = doc.data().Comments;
    li.appendChild(Restaurant_Name);
    li.appendChild(Address);
    li.appendChild(Phone_Number);
    li.appendChild(Email);
    li.appendChild(Opening_Hours);
    li.appendChild(Cuisine_Type);
    li.appendChild(Dietary_Options);
    li.appendChild(Service_Type);   
    li.appendChild(Comments);
    Name.appendChild(li);
}
console.log(window.db);
window.db.collection('Food').get().then((querySnapshot) => {
	querySnapshot.forEach((doc)=>{
		console.log(doc.data());
	});
});
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    window.db.collection('Food').add({
        RestaurantName: form.Restaurant_Name.value,
        Address: form.Address.value,
        Phone_Number: form.Phone_Number.value,
        Email: form.Email.value,
        Opening_Hours: form.Opening_Hours.value,
        Cuisine_Type: form.Cuisine_Type.value,
        Dietary_Options: form.Dietary_options.value,
        Service_Type: form.Service_Type.value,
        Comments: form.Comments.value
    })
    form.Restaurant_Name.value = '';
    form.Address.value = '';
    form.Phone_Number.value = '';
    form.Email.value = '';
    form.Opening_Hours.value = '';
    form.Cuisine_Type.value = '';
    form.Dietary_Options.value = '';
    form.Service_Type.value = '';
    form.Comments.value = '';
})

