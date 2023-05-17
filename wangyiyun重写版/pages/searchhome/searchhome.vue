<template>
	<view class="searchhome">
		<view class="clearmask" v-if="showbox" @click="showdown">
			
		</view>
		<view class="clearbox" v-show="showbox">
			<view class="cleartext">
				确认清空全部历史记录?
				<view class="clearbtn">
					<view class="btnleft" @click="removeall">确认</view>
					<view class="btnright" @click="backbox">取消</view>
				</view>
			</view>
		</view>
		<view class="texthots" :style="`top: ${he}`">
			
			
			<!-- 点击提示搜索的音乐 -->
			<view class="hotsbox">
				
				<view class="hotlist" v-for="(item, i) in hotlist" :key="i" @click="getgoindex(item.keyword)">
					<view class="keicon" >
						<image src="../../static/icon/3.1-搜索.png" mode="aspectFit"></image>
					</view>
					<text class="t10" ><text style="color: rgba(255,255,255,.3);margin-right: 6rpx;">{{item.keyword.slice(0,num)}}</text>{{item.keyword.slice(num)}}</text>
				</view>
				
			</view>
			
			
			
		</view>
		<view class="box">
			<view class="box-top">
				<view class="callback-icon" @click="back">
					<image src="/static/icon/系统返回2.png" mode="aspectFit"></image>
				</view>
				
				<view class="box-line">
					<input type="text" name="set1" placeholder="随便搜点什么呢!" id="input" v-model="title" @keydown.enter="newgetlist(title)" placeholder-style="color:rgba(255,255,255,.5)" style="color: #fff;" focus>
					<view class="box-clear" v-show="title != null || ''" @click="textclear" >
						<image src="../../static/icon/关闭2.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		
		</view>
		
	<view class="hotboxcont">
		<view class="history">
			<view class="tit">
				历史
			</view>
			
			<view class="history-list">
					<scroll-view class="list" scroll-x="true">
						<view class="t20" v-for="(item,i) in horsty" :key="i" @click="getitem(item)">{{item}}</view>
						<!-- <view class="t20">天气之子</view>
						<view class="t20">铃芽之旅</view>
						<view class="t20">秒速五厘米</view>
						<view class="t20">珂朵莉</view> -->
					</scroll-view>
					
			</view>
			
			<view class="clear" @click="clearall" v-show="horsty">
				<image src="/static/icon/删除2.png" mode="aspectFit"></image>
			</view>
		</view>
		
		
		<view class="hotlist">
			<view class="hotbox">
				<view class="hottit">
					<view class="t21 atv">
						热搜榜
					</view><view class="t21">
						话题榜
					</view><view class="t21">
						播客榜
					</view><view class="t21">
						视频榜
					</view>
				</view>
				
				<view class="hoticon">
					<view class="iconk">
						<image src="/static/icon/播放4.png" mode="aspectFit"></image>
					</view>
					
					<text class="t22">播放</text>
				</view>
			</view>
			
			<view class="card">
				<scroll-view class="cardbox" scroll-x="true">
						<view class="kkk">
							<view class="cardhover">
								<view class=" t23">
									<text class="t1">1</text> 张杰
								</view>
								<view class="t23">
									<text class="t1">2</text> 林俊杰
								</view>
								<view class="t23">
									<text class="t1">3</text> 铃芽之旅
								</view>
								<view class="t23">
									<text class="t4 tout">4</text> 薛之谦
								</view>
							</view>
							<view class="cardhover">
								<view class="t1">
									<text>1</text> 张杰
								</view>
								<view class="t2">
									<text>2</text> 林俊杰
								</view>
								<view class="t3">
									<text>3</text> 铃芽之旅
								</view>
								<view class="t4">
									<text>4</text> 薛之谦
								</view>
							</view>
						</view>
					
				</scroll-view>
			</view>
		</view>
		
		
		
	</view>
		
		<minmusic v-show="$store.state.showplaycomponent"
		:imgk="musicpic" 
		:name="name" 
		:ren="ren" 
		:dd="dd"
		:top="topnum"
		:love="love"
		@stop="okstop"
		@stopkk="bilibili"
		></minmusic>
	</view>
</template>

<script>
	import throttle from 'lodash.throttle';
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				title: null,
				value: null,
				hotlist: null,
				whitetext: '',
				blacktext: '',
				num: 0,
				he: "-100vh",
				horsty: null,
				showbox: false,
				wait: 1,
				numk: 1,
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				dd: helper.contminlist.dd,
				topnum: helper.contminlist.topnum,
				love:  helper.contminlist.islove
				
			};
		},
		onLoad(e) {
			if(e.page) {
				helper.page = e.page
			}
			if(e.tit) {
				this.wait = 2
				this.title = e.tit
				this.changeS()
			}
  
			let ho = uni.getStorageSync('key');
			this.horsty = ho
		},
		mounted() {
			 let input = document.getElementById('input');
			    // 给输入框添加节流后的keyup事件监听
			    input.addEventListener('keyup', throttle(this.changeS, 1000));
		},
		methods: {
			okxian(e) {
				this.$store.commit('changeshow', e)
				},
			bilibili(e) {
				if(this.numk != e) {
					this.numk = 1
					helper.contminlist.dd = -100
					// console.log(11,'k')
				} else {
					// console.log(11,'k1')
					this.numk = e
					helper.contminlist.dd = 0
				}
			},
			okstop(e) {
				if(this.$store.state.changeControl != e) {
					helper.audiok.pause()
					this.$store.commit('changeControl', e)
				} else {
					helper.audiok.play()
					this.$store.commit('changeControl', 0)
				}
			
			},
			getitem(e) {
				this.goindex(e)

			},
			backbox() {
				this.showbox = false
			},
			removeall() {
				uni.removeStorageSync('key');
				this.showbox = false
				this.horsty = null
			},
			clearall() {
				this.showbox = true
			},
			showdown() {
				this.showbox = false
			},
			changeS() {
				if(this.title != null) {
					this.num = this.title.length
				}
				if(this.num >= 0 || this.title == null) {
					this.he = '140rpx'
				}else {
					this.he = "-100vh"
				}
				
				uni.request({
					url: `http://localhost:3000/search/suggest`,
					data: {'keywords': this.title,
							'type': 'mobile'
					},
					success: (res) => {
						// console.log(res)
						try{
							let ked = res.data.result.allMatch
							// console.log(ked)
							// this.hotlist = null
							this.hotlist = ked.slice(0,6)
							// console.log(this.hotlist)
						}catch(e){
							console.log("珂朵莉")
						}
					}
				})

				
			},

			hotclear(e) {
				setTimeout(() => {
					this.title = null
					this.value = null
				}, 500)
			},
			newgetlist(e) {
				if(this.title) {
					this.ifvalue(e)
					this.goindex(this.title)
				}
			},
			ifvalue(e) {
				let value = uni.getStorageSync('key');
				let np = false
				if(value.length > 0) {
					for(let i = 0; i < value.length; i++) {
						if(value[i] === e) {
							np = false
						}else {
							np = true
						}
				}}else if(value === '') {
					uni.setStorageSync('key', [e])

				}
				else if(value.length == 0){
						uni.setStorageSync('key', value.unshift(e))
					}

				if(np) {
					let tp = value
					tp.unshift(e)
					uni.setStorageSync('key', tp);
				}

			},
			goindex(name) {
				uni.reLaunch({
					url: `/pages/goindex/goindex?name=${name}`
				})
			},
			getgoindex(e) {
				if(e) {
					this.ifvalue(e)
					this.goindex(e)
				}
			},
			textclear() {
				this.he = '-100vh'
				this.title = null	
			},
			back() {
				if(helper.page == 1) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}else if(helper.page == 2) {
					uni.reLaunch({
						url: '/pages/myhome/myhome'
					})
				}
				else if(this.wait == 1) {
					uni.navigateBack()
				}else {
					this.he = "-100vh"
					this.hotlist = null
					this.wait = 1
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchhome {
		.clearmask {
			position: absolute;
			width: 100%;
			height: 100vh;
		}
		// position: relative;
		.clearbox {
			color: rgba(255,255,255,.6);
			padding: 20rpx 40rpx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 500rpx;
			height: 200rpx;
			border-radius: 15rpx;
			background-color: #2c2c2c;
			.clearbtn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				right: 40rpx;
				bottom: 20rpx;
				width: 200rpx;
				height: 80rpx;
				// background-color: #fff;
				.btnleft,
				.btnright {
					color: #ff0000;
					padding: 10rpx 10rpx;
					
				}
			}
		}
		.texthots {
			padding: 0 30rpx 40rpx 30rpx;
			z-index: 99;
			position: absolute;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: #2c2c2c;
			.hotsbox {
				.hotlist {
					display: flex;
					justify-content: start;
					align-items: center;
					color: #fff;
					.keicon {
						margin-right: 30rpx;
						width: 40rpx;
						height: 40rpx;
					}
					.t10 {
						display: flex;
						justify-content: start;
						align-items: center;
						width: 100%;
						padding: 25rpx 0;
						border-bottom: 2rpx solid rgba(255,255,255,.1);
						font-size: 32rpx;
					}
				}
			}
		}
		.box {
			box-sizing: border-box;
			padding: 40rpx 20rpx 0 20rpx;
			height: 100%;
			background-color:  #2c2c2c;
			.box-top {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;
				
				.callback-icon {
					margin-right: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}
				
				.box-line {
					padding-right: 10rpx;
					padding-bottom: 14rpx;
					padding-left: 2rpx;
					flex: 8;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid rgba(255,255,255,.4);
					.box-clear {
						width: 45rpx;
						height: 45rpx;
					}
				}
			}
			
		}
	
		.hotboxcont {
			padding: 0 20rpx;
			background-color:  #151515;
			.history {
				color: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80rpx;
				
				.tit {
					font-weight: 600;
					
				}
				
				.history-list {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 500rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					.list {
						// display: flex;
						.t20 {
							display: inline-block;
							margin-right: 20rpx;
							padding: 5rpx 15rpx;
							background-color: #252525;
							border-radius: 20rpx;
						}
					}
				}
				.clear {
					width: 50rpx;
					height: 50rpx;
				}
			}
			
			.hotlist {
				.hotbox {
					margin-top: 20rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 80rpx;
					// background-color: skyblue;
					.hottit {
						flex: 8;
						display: flex;
						justify-content: space-between;
						height: 100%;
						align-items: center;
						.t21 {
							color: #b8b8b8;
						}
						.atv {
							font-weight: 600;
							color: #d9d9d9;
						}
					}
					.hoticon {
						padding: 8rpx 0;
						margin: 0 10rpx 0 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex: 1.5;
						border: 2rpx solid #666;
						border-radius: 30rpx;
						// padding: 5rpx 2rpx;
						background-color: transparent;
						.iconk {
							display: flex;
							align-items: center;
							vertical-align: middle;
							width: 24rpx;
							height: 24rpx;
						}
						.t22 {
							color: #fff;
							font-size: 24rpx;
						}
					}
				}
			
				.card {
					padding-bottom: 40rpx;
					.cardbox {
						margin-top: 8rpx;
						white-space: nowrap;
						// position: relative;
						display: flex;
						flex-direction: column;
						width: 100%;
						
						.kkk {
							width: 600%;
							display: flex;
							
							.cardhover {
								padding: 35rpx 25rpx;
								background-color: #212121;
								border-radius: 20rpx;
								margin-right: 20rpx;
								// position: absolute;
								width: 660rpx;
								// height: 600rpx;
								.t23 {
									color: #e8e8e8;
									padding: 15rpx 0;
									.t1,
									.t4 {
										margin-right: 40rpx;
									}
									.t1 {
										color: red;
									}
									.tout {
										color: #e1e1e1;
									}
								}
							}
						}
					}
				}
			
			}
		}
	}
</style>
