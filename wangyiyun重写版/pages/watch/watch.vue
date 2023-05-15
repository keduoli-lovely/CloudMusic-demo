<template>
	<view class="header">
		<view class="headerbar">
			<view class="left">
				<indexleftbar></indexleftbar>
			</view>
			<view class="center">
				<view class="tuijian">
					广场
				</view>
				<view class="gushi">
					歌房
				</view>
			</view>

			<view class="right">
				<image src="/static/icon/add.png" mode="aspectFit"></image>
			</view>
		</view>

		<view class="banner">
			<scroll-view scroll-x>
				<view class="box">
					<view class="list1">
						推荐
					</view>
					<view class="list1">
						现场
					</view>
					<view class="list1">
						情感
					</view>
					<view class="list1">
						ACG
					</view>
					<view class="list1">
						明星
					</view>
					<view class="list1">
						舞蹈
					</view>
					<view class="list1">
						影视
					</view>
					<view class="list1">
						知识
					</view>
					<view class="list1">
						MV
					</view>
				</view>
			</scroll-view>

		</view>


		<view class="content">
			<view class="video-box">
				<view class="title">
					<view class="pic">
						<image src="/static/video/1.jpg" mode="widthFix"></image>
					</view>
					<view class="text">
						珂朵莉,啊啊啊啊啊啊啊啊啊啊啊啊啊啊
					</view>
				</view>
				<view class="user">
					<view class="title"> 
						<view class="user-pic">
							<image src="/static/img/ban1.jpg" mode="aspectFill"></image>
						</view>
						<view class="name">
							珂朵莉
						</view>
					</view>
					<view class="live">
						<text class="t1">1314</text>
						<view class="live-icon">
							<image src="/static/icon/点赞1.png" mode=""></image>
						</view>
					</view>
				</view>
			</view><view class="video-box">
				<view class="title">
					<view class="pic">
						<image src="/static/video/1.jpg" mode="widthFix"></image>
					</view>
					<view class="text">
						珂朵莉,啊啊啊啊啊啊啊啊啊啊啊啊啊啊
					</view>
				</view>
				<view class="user">
					<view class="title"> 
						<view class="user-pic">
							<image src="/static/img/ban1.jpg" mode="aspectFill"></image>
						</view>
						<view class="name">
							珂朵莉
						</view>
					</view>
					<view class="live">
						<text class="t1">1314</text>
						<view class="live-icon">
							<image src="/static/icon/点赞1.png" mode=""></image>
						</view>
					</view>
				</view>
			</view><view class="video-box">
				<view class="title">
					<view class="pic">
						<image src="/static/video/1.jpg" mode="widthFix"></image>
					</view>
					<view class="text">
						珂朵莉,啊啊啊啊啊啊啊啊啊啊啊啊啊啊
					</view>
				</view>
				<view class="user">
					<view class="title"> 
						<view class="user-pic">
							<image src="/static/img/ban1.jpg" mode="aspectFill"></image>
						</view>
						<view class="name">
							珂朵莉
						</view>
					</view>
					<view class="live">
						<text class="t1">1314</text>
						<view class="live-icon">
							<image src="/static/icon/点赞1.png" mode=""></image>
						</view>
					</view>
				</view>
			</view><view class="video-box">
				<view class="title">
					<view class="pic">
						<image src="/static/video/1.jpg" mode="widthFix"></image>
					</view>
					<view class="text">
						珂朵莉,啊啊啊啊啊啊啊啊啊啊啊啊啊啊
					</view>
				</view>
				<view class="user">
					<view class="title"> 
						<view class="user-pic">
							<image src="/static/img/ban1.jpg" mode="aspectFill"></image>
						</view>
						<view class="name">
							珂朵莉
						</view>
					</view>
					<view class="live">
						<text class="t1">1314</text>
						<view class="live-icon">
							<image src="/static/icon/点赞1.png" mode=""></image>
						</view>
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

			};
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}

	.header {
		padding-top: 140rpx;
		.headerbar {
			padding: 30rpx;
			z-index: 999;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 140rpx;
			background-color: #666;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.center {
				display: flex;
				width: 35%;
				font-weight: 550;
				color: #fff;
				justify-content: space-between;
			}

			.right {
				width: 45rpx;
				height: 45rpx;
			}
		}

		.banner {
			.box {
				padding: 30rpx;
				display: flex;
				flex-wrap: nowrap;
				.list1 {
					margin-right: 10rpx;
					white-space: nowrap;
					padding: 5rpx 25rpx;
				}
				.list1:first-child {
					background-color: red;
					border-radius: 30rpx;
				}
			}
		}
		
		.content {
			padding: 0 10rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.video-box {
				margin-bottom: 20rpx;
				width: 49%;
				border-radius: 14rpx;
				overflow: hidden;
				background-color: #666;
				.pic {
					width: 100%;
				}
				.text {
					color: #fff;
					padding: 20rpx 26rpx 10rpx;
				}
				.user {
					padding: 0 26rpx 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #fff;
					.title {
						display: flex;
						align-items: center;
						.user-pic {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							overflow: hidden;
						}
						.name {
							margin-left: 10rpx;
							font-size: 26rpx;
						}
					}
					.live {
						display: flex;
						align-items: center;
						font-size: 24rpx;
						.t1 {
							padding-top: 10rpx;
						}
						.live-icon {
							margin-left: 8rpx;
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
		}
	}
</style>