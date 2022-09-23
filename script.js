"use strict"

const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses"
const GOODS = "/catalogData.json"

const url = `${URL}${GOODS}`;

function service(url) {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = () => {
			const result = JSON.parse(xhr.response)
			resolve(result)
		};
		xhr.send();
	})
}

const goods = [
	{ product_name: 'Shirt', price: 150 },
	{ product_name: 'Socks', price: 50 },
	{ product_name: 'Jacket', price: 350 },
	{ product_name: 'Shoes', price: 250 },
];

class GoodsItem {
	constructor({ product_name, price }) {
		this.product_name = product_name;
		this.price = price;
	}
	render() {
		return `
		<div class="goods-item">
		<h3>${this.product_name}</h3>
		<p>${this.price}</p>
	</div>`;
	}
}
class GoodsList {
	items = [];
	fetchGoods() {
		return new Promise((resolve) => {
			service(url).then((data) => {
				this.items = data;
				resolve()
			})
		})
	};

	calculateAllPrice() {
		return this.items.reduce((prev, item) => {
			return prev + item.price;
		}, 0)
	}
	render() {
		const goods = this.items.map(item => {
			const goodItem = new GoodsItem(item);
			return goodItem.render()
		}).join('');

		document.querySelector('.goods-list').innerHTML = goods;
	}
}

const goodsList = new GoodsList();
goodsList.fetchGoods().then(() => {
	goodsList.render();
});
goodsList.calculateAllPrice();
