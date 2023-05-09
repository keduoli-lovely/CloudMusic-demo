<template>
	<view class="wyy night">	
		<view class="Search">			
			<indexleftbar></indexleftbar>
			<view class="search-line">
				
				<view class="search-box">
					<view class="Placeholder">
						
					</view>
					<view class="search-icon">
						<image src="/static/icon/3.1-搜索.png" mode="aspectFit"></image>
					</view>
					
					<input type="text" placeholder="歌曲/视频/歌单/电台/小说/歌词" class="ipt" placeholder-style="font-size: 20rpx" @click.stop="getSearchHome">
				</view>
				<!-- // 搜索图标前的占位 -->
				<view class="Placeholder">
					
				</view>
				
				<!-- <view class="text-box" v-show="value">
					<view class="Search-text" v-for="(item,i) in hotlist" :key="i"  >
						<text class="t6" @click="goindex(item.first)" v-if="item.first" >{{item.first}}</text>
						<text class="t6" @click="goindex(item.keyword)" v-else >{{item.keyword}}</text>
					</view>
				</view> -->
			</view>
			
			<view class="voice">
				<image src="/static/icon/mic-on.png" mode="aspectFit"></image>
			</view>
		</view>
		
		<bannerHome  v-if="isstart" :key="1">
			
		</bannerHome>
		
		<!-- <minmusic></minmusic> -->
		<minmusic 
		v-show="$store.state.showplaycomponent"
		:imgk="musicpic"
		:name="name" 
		:ren="ren" 
		:dd="dd"
		:love="love"
		:indexk="isindex"
		:top="topnum"
		:isshow="isshow"
		@stopkk="bilibili"
		></minmusic>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				isindex: 1,
				isstart: true,
				numk: 1,
				musicpic: helper.contminlist.musicpic,
				name: helper.contminlist.name,
				ren: helper.contminlist.ren,
				dd: -95,
				topnum: helper.contminlist.topnum,
				love:  helper.contminlist.islove,
				// 负责显示底部
				isshow: 1,
				timer: null
			}
		},
		methods: {
			
			// 控制显示/隐藏底部播放组件
			bilibili(e) {
				if(this.numk != e) {
					this.numk = 1
					uni.showTabBar({
						fail() {
							console.log('珂朵莉')
						}
					})
					helper.contminlist.dd = -100
					this.dd = -95
					// console.log(11,'k')
				} else {
					console.log(11,'k1')
					
					this.numk = e
					helper.contminlist.dd = 0
				}
			},
			getSearchHome() {
				uni.navigateTo({
					url:"/pages/searchhome/searchhome"
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>

	.wyy {
		padding: 40rpx 15rpx 60rpx;
		background-color: var(--indexgbcolor);
		color: #ad9998;
		
		// .tabbar {
		// 	margin-bottom: 30rpx;
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	height: 60rpx;
		// 	.bar-left {
		// 		font-size: 30rpx;
		// 		display: flex;
		// 		.read {
		// 			padding-left: 15rpx;
		// 		}
		// 		.audio {
		// 			margin: 0 40rpx;
		// 		}
		// 	}
		// 	.bar-right {
		// 		display: flex;
		// 		.hover {
		// 			width: 40rpx;
		// 			image {
		// 				width: 100%;
		// 			}
		// 		}
		// 		.show{
		// 			margin-left: 20rpx;
		// 			width: 40rpx;
		// 			image {
		// 				width: 100%;
		// 			}
		// 		}
				
		// 	}
		// }
	
		.Search {
			
			position: relative;
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			.search-line {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 9;
				background-color: var(--indexsearchbgcolor);
				height: 60rpx;
				overflow: hidden;
				border-radius: 20rpx;
				
				.search-box {
					
					
					vertical-align: middle;
					display: flex;
					width: 100%;
					height: 60rpx;
					justify-content: center;
					
					.Placeholder {
						flex: .5;
					}
					.ipt {
						padding: 16rpx 0;
						line-height: 1em;
						min-height: 1em;
						box-sizing: border-box;
						width: 100%;
						height: 100%;
						flex: 8;
						display: block;
						
					}
					.search-icon {
						padding-right: 10rpx;
						vertical-align: middle;
						width: 35rpx;
					}
				}
				
				.text-box {
					z-index: 99;
					padding: 8rpx 20rpx;
					position: absolute;
					left: 0;
					top: 80rpx;
					width: 90%;
					border-radius: 10rpx;
					background-color: #f0e5e3;
					box-shadow: -4rpx 4rpx 4rpx rgba(0,0,0,.2),
					inset 0rpx 4rpx 2rpx rgba(0,0,0,.1),
					4rpx 4rpx 4rpx rgba(0,0,0,.2);
					.Search-text {
						padding: 10rpx 0 10rpx 14rpx;
						border-bottom: 1px solid #eee;
						.t6 {
							display: inline-block;
							width: 100%;
							height: 100%;
							// background-color: #000;
							color: #666;
							
						}
					}
				}
			}
			
			.voice {
				// flex: 1;
				padding: 0 2rpx 0 40rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
	
		
	
	}
	
</style>
