<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="false" bgColor="bg-gradual-blue text-white">
				<block slot="content">首页</block>
			</cu-custom>
		</view>
		
		<view class="cu-bar search bg-white" :style="[{marginTop:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @tap="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入垃圾名称" confirm-type="search"></input>
				<!-- <text class="cuIcon-voicefill"></text> -->
			</view>
			<!-- <view class=" info action ">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view> -->
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">加载中...</view>
		</view>
		<view class="tools">
			<button open-type="contact" class=" bg-cyan shadow-blur round" >留言</button>
			<button class=" bg-cyan shadow-blur round" @tap="showModal">二维码</button>
			<button open-type="share" class=" bg-cyan shadow-blur round" >分享</button>
		</view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog dialog">
				<view class="bg-img imgSize" style="height:200px;">
					<view class="cu-bar justify-end text-cyan">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="toSave">图片保存</view>
				</view>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav bg-white" scroll-y scroll-with-animation :scroll-top="verticalNavTop" :style="[{height:halfHeight}]">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain " scroll-y scroll-with-animation :style="[{height:halfHeight}]"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-bottom-sm padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="solid-bottom bg-white justify-center">
						<view class="action justify-center" v-show="index==0">
							<view class="article justify-center">
								<image class="flex img justify-center" src="../../static/dryGarbage.png"></image>、
							</view>
							
							
							<view class="article">
								<p class="aricle-title">
								   <view class="text-bold names">干垃圾</view>即其它垃圾，指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。
								</p>
							</view>
						</view>
						<view class="action justify-center" v-show="index==1">
							<view class="article justify-center">
								<image class="flex img justify-center" src="../../static/wetGarbage.png"></image>
							</view>
							
							
							<view class="article">
								<p class="aricle-title">
								   <view class="text-bold names">湿垃圾</view>又称为厨余垃圾，即易腐垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。
								</p>
							</view>
						</view>
						<view class="action justify-center" v-show="index==2">
							<view class="article justify-center">
								<image class="flex img justify-center" src="../../static/recyclable.png"></image>
							</view>
							
							
							<view class="article">
								<p class="aricle-title">
								   <view class="text-bold names">可回收物</view>就是可以再生循环的垃圾。本身或材质可再利用的纸类、硬纸板、玻璃、塑料、金属、塑料包装，与这些材质有关的如：报纸、杂志、广告单及其它干净的纸类等皆可回收。
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
						<view class="cu-item" v-for="(item2,index2) in data[index]" :key="index2" >
							<view class="content" >
								<image src="../../static/dryGarbage.png" v-if="item2.class=='干垃圾'" class="png" mode="aspectFit"></image>
								<image src="../../static/wetGarbage.png" v-if="item2.class=='湿垃圾'" class="png" mode="aspectFit"></image>
								<image src="../../static/recyclable.png" v-if="item2.class=='可回收物'" class="png" mode="aspectFit"></image>
								<image src="../../static/harmfulWaste.png" v-if="item2.class=='有害物'" class="png" mode="aspectFit"></image>
								<text class="text-grey">{{item2.name}}</text>
							</view>
						</view>
						<view class="cu-load bg-cyan" @click="showMore(index)" :class="moreIndex[index].isLoad"></view>
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
				CustomBar:this.CustomBar,
				windowHeight:this.windowHeight,
				modalName:'',
				list: [
					{
						name:'干垃圾',
						id:0,
					},
					{
						name:'湿垃圾',
						id:1,
					},
					{
						name:'可回收',
						id:2,
					},
					{
						name:'有害垃圾',
						id:3,
					}
				],
				moreIndex:[
					{
						index:1,
						isLoad:'start'//'loading':'over'
					},
					{
						index:1,
						isLoad:'start'//'loading':'over'
					},
					{
						index:1,
						isLoad:'start'//'loading':'over'
					},
					{
						index:1,
						isLoad:'start'//'loading':'over'
					},
				],
				loadModal:false,
				data:[[{"_id":"5d1cb7dfa3f4f70cb073c108","name":"纸巾","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c109","name":"牙签","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c10a","name":"拖把","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c10b","name":"抹布","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c10c","name":"一次性筷子","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c10d","name":"树枝","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c10e","name":"陶瓷类废弃物","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c10f","name":"清扫渣土","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c110","name":"陶瓷碗碟","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c111","name":"大块骨头","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c112","name":"植物硬壳","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c113","name":"枯萎花草","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c114","name":"塑料袋","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c115","name":"保鲜袋","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c116","name":"保鲜膜","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c117","name":"A4纸包装袋","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c118","name":"零食包装袋","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c119","name":"快递包装袋","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c11a","name":"热饮杯盖","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c11b","name":"咖啡杯杯盖","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c11c","name":"钮扣","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c11d","name":"干电池（无汞）","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c11e","name":"面膜","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c11f","name":"纸尿裤","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c120","name":"卫生巾","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c121","name":"卫生纸","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c122","name":"卫生巾外层薄塑纸","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c123","name":"湿纸巾","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c124","name":"旧浴缸","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c125","name":"盆子","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c126","name":"坏马桶","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c127","name":"旧水槽","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c128","name":"贝壳","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c129","name":"化妆刷","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c12a","name":"坛子","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c12b","name":"海绵","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c12c","name":"菜板","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c12d","name":"砖块","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c12e","name":"杯子","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c12f","name":"瓦片","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c130","name":"西梅核","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c131","name":"坏的花盆","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c132","name":"扫把","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c133","name":"脏污衣服","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c134","name":"烟蒂","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c135","name":"湿垃圾袋","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c136","name":"创口贴","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c137","name":"水彩笔","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c138","name":"过期化妆品","class":"干垃圾"},{"_id":"5d1cb7dfa3f4f70cb073c139","name":"发胶","class":"干垃圾"}],[{"_id":"5d1cb7dfa3f4f70cb073be06","name":"剩菜剩饭","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be07","name":"食物残渣","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be08","name":"菜叶","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be09","name":"肉类","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be0a","name":"鱼虾","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be0b","name":"蛋壳","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be0c","name":"鱼骨头","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be0d","name":"肉骨头","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be0e","name":"果皮","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be0f","name":"鱼鳞","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be10","name":"树叶","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be11","name":"瓜子壳","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be12","name":"花生壳","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be13","name":"茶渣","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be14","name":"葱","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be15","name":"饼干","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be16","name":"番茄酱","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be17","name":"土豆","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be18","name":"甘蔗","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be19","name":"藜麦","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be1a","name":"鸡骨头","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be1b","name":"鸭骨头","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be1c","name":"鹅骨头","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be1d","name":"虾","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be1e","name":"蛋糕","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be1f","name":"面包","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be20","name":"草莓叶","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be21","name":"番茄","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be22","name":"梨","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be23","name":"米饭","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be24","name":"辣椒","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be25","name":"粥","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be26","name":"豌豆皮","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be27","name":"苹果核","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be28","name":"韩国泡菜","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be29","name":"普洱茶","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be2a","name":"茄子","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be2b","name":"残枝落叶","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be2c","name":"草莓","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be2d","name":"豆沙包","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be2e","name":"植物枝干","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be2f","name":"杂菜","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be30","name":"动物尸体","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be31","name":"牲畜粪便","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be32","name":"橘子皮","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be33","name":"香蕉皮","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be34","name":"苹果皮","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be35","name":"西瓜皮","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be36","name":"芒果皮","class":"湿垃圾"},{"_id":"5d1cb7dfa3f4f70cb073be37","name":"葡萄皮","class":"湿垃圾"}],[{"_id":"5d1cb7dfa3f4f70cb073c531","name":"电脑","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c532","name":"打印机","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c533","name":"复印机","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c534","name":"传真机","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c535","name":"扫描仪","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c536","name":"投影仪","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c537","name":"电视机","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c538","name":"空调机","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c539","name":"报纸","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c53a","name":"复印纸","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c53b","name":"宣传单","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c53c","name":"包装纸","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c53d","name":"信封","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c53e","name":"硬纸板","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c53f","name":"纸板箱","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c540","name":"包装盒","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c541","name":"点心盒","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c542","name":"纸巾盒","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c543","name":"牛奶盒","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c544","name":"饮料利乐包装","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c545","name":"PET塑料瓶","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c546","name":"矿泉水瓶","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c547","name":"饮料瓶","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c548","name":"硬质塑料瓶","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c549","name":"塑料盒","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c54a","name":"冰淇淋盒","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c54b","name":"塑料杯","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c54c","name":"酸奶杯","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c54d","name":"果冻杯","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c54e","name":"软桶","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c54f","name":"塑料泡沫","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c550","name":"气泡缓冲材料","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c551","name":"水果网套","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c552","name":"废弃塑料文具","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c553","name":"玻璃瓶","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c554","name":"白炽灯","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c555","name":"碎玻璃片","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c556","name":"其他玻璃制品","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c557","name":"金属罐","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c558","name":"易拉罐","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c559","name":"金属盒","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c55a","name":"其他金属制品","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c55b","name":"金属文件柜","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c55c","name":"沙发","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c55d","name":"茶几","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c55e","name":"办公桌","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c55f","name":"文件柜","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c560","name":"椅子","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c561","name":"皮带","class":"可回收物"},{"_id":"5d1cb7dfa3f4f70cb073c562","name":"纸","class":"可回收物"}],[{"_id":"5d1cb7dfa3f4f70cb073c889","name":"废弃药瓶","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c88a","name":"充电电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c88b","name":"手机电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c88c","name":"废荧光灯管","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c88d","name":"废节能灯","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c88e","name":"废水银温度计","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c88f","name":"废水银血压计","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c890","name":"过期药品","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c891","name":"废油漆","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c892","name":"废农药","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c893","name":"杀虫剂","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c894","name":"节能灯（含水银）","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c895","name":"LED 灯（含水银）","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c896","name":"油漆桶","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c897","name":"镍镉电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c898","name":"酒精","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c899","name":"调色板","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c89a","name":"过期的胶囊药物","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c89b","name":"过期药片","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c89c","name":"蓄电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c89d","name":"医用棉签","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c89e","name":"医用手套","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c89f","name":"农药瓶","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a0","name":"医用纱布","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a1","name":"口服液瓶","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a2","name":"废弃灯泡","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a3","name":"灯泡","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a4","name":"油漆笔","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a5","name":"锂电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a6","name":"生石灰","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a7","name":"胶卷底片","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a8","name":"废矿物油","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8a9","name":"消毒剂","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8aa","name":"胶片","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8ab","name":"废血压计","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8ac","name":"废镍镉电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8ad","name":"氧化汞电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8ae","name":"工业胶水","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8af","name":"胶合剂","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b0","name":"树脂","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b1","name":"染发剂","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b2","name":"染发膏","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b3","name":"钮扣电池","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b4","name":"硒鼓","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b5","name":"照片","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b6","name":"指甲油瓶子","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b7","name":"雷达瓶子","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b8","name":"塑料药盒","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8b9","name":"过期指甲油","class":"有害物"},{"_id":"5d1cb7dfa3f4f70cb073c8ba","name":"卸甲膜","class":"有害物"}]],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		computed:{
			halfHeight(){
				return this.windowHeight-this.CustomBar-uni.upx2px(100)-uni.upx2px(100)-uni.upx2px(20) + 'px'
			}
		},
		onLoad() {
			
		},
		onShow() {
			console.log('---------')
			
			// wx.cloud.callFunction({
			// 	name: 'search',
			// 	data: {
			// 	},
			// 	success: res => {
			// 		console.log(res)
			// 		wx.showToast({
			// 			title: '调用成功'
			// 		});
			// 		this.setData({
			// 			result: JSON.stringify(res.result)
			// 		});
			// 	},
			// 	fail: err => {
			// 		wx.showToast({
			// 			icon: 'none',
			// 			title: '调用失败'
			// 		});
			// 		console.error('[云函数] [sum] 调用失败：', err);
			// 	}
			// });
			this.loadExecution()
		},
		onShareAppMessage(res) {
			return {
				title: '垃圾分类',
				path: '../component/home',
			}
		},
		methods: {
			loadExecution: function(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
				    const value = uni.getStorageSync('launchFlag');
				    if (value) {
				        if (value == true) {
				            
				        } else {
				            uni.redirectTo({
				                url: '../guide/home'
				            });
				        }
				    } else {
				        uni.setStorage({
				            key: 'launchFlag',
				            data: true,
				            success: function() {
								console.log('存储launchFlag');
							}
				        });
				        uni.redirectTo({
				            url: '/pages/guide/home'
				        });
				    }
				} catch(e) { 
					// error 
					uni.setStorage({ 
						key: 'launchFlag', 
						data: true, 
						success: function () {
							console.log('error时存储launchFlag');
						} 
					}); 
					uni.redirectTo({ url: '/pages/guide/home' }); 
				}
				return;
			},
			hideModal(){
				this.modalName='';
			},
			toSave() {
				this.modalName='';
				uni.showModal({
					title: '图片保存',
					content: '确定要保存图片吗',
					success: e => {
						if (e['confirm']) {
							this.save();
						}
					}
				});
			},
			save() {
				uni.getImageInfo({
					src: '../../static/gh_121bba52d857_430.jpg',
					success: function(image) {
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								console.log('save success');
								uni.showToast({
									title: '图片保存成功',
									icon: 'none',
									duration: 2200
								});
							}
						});
					}
				});
			},
			showModal(){
				this.modalName='Image';
			},
			showMore(id){
				let _this=this;
				let ary=[..._this.moreIndex];
				ary[id].isLoad='loading';
				this.moreIndex=ary;
				
				uni.request({
					url: 'https://www.waterbearking.com/tencent/getLajiList',
					data: {id,page:ary[id].index},
					success: details => {
						if (details.statusCode == 200) {
							let data=[...this.data];
							data[id]=data[id].concat(details.data);
							_this.data=data;
							let ary2=[...ary]
							ary2[id]={
								index:++ary[id].index,
								isLoad:'start'
							}
							_this.moreIndex=ary2;
							_this.load=true;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			TabSelect(e) {
				let id=e.currentTarget.dataset.id;
				let _this=this;
				this.tabCur = id;
				this.mainCur = id;
				this.verticalNavTop = (id - 1) * 50;
				if(!this.data[id]){
					
					this.loadModal=true;
					uni.request({
						url: 'https://www.waterbearking.com/tencent/getLajiList',
						data: {id},
						success: details => {
							if (details.statusCode == 200) {
								let data=[...this.data];
								data[id]=details.data[0];
								_this.data=data;
								console.log(data)
								_this.loadModal=false;
							}
						},
						fail: (data, code) => {
							console.log('fail' + JSON.stringify(data));
						}
					});
				}
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
				let scrollTop = e.detail.scrollTop;
				console.log('scrollTop:'+scrollTop)
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id

						return false
					}
				}
				
			},
			InputFocus(e){
				console.log(e)
				// var focus=document.querySelector(':focus');
				// 
				// focus&&focus.blur();  
				uni.navigateTo({
					url: '../search/home?type='+'shanghai',
				});
				
				
			},
			InputBlur(e){
			},
		
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
	.cu-modal .dialog{
		width: 580rpx;
	}
	.cu-dialog .imgSize{
		background-size: contain;
		background-image: url('https://www.waterbearking.com/h5/static/img/gh_121bba52d857_430.jpg');
		background-color: #fff;
	}
	.round::after{
		border: 0;
	}
	.tools{
		position: fixed;
		right: 30rpx;
		top: 60%;
		z-index: 99;
	}
	.tools .round{
		/* padding: 0; */
		font-size: 24upx;
		padding: 0 24upx;
		margin: 10upx 0 0 0;
		
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
