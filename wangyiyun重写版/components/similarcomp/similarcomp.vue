<template>
	<view class="similarcomp">
		<view class="left">
			<view class="backicon" @click="back">
				<image src="../../static/icon/系统返回2.png" mode="aspectFit"></image>
			</view>
			<view class="textbox">
				<view class="title">
					音乐云盘
				</view>
				<view class="size">
					0.0G/00G
				</view>
			</view>
		</view>
		<view class="right">
			<view class="setup">
				<image src="/static/icon/设置.png" mode="aspectFit"></image>
			</view>
			<view class="search">
				<image src="/static/icon/3.1-搜索.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			back() {
				uni.reLaunch({
					url: '/pages/myhome/myhome'
				})
			}
		}
	}
</script>

<style lang="scss">
	.similarcomp {
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 120rpx;
		background-color: #999;
		.left {
			display: flex;
			justify-content: center;
			align-items: center;
			.backicon {
				margin-right: 30rpx;
				width: 48rpx;
				height: 48rpx;
			}
			.textbox {
				.title {
					font-size: 32rpx;
					font-weight: 550;
					color: #fff;
				}
				.size {
					text-align: center;
					font-size: 26rpx;
					color: #666;
				}
			}
		}
		.right {
			display: flex;
			.setup,
			.search {
				margin-left: 40rpx;
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>