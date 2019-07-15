<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="false" bgColor="bg-gradual-blue text-white">
				<block slot="content">首页</block>
			</cu-custom>
		</view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入垃圾名称" confirm-type="search"></input>
			</view>
			<view class=" info action ">
				<button class="cu-btn bg-green shadow-blur round" @click="goCamera">
					<image mode="widthFix" class="photos-box" src="../../static/carame.png"></image>
				</button>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav bg-white" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 156px)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain " scroll-y scroll-with-animation style="height:calc(100vh - 156px)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-bottom-sm padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="solid-bottom bg-white justify-center">
						<view class="action justify-center" v-show="index==0">
							<view class="article justify-center">
								<image src="../../static/404.png"></image>
								<image class="flex img justify-center" src="../../static/其它垃圾-middle.png"></image>
							</view>
							
							
							<view class="article">
								<p class="aricle-title">
								   <view class="text-bold names">其它垃圾</view>指除可回收物、有害垃圾、厨余垃圾以外的其它生活废弃物。
								</p>
							</view>
						</view>
						<view class="action justify-center" v-show="index==1">
							<view class="article justify-center">
								<image class="flex img justify-center" src="../../static/厨余垃圾-middle.png"></image>
							</view>
							
							
							<view class="article">
								<p class="aricle-title">
								   <view class="text-bold names">厨余垃圾</view>是指家庭中产生的菜帮菜叶、瓜果皮核、剩菜剩饭、废弃食物等易腐性垃圾。
								</p>
							</view>
						</view>
						<view class="action justify-center" v-show="index==2">
							<view class="article justify-center">
								<image class="flex img justify-center" src="../../static/recyclable.png"></image>
							</view>
							
							
							<view class="article">
								<p class="aricle-title">
								   <view class="text-bold names">可回收物</view>是指在日常生活中或者为日常生活提供服务的活动中产生的，已经失去原有全部或者部分使用价值，回收后经过再加工可以成为生产原料或者经过整理可以再利用的物品，主要包括废纸类、塑料类、玻璃类、金属类、电子废弃物类、织物类等。
								</p>
							</view>
						</view>
						<view class="action justify-center" v-show="index==3">
							<view class="article justify-center">
								<image class="flex img justify-center" src="../../static/harmfulWaste.png"></image>
							</view>
							
							
							<view class="article">
								<p class="aricle-title">
								   <view class="text-bold names">有害垃圾</view>指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。
								</p>
							</view>
						</view>
					</view>
					<view class="cu-list menu">
						<view class="cu-item" >
							<view class="content">
								<image src="/static/logo.png" class="png" mode="aspectFit"></image>
								<text class="text-grey">图片 + 标题</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name:'其它垃圾',
						id:0
					},
					{
						name:'厨余垃圾',
						id:1
					},
					{
						name:'可回收',
						id:2
					},
					{
						name:'有害垃圾',
						id:3
					}
				],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			console.log(12)
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			// let list = [{}];
			// for (let i = 0; i < 4; i++) {
			// 	list[i] = {};
			// 	list[i].name = String.fromCharCode(65 + i);
			// 	list[i].id = i;
			// }
			// this.list = list;
			// console.log(list)
			//this.listCur = list[0];
			uni.hideLoading()
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			goCamera(){
				uni.navigateTo({
					url: '../plugin/home?type='+'beijing',
				});
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop+10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
	button .photos-box{
		width: 15px;
		height: 15px;
	}
	.search{
		margin-top: 64px;
	}
	.VerticalBox{
		margin-top: 20upx;
	}
	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
		/* padding-top: 20upx; */
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		line-height: 50px;
		font-size: 30rpx;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		/* background-color: #f1f1f1; */
		    background-color: #1cbbb4;
			color: #fff;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8rpx;
		height: 100%;
		-webkit-border-radius: 0 10px 10rpx 0;
		border-radius: 0 10px 10rpx 0;
		position: absolute;
		background-color: currentColor;
		top: 0;
		left: 0px;
		bottom: 0;
		margin: auto;
		background: #fbbd08;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
	.VerticalBox .action{
		padding: 26upx;
		width: 100%;
		/* display: block; */
	}
	.img{
		width: 64px;
		height: 64px;
		text-align: center;
		
	}
	.article{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
  
		
	}
	.aricle-title{
		padding-top: 20rpx;
	}
	.article .names{
		display: inline-block;
		text-indent: 56rpx;
	}
</style>
