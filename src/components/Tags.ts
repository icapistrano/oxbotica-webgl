import { CarData } from "../ts/interfaces/data_interfaces";

export class Tags {
  public ul: HTMLUListElement;

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

  setVisibility(toShow: boolean) {
    this.ul.style.display = toShow ? 'block' : 'none';
  }

  addLi(data: CarData) {
    const parentLi = document.createElement('li');
    const childUl = document.createElement('ul');
    childUl.classList.add('m-btm-20');

    // delete repeated info
    ['vehicle_id', 'lat', 'lng'].map(key => delete data[key as keyof CarData]);

    for (let key in data) {
      const li = document.createElement('li');
      li.innerHTML = `${key}: ${data[key as keyof CarData]}`
      childUl.appendChild(li);
    }

    parentLi.appendChild(childUl);
    this.ul.appendChild(parentLi);
  }
}