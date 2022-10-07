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

function init() {
	Vue.component('goods_item', {
		props: [
			'item'
		],
		template: `
		<div class="goods-item">
			<h3>{{item.product_name}}</h3>
			<p>{{item.price}}</p>
		</div>
		`
	});

	Vue.component('search-area', {
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			value: String
		},
		template: `
        <input type="text" class="goods-search" :value="value" @input="$emit('input', $event.target.value)" />
        `
	})

	const CustomButton = Vue.component('custom_button', {
		template: `
		<button class="cart-button" type="button" v-on:click="$emit('click')">
			<slot></slot>
		</button>
		`
	});

	Vue.component('basket', {
		template: `
		<div class="basket-area">
			<div class="basket-card">
				<div class="basket-card__header">
					<h1 class="basket-card__header__title">Карточка товара</h1>
					<div class="basket-card__header__delete-icon" v-on:click="$emit('closeclick')">
					</div>
				</div>
				<div class="basket-card__content">
						Описание
				</div>
			</div>
		</div>
		`
	});

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
}
window.onload = init
