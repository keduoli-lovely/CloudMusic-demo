<template>
	<view class="sparewheel">
		<view class="bgicon">
			<image src="/static/icon/06-还没有数据.png" mode="aspectFill"></image>
		</view>
		
		<view class="msg">
			你关注的人三十天内没有新的消息
		</view>
	</view>
</template>

<script>
	export default {
		name:"spareWheel",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.sparewheel {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 30rpx;
		// padding: 100rpx 50rpx;
		.bgicon {
			width: 300rpx;
			height: 260rpx;
		}
		.msg {
			margin-top: 10rpx;
			color: #fff;
		}
	}
</style>