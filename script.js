"use strict"

const goods = [
	{ title: 'Shirt', price: 150 },
	{ title: 'Socks', price: 50 },
	{ title: 'Jacket', price: 350 },
	{ title: 'Shoes', price: 250 },
];

class GoodsItem {
	constructor({ title, price }) {
		this.title = title;
		this.price = price;
	}
	render() {
		return `
		<div class="goods-item">
		<h3>${this.title}</h3>
		<p>${this.price}</p>
	</div>`;
	}
}
class GoodsList {
	item = [];
	fetchGoods() {
		this.item = goods;
	}
	calculateAllPrice() {
		return this.items.redice((prev, item) => {
			return prev + item.price;
		}, prev)
	}
	render() {
		const goods = this.item.map(item => {
			const goodItem = new GoodsItem(item);
			return goodItem.render()
		}).join('');

		document.querySelector('.goods-list').innerHTML = goods;
	}
}

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
goodsList.calculateAllPrice();