<template>
	<view class="content">
		<view class="fixed">
			<cu-custom :isBack="false" bgColor="bg-gradual-blue text-white"><block slot="content">引导页</block></cu-custom>
		</view>
		<swiper class="swiper" :style="[{ paddingTop: autoPadding }]" :autoplay="autoplay" :duration="duration">
			<swiper-item>
				<view class="swiper-item"><image src="../../static/98ac3de3-c53a-469a-8aad-f2424a85e4cc_0.jpg" mode="aspectFit"></image></view>
				<view class="experience" @tap="launchFlag()">{{ experience }}</view>
			</swiper-item>
			<!-- <swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<view>垃圾分类</view>
					</view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/title_03.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img"><image src="../../static/guide/icon_03.png" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/title_04.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img"><image src="../../static/guide/icon_04.png" mode="aspectFit"></image></view>
				</view>
				<view class="experience" @tap="launchFlag()">{{experience}}</view>
			</swiper-item> -->
		</swiper>
		<view class="uniapp-img"><image src="../../static/guide1.png" mode="aspectFit"></image></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			background: ['color1', 'color2', 'color3'],
			autoplay: false,
			duration: 500,
			jumpover: '跳过',
			experience: '立即体验',
			CustomBar: this.CustomBar,
			windowHeight: this.windowHeight
		};
	},
	computed: {
		autoPadding() {
			return this.CustomBar + 'px';
		}
	},
	methods: {
		launchFlag: function() {
			/**
			 * 向本地存储中设置launchFlag的值，即启动标识；
			 */
			console.log('name');
			uni.setStorage({
					key: 'launchFlag',
					data: true,
			});

			uni.navigateTo({
				url: '../index/index',
				success: function(e) {
					let page = getCurrentPages().pop();
					if (page == undefined || page == null) return;
					page.onLoad();
				},
				fail:function(e) {
					console.log(e);
				}
			});
		}
	}
};
</script>
<style>
page,
.content {
	width: 100%;
	height: 100%;
	background-size: 100% auto;
	padding: 0;
}
.swiper {
	width: 100%;
	height: 80%;
	background: #ffffff;
}
.swiper-item {
	width: 100%;
	height: 100%;
	padding-top: 20px;
	padding-bottom: 44px;
	text-align: center;
	position: relative;
	display: flex;
	/* justify-content: center; */
	align-items: flex-end;
	flex-direction: column-reverse;
}
.swiper-item-img {
	width: 100%;
	height: auto;
	margin: 0 auto;
}
.swiper-item-img image {
	width: 80%;
}
.uniapp-img {
	height: 20%;
	background: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}
.uniapp-img image {
	width: 80%;
}

.jump-over,
.experience {
	position: absolute;
	height: 60upx;
	line-height: 60upx;
	padding: 0 40upx;
	border-radius: 30upx;
	font-size: 32upx;
	color: #454343;
	border: 1px solid #454343;
	z-index: 999;
}
.jump-over {
	right: 20upx;
	top: 20upx;
}
.experience {
	right: 50%;
	margin-right: -105upx;
	bottom: 0;
}
</style>
