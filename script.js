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

const app = new Vue({
	el: '#root',
	data: {
		goods: [],
		search: '',
		isVisibleCart: false
	},
	mounted() {
		service(url).then((data) => {
			this.goods = data;
		});
	},
	computed: {
		calculateAllPrice() {
			return this.goods.reduce((prev, goods) => {
				return prev + goods.price;
			}, 0)
		},
		filterGoods() {
			return this.goods.filter((item) => {
				const regExp = new RegExp(this.search);
				return regExp.test(item.product_name)
			})
		},
	},
	methods: {
		setVisibleCard() {
			this.isVisibleCart = !this.isVisibleCart;
		}
	},

})

