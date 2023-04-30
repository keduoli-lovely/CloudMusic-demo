<template>
		<view class="banner night">
			<view class="play-img">
				<swiper  :autoplay="true" :interval="2000" :duration="1000" circular>
					<swiper-item v-for="(item, i) in titlePic" :key="i">
						<view class="swiper-item">
							<image :src="item.pic" mode="scaleToFill	"></image>
						</view>
					</swiper-item>
					<!-- <swiper-item>
						<view class="swiper-item">
							<image src="/static/img//ban2.png" mode="aspectFill"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="/static/img//ban3.jpg" mode="aspectFill"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="/static/img/ban4.jpg" mode="aspectFill"></image>
						</view>
					</swiper-item> -->
			
				</swiper>
			</view>
			
			<view class="content">
				<view class="cont1 min-box" v-for="item in titleIcon" :key="item.id">
					<view class="cont-box" @click="star">
						<image :src="item.iconUrl" mode="aspectFill"></image>
					</view>
					<text>{{item.name}}</text>
				</view>
				<!-- <view class="cont2 min-box">
					<view class="cont-box">
						
					</view>
					<text>猜你喜欢</text>
				</view>
				<view class="cont3 min-box">
					<view class="cont-box">
						
					</view>
					<text>每日推荐</text>
				</view>
				<view class="cont4 min-box">
					<view class="cont-box">
						
					</view>
					<text>排行榜</text>
				</view>
				<view class="cont5 min-box">
					<view class="cont-box">
						
					</view>
					<text>更多</text>
				</view> -->
			</view>
			
			<view class="live-box">
				<view class="live-bar">
					<view class="live-title">
						<text class="t1">专属推荐</text>
						
					</view>
					<view class="live-selector">
			
						<view class="live-top">
							<image src="../../static/icon/箭头_列表收起.png" mode="aspectFit"></image>
						</view>
						
						<view class="more">
							<image src="../../static/icon/更多-竖.png" mode="aspectFit" class="t4"></image>
						</view>
					</view>
				</view>
				
				<view class="live-box-img">
					<view class="live-min-img" >
					<!-- detail 详情 -->
						<view class="keduoli" v-for="item in titleSing" :key="item.id" @click="getdetail(item.id)">
							<view class="ke-img">
								<image :src="item.picUrl" mode="aspectFill"></image>
							</view>
							<text class="t2">
								{{item.name}}
							</text>
						</view>
						<!-- <view class="keduoli">
							<view class="ke-img">
								<image src="../../static/img/cont2.png" mode="aspectFill"></image>
							</view>
							<text class="t2">
								百听不厌的日文歌曲,一生强推
							</text>
						</view>
						<view class="keduoli">
							<view class="ke-img">
								<image src="../../static/img/cont3.png" mode="aspectFill"></image>
							</view>
							<text class="t2">
								日本电影原声收藏
							</text>
						</view>
					
					<view class="keduoli">
						<view class="ke-img">
							<image src="../../static/img/cont1.png" mode="aspectFill"></image>
						</view>
						<text class="t2">
							一夜火遍全网最好听流行热曲2023
						</text>
					</view>
					<view class="keduoli">
						<view class="ke-img">
							<image src="../../static/img/cont2.png" mode="aspectFill"></image>
						</view>
						<text class="t2">
							百听不厌的日文歌曲,一生强推
						</text>
					</view>
					<view class="keduoli">
						<view class="ke-img">
							<image src="../../static/img/cont3.png" mode="aspectFill"></image>
						</view>
						<text class="t2">
							日本电影原声收藏
						</text>
					</view> -->
				</view>
				</view>
			</view>
			<view class="sendbtn" @click="getbtnlist1">
				加载更多....
			</view>
		</view>
		
	<!-- </scroll-view> -->
</template>

<script>
import helper from '../../common/helper';
	export default {
		name:"banerHome",
		data() {
			return {
				titlePic: [],
				titleIcon: [],
				titleSing: null,
				triggered: false
			}
		},
		methods: {

			// xiala() {
			// 	helper.bodydata.bannerTitlePic = ''
			// 	helper.bodydata.bannerTitleSing = ''
			// 	helper.bodydata.bannerTitleIcon = ''
			// 	setTimeout(() => {
			// 		// this.isstart = true
			// 		this.isxiala = false
			// 	},1000)
				
			// },
			getbtnlist1() {
				this.bannerTitlePic = ''
				helper.bodydata.bannerTitlePic = ''
				let ye = Math.random()*5
				let ye1 = Math.floor(ye)
				uni.request({
					// url: `http://localhost:3000/personalized?limit=${6 + ye1}`,
					url: `${helper.url}/personalized?limit=${6 + ye1}`,
					success: (res) => {
						this.titleSing = res.data.result
						// console.log(this.titleSing)
						helper.bodydata.bannerTitleSing = res.data.result
						// console.log(helper.bodydata.bannerTitlePic,11111)
						
						// console.log(getApp().globalData.titleSing)
					}
				})
			},
			getdetail(id) {
				uni.reLaunch({
					url: `/pages/playlist/playlist?id=${id}`
				})
			},
			getBanner() {
				if(helper.bodydata.bannerTitlePic == '') {
					uni.request({
						// url: 'http://localhost:3000/banner?type=2',
						url: `${helper.url}/banner?type=2`,
						success: (res) => {
							helper.bodydata.bannerTitlePic = res.data.banners
							this.titlePic = res.data.banners
							// console.log(helper.bodydata.bannerTitlePic)
						}
					})
				}else {
					this.titlePic = helper.bodydata.bannerTitlePic
				}
			},
			
			getIcon() {
				if(helper.bodydata.bannerTitleIcon == '') {
					uni.request({
						// url: 'http://localhost:3000/homepage/dragon/ball',
						url: `${helper.url}/homepage/dragon/ball`,
						success: (res) => {
							helper.bodydata.bannerTitleIcon = res.data.data
							// console.log(res.data.data,111)
							this.titleIcon = res.data.data
							// console.log(helper.bodydata.bannerTitleIcon,1111)
							// console.log(getApp().globalData.titleIcon)
						}
					})
				}else {
					// console.log(helper.bodydata.bannerTitleIcon)
					this.titleIcon = helper.bodydata.bannerTitleIcon
				}
			},
			
			getSing() {
				if(helper.bodydata.bannerTitleSing == '') {
					let ye = Math.random()*5
					let ye1 = Math.floor(ye)
					uni.request({
						// url: `http://localhost:3000/personalized?limit=${6 + ye1}`,
						url: `${helper.url}/personalized?limit=${6 + ye1}`,
						success: (res) => {
							this.titleSing = res.data.result
							// console.log(this.titleSing)
							helper.bodydata.bannerTitleSing = res.data.result
							// console.log(helper.bodydata.bannerTitlePic,11111)
							
							// console.log(getApp().globalData.titleSing)
						}
					})
				}else {
					// console.log(99999)
					this.titleSing = helper.bodydata.bannerTitleSing
				}
				
			}
			
		},
		mounted() {
			this.getBanner(),
			this.getIcon(),
			this.getSing()
		
		}
}
</script>

<style lang="scss" scoped>
	.sendbtn {
		border-radius: 8rpx;
		padding: 10rpx 10rpx;
		margin: 40rpx auto 100rpx;
		text-align: center;
		width: 30%;
		color: var(--btnfontcolor);
		background-color: var(--btnbgcolor);
		// margin-bottom: 50rpx;
	}
	.banner {
		
		.play-img {
			overflow: hidden;
			width: 100%;
			height: 380rpx;
			border-radius: 25rpx;
			swiper {
				height: 380rpx;
				.swiper-item {
					height: 400rpx;
		
				}
			}
		}

		.content {
			margin: 40rpx 0;
			background-color: var(--indexiconbgcolor);
			border-radius: 25rpx;
			display: flex;
			flex-wrap: wrap;
			color: var(--indexfontcolor);
			// width: 100%;
			// flex-direction: column;
			// height: 100rpx;
			justify-content: space-between;
			
			.min-box {
				width: 18%;
				padding: 30rpx 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 20rpx;
				.cont-box {
					margin-bottom: 18rpx;
					width: 100rpx;
					height: 100rpx;
					margin: 0 auto;
					line-height: 100rpx;
					border-radius: 50%;
					background-color: transparent;
				}
			}
		}
			
		.live-box {
			padding: 20rpx 20rpx;
			border-radius: 30rpx;
			background-color: var(--indexiconbgcolor);
			
			.live-bar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.live-title {
					display: flex;
					.t1 {
						color: var(--zhuanshufontcolor);
						font-size: 35rpx;
						font-weight: 600;
						padding-right: 10rpx;
					}
					
				}
				.live-selector {
					display: flex;
					justify-content: center;
					align-items: center;
					.live-top {
						width: 50rpx;
						height: 50rpx;
						
					}
					.more {
						position: relative;
						padding-right: 10rpx;
						width: 50rpx;
						height: 50rpx;
						.t4 {
							position: absolute;
							right: -15rpx;
						}
					}
				}
			}
		
			.live-box-img {
				padding: 20rpx 0 0;
				
				
				.live-min-img {
					
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.keduoli {
						width: 210rpx;
						padding-bottom: 20rpx;
						.ke-img {
							overflow: hidden;
							border-radius: 10rpx;
							width: 210rpx;
							height: 210rpx;
							margin-bottom: 10rpx;
						}
						
						.t2 {
							color: var(--liveboxfontcolor);
							display: inline-block;
							line-height: 1.4;
							font-size: 18rpx;
							height: 10rpx;
						}
					}
					
				}
			}
		
		}
	}
</style>