<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="false" bgColor="bg-gradual-blue text-white">
				<block slot="content">图像识别</block>
			</cu-custom>
		</view>
		<view class="camera flex solid-bottom padding justify-center" >
			<image class="flex solid-bottom padding justify-center" :mode="'aspectFit'" src="../../static/68d3ab2963402ebd07d1d0dbbdcdc942.jpg"></image>
			<!-- <camera device-position="back" flash="auto" @error="error" style="height:calc(100vh - 186px)" > -->
				<!-- <cover-image src="../../static/scan-frame/scan-img.png" class="scan-img"></cover-image> -->
			<!-- </camera>
			<view class="img-btn cuIcon" @click="takePhoto">
				<image mode="widthFix" class="photos-box" src="../../static/carame.png"></image>
			</view> -->
			<button class="bg-cyan shadow-blur round btns" @click="toCamera" :style="[{bottom:bottom}]">拍照识别</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ""
			}
		},
		computed:{
			bottom(){
				return uni.upx2px(100)+uni.upx2px(50)+'px'
			}
		},
		methods: {
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
						/* 返回调用页面并把图片URL传递过去 */
						/* let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2]; 
						prevPage.setData({
							"image": res.tempImagePath,
						})
						uni.navigateBack(); */
						
						/* 调用页面获取图片URL方法 */
						/* let pages = getCurrentPages();
						let currPage = pages[pages.length-1];
						if(typeof(currPage.data.image) != undefined && currPage.data.image != null){
							console.log('获取图片：', currPage.data.image)
						} */
					}
				});
			},
			toCamera(){
				uni.navigateTo({
					url: '../camera/home',
				});
			},
			error(e) {
				console.log(e.detail);
			}
		}
	}
</script>

<style>
	.camera{
		padding-top: 60px;
		height: 100vh;
		background: #fff;
	}
	.camera .flex{
		width: 80%;
		height: 90%;
	}
	.camera  .solid-bottom::after {
		border: 0;
	}
	.btns{
		position: fixed;
		left: 50%;
		margin-left: -68upx;
		font-size: 28upx;
		
	}
	.scan-img{
		opacity: 0.4;
		width: 100%;
		height:500upx;
	}
	.img-btn{
		width: 64px;
		height: 64px;
		padding: 30upx;
		border-radius: 50%;
		background:#1CBBB4;
		position: absolute;
		left: 50%;
		margin-left: -32px;
		bottom: 54px;
	}
</style>
