<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-gradual-blue text-white"><block slot="content">图像识别</block></cu-custom>
		</view>
		<view class="camera ">
			<camera device-position="back" v-if="src.length == 0" flash="auto" @error="error" :style="[{ height: halfHeight }]">
				<cover-view class="buttons" :style="[{width:height},{height:height}]" @click="takePhoto"><cover-image mode="widthFix" class="photos-box" src="../../static/carame.png"></cover-image></cover-view>
			</camera>
			<view v-else :style="[{ height: halfHeight }]">
				<view>
					
				</view>
				<image :src="src" class="drawImage"></image>
				<!-- <canvas style="width: 100%; height: 100%;" canvas-id="firstCanvas"></canvas> -->
				<view class="buttons" :style="[{width:'50px'},{height:'50px'}]" @click="takePhoto2"><image mode="widthFix" class="photos-box" src="../../static/carame.png"></image></view>
			</view>
			<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" >
				<view class="cu-dialog" @tap.stop="">
					<!-- <radio-group class="block" @change="RadioChangeType">
						<view class="cu-list menu text-left flex flexx">
							<view class="cu-item flex-sub" v-for="(item,index) in detailsType" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{item.keyword}}</view>
									<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio2=='radio' + index?true:false"
									 :value="item.keyword"></radio>
								</label>
							</view>
						</view>
					</radio-group> -->
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in details" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{item.keyword}}</view>
									<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
									 :value="item.keyword"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			radio:'',
			src: '',
			modalName:'',
			radio2:"radio0",
			defaultValue:"shanghai",
			details:[],
			detailsType:[
				{
					keyword:'上海分类',
					value:'shanghai'
				},
				{
					keyword:'北京分类',
					value:'beijing'
				},
				
			],
			CustomBar: this.CustomBar,
			windowHeight: this.windowHeight
		};
	},
	computed: {
		bottom() {
			return uni.upx2px(100) + uni.upx2px(30) + 'px';
		},
		halfHeight() {
			return '100%';
		},
		height(){
			return uni.upx2px(100)+'px'
		}
	},
	methods: {
		RadioChangeType(e){
			this.defaultValue = e.detail.value;
		},
		RadioChange(e) {
			this.radio = e.detail.value;
			this.modalName=null;
			uni.navigateTo({
				url: '../search/home?type='+this.defaultValue+'&value='+this.radio,
			});
		},
		takePhoto() {
			let _this = this;
			const ctx = uni.createCameraContext();
			ctx.takePhoto({
				quality: 'normal',
				success: res => {
					_this.src = res.tempImagePath;
					// console.log(res.tempImagePath)
					// #ifdef MP-WEIXIN
					wx.getFileSystemManager().readFile({
						filePath: res.tempImagePath,
						encoding: 'base64',
						success: res => {
							uni.request({
								url: 'https://www.waterbearking.com/tencent/picAi',
								data: { url: res.data },
								method: 'POST',
								success: details => {
									if (details.statusCode == 200) {
										console.log(details);
										_this.details=details.data.result;
										_this.modalName='RadioModal';
									}
								},
								fail: (data, code) => {
									console.log('fail' + JSON.stringify(data));
								}
							});
						},
						fail: res => {
							wx.hideLoading();
							wx.showToast({
								title: '拍照失败,未获取相机权限或其他原因',
								icon: 'none'
							});
						}
					});
					// #endif

					// uni.getImageInfo({
					// 	src: res.tempImagePath,
					// 	success: function(image) {
					// 		console.log(image.path);
					// 		_this.src = image.path;
					// 		var context = uni.createCanvasContext('firstCanvas',_this);
					// 		//context.clearRect(0,0,context._context.canvas.width,context._context.canvas.height);
					// 		context.drawImage(image.path, 11, 10, 150, 150);
					// 		context.draw(true, function() {
					//
					// 			uni.canvasToTempFilePath({
					// 				canvasId: 'firstCanvas',
					// 				success: function(res) {
					// 					console.log(_this)
					// 					console.log(context)
					// 					//let aaa=uni.createCanvasContext('firstCanvas');
					// 					//console.log(aaa);
					//
					// 					var url = context.toDataURL('image/jpeg', 0.7);
					// 					_this.src = url;
					//
					// 					uni.request({
					// 						url: 'https://www.waterbearking.com/tencent/picAi',
					// 						data: { url },
					// 						method: 'POST',
					// 						success: details => {
					// 							if (details.statusCode == 200) {
					// 								console.log(details);
					// 								//this.stringList=details.data;
					// 							}
					// 						},
					// 						fail: (data, code) => {
					// 							console.log('fail' + JSON.stringify(data));
					// 						}
					// 					});
					// 				}
					// 			},_this);
					// 		});
					// context.draw()
					// 							console.log(context);

					// 	}
					// });
				}
			});
		},
		takePhoto2(){
			this.src='';
		},
		toCamera() {
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
				}
			});
		},
		error(e) {
			console.log(e.detail);
		}
	}
};
</script>

<style>

.camera {
	padding-top: 60px;
	height: 100vh;
	background: #fff;
}
.camera .flexx{
	display: flex;
	width: 100%;
}
.drawImage {
	width: 100%;
	height: 100%;
}
.btns {
	position: fixed;
	left: 50%;
	margin-left: -68upx;
	font-size: 24upx;
}
.scan-img {
	opacity: 0.4;
	width: 100%;
	height: 500upx;
}
.buttons{
	/* padding: 30upx; */
	border-radius: 50%;
	/* background: #1cbbb4; */
	position: absolute;
	left: 50%;
	margin-left: -25px;
	bottom: 20px;
	z-index: 10000;
}
.img-btn {
	padding: 30upx;
	border-radius: 50%;
	/* background: #1cbbb4; */
	position: absolute;
	left: 50%;
	margin-left: -32px;
	bottom: 20px;
	z-index: 10000;
}
</style>
