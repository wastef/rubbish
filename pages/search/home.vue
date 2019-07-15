<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-gradual-blue text-white">
				<block slot="content">查询</block>
			</cu-custom>
		</view>
		<view class="cu-bar search bg-white" :style="[{marginTop:CustomBar + 'px'}]" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @tap="InputFocus"  @input="onInput" v-model="searchName"  :adjust-position="false" focus type="text" placeholder="输入垃圾名称" confirm-type="search"></input>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog dialog">
				<image :src="curImg" class="curImg"></image>
			</view>
		</view>
		<view class="cu-list menu "  >
			<view class="cu-item" v-for="(item2,index2) in stringList" :key="index2" @tap="showClass(item2)">
				<view class="content" >
					<image src="../../static/dryGarbage.png" v-if="item2.class=='干垃圾'" class="png" mode="aspectFit"></image>
					<image src="../../static/wetGarbage.png" v-if="item2.class=='湿垃圾'" class="png" mode="aspectFit"></image>
					<image src="../../static/recyclable.png" v-if="item2.class=='可回收物'" class="png" mode="aspectFit"></image>
					<image src="../../static/harmfulWaste.png" v-if="item2.class=='有害物'" class="png" mode="aspectFit"></image>
					<text class="text-grey">{{item2.name}}</text>
				</view>
			</view>
			<view v-if="stringList.length==0&&searchType">
				<view class="article justify-center">
					<image class="flex img justify-center" src="../../static/404.png"></image>
				</view>
				
				<p class="aricle-title">
				   <view class="text-bold names">没有匹配到合适的结果</view>
				</p>
				<p class="aricle-title colors" @tap="submit" v-if="feed">
					点击这里把"{{searchName}}"反馈给我们吧
				</p>
				<p class="aricle-title colors" v-else>
					感谢您的反馈
				</p>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
			CustomBar: this.CustomBar,
			windowHeight: this.windowHeight,
			title: '',
			feed:true,
			type:"",
			searchType:false,
			searchName:"",
			stringList: [],
			modalName:'',
			curImg:''
		};
	},
	computed: {
		halfHeight() {
			return this.windowHeight - this.CustomBar - uni.upx2px(100) - uni.upx2px(100) - uni.upx2px(20) + 'px';
		}
	},
	onLoad: function (options) {
		this.type= options.type;
		let keyword=options.value;
		this.searchName=keyword;
		this.onInput({
			detail:{
				value:keyword
			}
		})
    },
	methods: {
		showClass(options){
			let category={
				'干垃圾':'../../static/dryGarbage.png',
				'湿垃圾':'../../static/wetGarbage.png',
				'可回收物':'../../static/recyclable.png',
				'有害物':'../../static/harmfulWaste.png'
			}
			this.curImg=category[options.class];
			this.modalName='Image';
			setTimeout(()=>{
				this.modalName='';
			},1500)
		},
		submit(){
			let _this=this;
			let keyword=this.searchName;
			console.log(keyword)
			uni.request({
				url: 'https://www.waterbearking.com/tencent/feedback',
				data: {keyword},
				success: details => {
					if (details.statusCode == 200) {
						_this.feed=false;
					}
				},
				fail: (data, code) => {
					console.log('fail' + JSON.stringify(data));
				}
			});
		},
		onInput(event) {
			var keyword = event.detail.value;
			this.searchType=false;
			this.feed=true;
			if(keyword&&keyword.length>0){
				uni.request({
					url: 'https://www.waterbearking.com/tencent/search',
					data: {keyword},
					success: details => {
						if (details.statusCode == 200) {
							this.stringList=details.data;
							if(details.data.length==0){
								this.searchType=true;
							}
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			}else{
				this.stringList=[];
				
			}
			
		},
		//HM修改 触发组件confirm事件
		triggerConfirm() {
			this.$emit('confirm', false);
		},
		//HM修改 触发组件input事件
		inputChange(event) {
			var keyword = event.detail.value;
			console.log(keyword)
			this.$emit('input', keyword);
			if (this.inputVal) {
				this.isDelShow = true;
			}
		},
		focus() {
			this.active = true;
			//HM修改 增加获取焦点判断
			if (this.inputVal) {
				this.isDelShow = true;
			}
		},
		blur() {
			this.isFocus = false;
			if (!this.inputVal) {
				this.active = false;
			}
		},
		clear() {
			//HM修改 收起键盘
			uni.hideKeyboard();
			this.isFocus = false;
			this.inputVal = '';
			this.active = false;
			//HM修改 清空内容时候触发组件input
			this.$emit('input', '');
			//this.$emit('search', '');//HM修改 清空内容时候不进行搜索
		},
		getFocus() {
			this.isFocus = true;
		},
		search() {
			//HM修改 增加点击取消时候退出输入状态，内容为空时，输入默认关键字
			if (!this.inputVal) {
				if (!this.show && this.searchName == '取消') {
					uni.hideKeyboard();
					this.isFocus = false;
					this.active = false;
					return;
				}
			}
			console.log(this.inputVal);
			this.$emit('search', this.inputVal ? this.inputVal : this.placeholder);
		}
	}
};
</script>

<style lang="scss">
.serach {
	display: flex;
	width: 100%;
	//border-bottom: 1px #f5f5f5 solid; //HM修改 去掉边框
	box-sizing: border-box;
	font-size: $uni-font-size-base;
	.content {
		display: flex;
		align-items: center;
		width: 100%;
		height: 60upx;
		//border: 1px #ccc solid; //HM修改 去掉边框
		background: #fff;
		overflow: hidden;
		transition: all 0.2s linear;
		border-radius: 30px;

		.content-box {
			width: 100%;
			display: flex;
			align-items: center;
			&.center {
				justify-content: center;
			}
			.icon {
				padding: 0 15upx;
				&.icon-del {
					font-size: 38upx;
					&:before {
						content: '\e644';
					}
				}
				&.icon-serach:before {
					content: '\e61c';
				}
			}
			.input {
				width: 100%;
				max-width: 100%;
				line-height: 60upx;
				height: 60upx;
				transition: all 0.2s linear;
				&.center {
					width: 200upx;
				}
				&.sub {
					// position: absolute;
					width: auto;
					color: grey;
				}
			}
		}
		.serachBtn {
			height: 100%;
			flex-shrink: 0;
			padding: 0 30upx;
			//HM修改 按钮背景色
			background: linear-gradient(to right, #ff9801, #ff570a);
			//background: $uni-color-success;
			line-height: 60upx;
			color: #fff;
			//border-left: 1px #ccc solid; //HM修改 去掉边框
			transition: all 0.3s;
		}
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-shrink: 0;
		width: 0;
		transition: all 0.2s linear;
		white-space: nowrap;
		overflow: hidden;
		&.active {
			padding-left: 15upx;
			width: 100upx;
		}
	}
}
//HM修改 把字体改成本地加载
@font-face {
	font-family: 'iconfont';
	src: url('data:application/x-font-woff;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzI8fEg3AAABfAAAAFZjbWFws6gbWQAAAeQAAAGcZ2x5ZqgAaogAAAOMAAABMGhlYWQTyEk0AAAA4AAAADZoaGVhB90DhQAAALwAAAAkaG10eBAA//8AAAHUAAAAEGxvY2EA0gBOAAADgAAAAAptYXhwARIANgAAARgAAAAgbmFtZT5U/n0AAAS8AAACbXBvc3SanfjSAAAHLAAAAEUAAQAAA4D/gABcBAD//wAABAAAAQAAAAAAAAAAAAAAAAAAAAQAAQAAAAEAAL8Cm/NfDzz1AAsEAAAAAADYVQKbAAAAANhVApv///+ABAADgQAAAAgAAgAAAAAAAAABAAAABAAqAAQAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQQAAZAABQAIAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5gbmRAOA/4AAXAOBAIAAAAABAAAAAAAABAAAAAQA//8EAAAABAAAAAAAAAUAAAADAAAALAAAAAQAAAFoAAEAAAAAAGIAAwABAAAALAADAAoAAAFoAAQANgAAAAgACAACAADmBuYc5kT//wAA5gbmHOZE//8AAAAAAAAAAQAIAAgACAAAAAIAAQADAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAA0AAAAAAAAAAMAAOYGAADmBgAAAAIAAOYcAADmHAAAAAEAAOZEAADmRAAAAAMAAAAAADoATgCYAAAAAv///4AEAAOAABMAHwAABQYiLwEGJCcmAjc2JBcWEgcXFhQBJiAHBhQXFiA3NjQD7RQyFMaG/sl9hw2BiQFqjXgTZccT/sBo/spoPz9oATZoPm0TE8dhDG6FAW2OhwaGfv6+h8YUMgLThoZV0FWGhlnMAAABAAD/gAMAA4EABQAACQE1CQE1AQACAP6IAXgBgP4AiAF4AXiIAAAABAAA//4DlAMnABAAIQAlACkAAAUuAzQ+AjIWFxYQBw4BAyIOAhQeAjI2NzYQJy4BFwEnAQU3AQcCAFKScz09c5Kkkjp2djqSUkiBZjU1ZoGQgTNoaDOBfP6YIAFo/qQgAVwgAgE9cpOjknM9PTl8/r18OT0C9zVmgZCBZTU1Mm4BHW0zNb/+mCABZysf/qQgAAAAAAAAEgDeAAEAAAAAAAAAFQAAAAEAAAAAAAEACAAVAAEAAAAAAAIABwAdAAEAAAAAAAMACAAkAAEAAAAAAAQACAAsAAEAAAAAAAUACwA0AAEAAAAAAAYACAA/AAEAAAAAAAoAKwBHAAEAAAAAAAsAEwByAAMAAQQJAAAAKgCFAAMAAQQJAAEAEACvAAMAAQQJAAIADgC/AAMAAQQJAAMAEADNAAMAAQQJAAQAEADdAAMAAQQJAAUAFgDtAAMAAQQJAAYAEAEDAAMAAQQJAAoAVgETAAMAAQQJAAsAJgFpCkNyZWF0ZWQgYnkgaWNvbmZvbnQKaWNvbmZvbnRSZWd1bGFyaWNvbmZvbnRpY29uZm9udFZlcnNpb24gMS4waWNvbmZvbnRHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQAKAEMAcgBlAGEAdABlAGQAIABiAHkAIABpAGMAbwBuAGYAbwBuAHQACgBpAGMAbwBuAGYAbwBuAHQAUgBlAGcAdQBsAGEAcgBpAGMAbwBuAGYAbwBuAHQAaQBjAG8AbgBmAG8AbgB0AFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBuAGYAbwBuAHQARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAECAQMBBAEFAAZzb3VzdW8IamlhbnRvdTQHc2hhbmNodQAAAAAA');
}
.cu-modal .dialog{
	width: 360upx;
	height: 360upx;
	background: rgba(0,0,0,0);
}
.curImg{
	width: 100%;
	height: 100%;
}
.icon {
	font-family: iconfont;
	font-size: 32upx;
	font-style: normal;
	color: #999;
}
.article{
	margin-top: 20upx;
		width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  
		
	}
	.aricle-title{
		padding-top: 20rpx;
		text-align: center;
		width: 100%;
	}
	.article .names{
		display: inline-block;
		text-indent: 56rpx;
	}
	.colors{
		color: #1cbbb4;
	}
</style>
