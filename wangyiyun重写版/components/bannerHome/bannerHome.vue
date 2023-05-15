<template>
		<view class="banner night" @touchstart="movestart" @touchmove="move" @touchend="moveend" :style="{paddingTop: `${bannertop}px`}" >

			<view class="play-img" >
				<swiper :autoplay="true" :interval="2000" :duration="1000" circular>
					<swiper-item v-for="(item, i) in bannerTitlePic" :key="i">
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
			
			<view class="msgbcckc">
				加载中...
			</view>
			
			<view class="content">
				<view class="cont1 min-box" v-for="item in titleIcon" :key="item.id">
					<view class="cont-box" @click="star">
						<image :src="item.iconUrl" mode="aspectFill"></image>
					</view>
					<text>{{item.name}}</text>
				</view>
				
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

				</view>
				</view>
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
				bannerTitlePic: [],
				titleIcon: [],
				titleSing: null,
				triggered: false,
				movestartnum: '',
				bannertop: 0,
				timer: null
			}
		},
		methods: {
			movestart(e) {
				this.movestartnum =  e.touches[0].pageY
			},
			move(e) {
				if(this.movestartnum - e.touches[0].pageY < 0) {
					if(this.movestartnum - e.touches[0].pageY > -120) {
						this.bannertop = -(this.movestartnum - e.touches[0].pageY)
					}
				}
				
			},
			moveend() {
				let msg = document.querySelector(".msgbcckc")
				msg.style.display = "block"
				this.getSing()
			},
			
			getbtnlist1() {
				this.bannerTitlePic = ''
				helper.bodydata.bannerTitlePic = ''
				let ye = Math.random()*5
				let ye1 = Math.floor(ye)
				uni.request({
					url: `${helper.url}/personalized?limit=${6 + ye1}`,
					success: (res) => {
						this.titleSing = res.data.result
						helper.bodydata.bannerTitleSing = res.data.result
						
					}
				})
			},
			getdetail(id) {
				uni.reLaunch({
					url: `/pages/playlist/playlist?id=${id}&page=1`
				})
			},
			getBanner() {
				if(helper.bodydata.bannerTitlePic == '') {
					uni.request({
						url: `${helper.url}/banner?type=2`,
						success: (res) => {
							// console.log(res)
							helper.bodydata.bannerTitlePic = res.data.banners
							this.bannerTitlePic = res.data.banners
						}
					})
				}else {
					this.bannerTitlePic = helper.bodydata.bannerTitlePic
				}
			},
			
			getIcon() {
				if(helper.bodydata.bannerTitleIcon == '') {
					uni.request({
						url: `${helper.url}/homepage/dragon/ball`,
						success: (res) => {
							helper.bodydata.bannerTitleIcon = res.data.data
							this.titleIcon = res.data.data
						}
					})
				}else {
					this.titleIcon = helper.bodydata.bannerTitleIcon
				}
			},
			
			getSing() {
				if(helper.bodydata.bannerTitleSing == '') {
					let ye = Math.random()*5
					let ye1 = Math.floor(ye)
					uni.request({
						url: `${helper.url}/personalized?limit=${6 + ye1}`,
						success: (res) => {
							this.titleSing = res.data.result
							helper.bodydata.bannerTitleSing = res.data.result
							
						}
					})
				}else {
					this.titleSing = helper.bodydata.bannerTitleSing
				}
				let msg = document.querySelector(".msgbcckc")
				setTimeout(() => {
					msg.style.display = "none"
					this.bannertop = 0
				}, 1000)
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
	.banner {
		position: relative;
		.msgbcckc {
			filter: blur(1rpx);
			opacity: .5;
			padding: 20rpx 100rpx;
			position: fixed;
			top: 170rpx;
			left: 50%;
			transform: translateX(-50%);
			background-color: var(--listboxline);
			border-radius: 14rpx;
			display: none;
		}
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