export class Tags {
  constructor() {
    this.ul = document.createElement('ul');
    this.ul.classList.add('vehicles-ul');

    // title
    const li = document.createElement('li');
    li.innerHTML = `Vehicle data at this marker:`;
    this.ul.appendChild(li);
    li.classList.add('m-btm-20');
    
    // dont show at start
    this.setVisibility(false);
  }

  setVisibility(toShow) {
    this.ul.style.display = toShow ? 'block' : 'none';
  }

  addLi(data) {
    const parentLi = document.createElement('li');
    const childUl = document.createElement('ul');
    childUl.classList.add('m-btm-20');

    // delete repeated info
    ['vehicle_id', 'lat', 'lng'].map(key => delete data[key]);

    for (let key in data) {
      const li = document.createElement('li');
      li.innerHTML = `${key}: ${data[key]}`
      childUl.appendChild(li);
    }

    parentLi.appendChild(childUl);
    this.ul.appendChild(parentLi);
  }
}