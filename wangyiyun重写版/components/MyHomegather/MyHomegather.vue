<template>
	<view class="myhomegather">
		<view class="tarbar">
			<view class="create">
				创建歌单
			</view>
			<!-- // collection 收藏的意思 -->
			<view class="collection">
				收藏歌单
			</view>
			<view class="help">
				歌单助手
			</view>
		</view>
		
		<view class="addmusice">
			<view class="top">
				<view class="left">
					创建歌单
				</view>
				<view class="right">
					<view class="addicon">
						<image src="/static/icon/添加1.png" mode="aspectFit"></image>
					</view>
					<view class="more">
						<image src="/static/icon/更多1.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="con">
				<view class="geticon">
					<view class="iconmask">
						<image src="/static/icon/导入.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="text">
					一键导入外部歌单
				</view>
			</view>
		</view>
		
		<view class="possess">
			<view class="header">
				<view class="header-left">
					收藏歌单(4个)
				</view>
				<view class="header-right">
					<image src="/static/icon/更多1.png" mode="aspectFit"></image>
				</view>
			</view>
			
			<view class="banner-con">
				<view class="name-left">
					<view class="pic">
						<image src="/static/video/1.jpg" mode="aspectFill"></image>
					</view>
					<view class="textbox">
						<view class="title">
							铃芽之旅
						</view>
						<view class="name">
							<<铃芽之旅>>
						</view>
					</view>
				</view>
				<view class="icon-right">
					<image src="/static/icon/更多1.png" mode="aspectFit"></image>
				</view>
			</view>
			
			<view class="banner-con">
				<view class="name-left">
					<view class="pic">
						<image src="/static/video/1.jpg" mode="aspectFill"></image>
					</view>
					<view class="textbox">
						<view class="title">
							铃芽之旅
						</view>
						<view class="name">
							<<铃芽之旅>>
						</view>
					</view>
				</view>
				<view class="icon-right">
					<image src="/static/icon/更多1.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MyHomegather",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.myhomegather {
		padding: 0rpx 30rpx 160rpx;
		.tarbar {
			margin-bottom: 30rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 36rpx;
			color: #fff;
			font-weight: 550;
			.collection {
				padding: 0 50rpx;
				height: 40rpx;
				line-height: 40rpx;
				border-left: 1rpx solid #666;
				border-right: 1rpx solid #666;
			}
			.create {
				z-index: 2;
				position: relative;
				// width: 10rpx;
			}
			.create::after {
				z-index: -1;
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 15rpx;
				background-color: red;
				border-radius: 6rpx;
			}
		}
		
		.addmusice {
			box-sizing: border-box;
			padding: 22rpx 24rpx;
			width: 100%;
			height: 220rpx;
			background-color: #333;
			border-radius: 14rpx;
			.top {
				margin-bottom: 18rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					font-size: 24rpx;
					color: #fff;
				}
				.right {
					display: flex;
					.addicon {
						margin-right: 30rpx;
					}
					.addicon,
					.more {
						width: 45rpx;
						height: 45rpx;
					}
				}
			}
			.con {
				display: flex;
				align-items: center;
				.geticon {
					margin-right: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					width: 110rpx;
					height: 110rpx;
					background-color: #666;
					border-radius: 12rpx;
					.iconmask {
						width: 80rpx;
						height: 80rpx;
					}
				}
				.text {
					color: #fff;
					font-size: 34rpx;
				}
			}
		}
		.possess {
			box-sizing: border-box;
			padding: 22rpx 18rpx;
			margin-top: 20rpx;
			width: 100%;
			background-color: #333;
			border-radius: 14rpx;
			.header {
				margin-bottom: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.header-left {
					font-size: 24rpx;
					color: #666;
				}
				.header-right {
					width: 45rpx;
					height: 45rpx;
				}
			}
			.banner-con {
				margin-bottom: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name-left {
					display: flex;
					align-items: center;
					.pic {
						margin-right: 30rpx;
						width: 100rpx;
						height: 100rpx;
						border-radius: 14rpx;
						overflow: hidden;
					}
					.textbox {
						.title {
							font-size: 34rpx;
							color: #fff;
						}
						.name {
							font-size: 24rpx;
							color: #666;
						}
					}
				}
				.icon-right {
					width: 45rpx;
					height: 45rpx;
				}
			}
		}
	}
</style>