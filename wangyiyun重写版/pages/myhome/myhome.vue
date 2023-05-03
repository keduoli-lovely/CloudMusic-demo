<template>
	<view class="myhome">
		<view class="header">
			<indexleftbar></indexleftbar>
			<view class="state">
				<!-- <input type="text" class="ipt" v-model="textstate"> -->
			</view>
			<view class="search" @click="getSearchHome">
				<image src="../../static/icon/3.1-搜索.png" mode="aspectFit"></image>
			</view>
		</view>
		
		<view class="banner">
			<view class="user">
				<view class="pic">
					<image src="../../static/img/ban3.jpg" mode="aspectFill"></image>
				</view>
				<view class="name">
					珂朵莉
				</view>
				<view class="grade">
					<view class="concern">
						<text class="t1">1,0000</text>
						<text class="t2">关注</text>
					</view>
					<view class="followers">
						<text class="t3">1,000</text>
						<text class="t4">粉丝</text>
					</view>
					<view class="lv">
						<text class="t5">LV.</text>
						<text class="t6">10</text>
					</view>
				</view>
			</view>
		
			<view class="content">
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					1
				</view>
				
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					2
				</view>
				
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					3
				</view>
				
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					4
				</view>
				
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					5
				</view>
				
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					6
				</view>
				
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					7
				</view>
				
				<view class="box">
					<image src="../../static/icon/音乐演奏1.png" mode="aspectFit"></image>
					8
				</view>
				
			</view>
		
			<view class="live">
				<view class="live-pic">
					<image src="../../static/video/1.jpg" mode="aspectFill"></image>
				</view>
				<view class="live-box">
					
					<view class="title">
						我喜欢的音乐
						<view class="text-header">
							1314
						</view>
						</view>
						
						<view class="icon-header">
							<view class="icon">
								<image src="../../static/icon/心动.png" mode="aspectFit"></image>
							</view>
							<text class="t10">心动模式</text>
					</view>
					
					
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textstate: ''
			};
		},
		methods: {
			getSearchHome() {
				uni.navigateTo({
					url:"/pages/searchhome/searchhome"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}
	.myhome {
		
		width: 750rpx;
		height: 100%;
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 50rpx 30rpx;
			height: 180rpx;
			background-color: skyblue;
			.state {
				display: flex;
				justify-content: start;
				align-items: center;
				padding: 15rpx 0 15rpx 30rpx;
				font-size: 22rpx;
				width: 200rpx;
				height: 60rpx;
				// background-color: #fff;
				border-radius: 60rpx;
				// .ipt {
				// 	width: 100%;
				// 	height: 70%;
				// }
			}
			.search {
				width: 50rpx;
				height: 50rpx;
			}
		}
		
		.banner {
			padding: 60rpx 30rpx;
			background-color: #999;
			.user {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 80rpx;
				position: relative;
				width: 100%;
				height: 200rpx;
				border-radius: 16rpx;
				background-color: #fff;
				.pic {
					// z-index: 10;
					position: absolute;
					top: 0;
					left: 50%;
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					overflow: hidden;
					transform: translate(-50%, -50%);
				}
				.name {
					padding: 10rpx;
				}
				.grade {
					white-space: nowrap;
					padding: 0 0 10rpx;
					width: 75%;
					display: flex;
					align-items: center;
					.concern {
						padding-right: 20rpx;
						.t1 {
							padding-right: 10rpx;
						}
						.t2 {
							font-size: 32rpx;
							font-weight: 520;
						}
					}
					.followers {
						padding: 0 20rpx;
						height: 1em;
						line-height: 1em;
						border-left: 1rpx solid #000;
						border-right: 1rpx solid #000;
						.t3 {
							padding-right: 10rpx;
						}
						.t4 {
							font-size: 32rpx;
							font-weight: 520;
						}
					}
					.lv {
						padding-left: 20rpx;
						.t5 {
							font-weight: 520;
							padding-right: 10rpx;
						}
						.t6 {
							font-size: 32rpx;
							
						}
					}
				}
			}
		
			.content {
				margin-top: 50rpx;
				padding: 20rpx;
				height: 350rpx;
				display: flex;
				flex-wrap: wrap;
				background-color: #fff;
				border-radius: 18rpx;
				.box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 25%;
					image {
						margin-bottom: 10rpx;
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
		
			.live {
				padding: 20rpx;
				margin-top: 50rpx;
				height: 160rpx;
				background-color: #fff;
				border-radius: 14rpx;
				display: flex;
				align-items: center;
				.live-pic {
					margin-right: 20rpx;
					overflow: hidden;
					border-radius: 8rpx;
					width: 130rpx;
					height: 120rpx;
				}
				.live-box {
					width: 85%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title {
						font-size: 32rpx;
						font-weight: 600;
						.text-header {
							font-size: 26rpx;
							color: #999;
						}
					}
					.icon-header {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 160rpx;
						height: 48rpx;
						background-color: #000;
						border-radius: 20rpx;
						
						.icon {
							margin-right: 6rpx;
							width: 35rpx;
							height: 35rpx;
						}
						.t10 {
							color: #fff;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
